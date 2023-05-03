import P5 from "p5";


export function setupP5Canvas(canvasContainer:HTMLDivElement){
  const sketch=(p5:P5)=>{

    p5.colorMode(p5.HSB,100);
    const colorA=p5.color(100*3/6,10,100);
    const colorB=p5.color(100*5/6,100,100);
    const colorC=p5.color(100*2/6,50,100);

    function getNearestDistanceSquared(x:number,y:number):number{
      let distanceSquared=Infinity;
      if(!(p5.mouseX==0 && p5.mouseY==0)){
        const dx=p5.mouseX - x;
        const dy=p5.mouseY - y;
        distanceSquared=Math.min(distanceSquared,dx*dx+dy*dy);
      }
      interface Point{
        x:number;
        y:number;
      }
      for(let touch of p5.touches as Point[]){
        const dx=touch.x - x;
        const dy=touch.y - y;
        distanceSquared=Math.min(distanceSquared,dx*dx+dy*dy);
      }
      return distanceSquared;
    }
    
    p5.setup=()=>{
      p5.noiseSeed(0);
      p5.createCanvas(canvasContainer.clientWidth,canvasContainer.clientHeight,p5.WEBGL);
    }
    p5.draw=()=>{
      p5.background(220);
      p5.push();
      p5.translate(-p5.width/2,-p5.height/2,0);
      const yQty=5*2;
      const size=p5.height/yQty;
      const xQty=Math.ceil(p5.width/size*0.5)*2;
      p5.noStroke();
      p5.rectMode(p5.CENTER);
      // console.log(p5.mouseX,p5.mouseY);
      const minSize=Math.min(p5.width,p5.height);
      // console.log(p5.touches);
      for(let ix=xQty*-0.5;ix<=xQty*0.5;ix+=1){
        for(let iy=yQty*-0.5;iy<=yQty*0.5;iy+=1){
          const x=ix*size+p5.width*0.5;
          const y=iy*size+p5.height*0.5;
          const nearestDistanceSquared=getNearestDistanceSquared(x,y);
          
          const randomValue=p5.noise(ix*0.1+xQty,iy*0.1+yQty,performance.now()*0.001*0.7);
          const colorBase=p5.lerpColor(colorA,colorB,randomValue);
          const r=p5.map(nearestDistanceSquared,0,minSize**2,1,0,true)**2;
          const c=p5.lerpColor(colorBase,colorC,r);
          p5.fill(c);
          p5.ellipse(x,y,size,size);

        }
      }
      p5.pop();

    }
    window.addEventListener("resize",()=>{
      console.log("resize");
      p5.resizeCanvas(canvasContainer.clientWidth,canvasContainer.clientHeight);
    })
  }
  new P5(sketch,canvasContainer);
  
  
}