import * as PIXI from "pixi.js";

const fragmentSrc=`
precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform vec4 inputSize;

uniform vec2 uPointerPosition;
uniform float uTime;

void main(void)
{
  vec3 col = 0.5 + 0.5*cos(uTime+vTextureCoord.xyx+vec3(0,2,4));

  float value=sin(uTime)*0.25+0.75;
  float l=10000.0;
  float minSize=min(inputSize.x,inputSize.y);
  if(uPointerPosition!=vec2(-1.0,-1.0)){
    vec2 uv=vTextureCoord.xy * inputSize.xy;
    l=length(uv - uPointerPosition);
  }
  
  gl_FragColor = vec4(col.xy,minSize / l * 0.125,1.0);

}

`;


export function setupPixiCanvas(canvasContainer:HTMLDivElement){
  const pixiApp=new PIXI.Application({
    resizeTo:canvasContainer,
  });

  const g=new PIXI.Graphics();
  pixiApp.stage.addChild(g);
  canvasContainer.appendChild(pixiApp.view as HTMLCanvasElement);
  let pointerPosition=[-1,-1];

  const filter=new PIXI.Filter(undefined,fragmentSrc,{
    uPointerPosition:pointerPosition,
    uTime:0,
  })
  pixiApp.stage.filters=[filter];

  pixiApp.stage.hitArea = pixiApp.screen;
  pixiApp.stage.eventMode="dynamic";
  pixiApp.stage.addEventListener("pointermove",(e)=>{
    pointerPosition[0]=e.globalX;
    pointerPosition[1]=e.globalY;
  });

  pixiApp.ticker.add(()=>{
    g.beginFill("#f00");
    g.drawRect(0,0,canvasContainer.clientWidth,canvasContainer.clientHeight);
    g.endFill();
    filter.uniforms.uTime=performance.now()*0.001;
    filter.uniforms.uPointerPosition=pointerPosition;
    // console.log(pointerPosition);
  });

}

