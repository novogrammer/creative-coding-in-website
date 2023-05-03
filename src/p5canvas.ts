import P5 from "p5";


export function setupCanvas(canvasContainer:HTMLDivElement){
  const sketch=(p5:P5)=>{

    p5.colorMode(p5.HSB,100);
    const colorA=p5.color(100*3/6,10,100);
    const colorB=p5.color(100*5/6,100,100);
    const colorC=p5.color(100*2/6,50,100);

    function getNearestDistance(x:number,y:number):number{
      let distance=Infinity;
      if(!(p5.mouseX==0 && p5.mouseY==0)){
        const dx=p5.mouseX - x;
        const dy=p5.mouseY - y;
        distance=Math.min(distance,Math.sqrt(dx*dx+dy*dy));
      }
      interface Point{
        x:number;
        y:number;
      }
      for(let touch of p5.touches as Point[]){
        const dx=touch.x - x;
        const dy=touch.y - y;
        distance=Math.min(distance,Math.sqrt(dx*dx+dy*dy));
      }
      return distance;
    }
    
    p5.setup=()=>{
      p5.noiseSeed(0);
      p5.createCanvas(canvasContainer.clientWidth,canvasContainer.clientHeight);
    }
    p5.draw=()=>{
      p5.background(220);
      p5.push();
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
          const nearestDistance=getNearestDistance(x,y);
          
          const randomValue=p5.noise(ix*0.1+xQty,iy*0.1+yQty,performance.now()*0.001*0.7);
          const colorBase=p5.lerpColor(colorA,colorB,randomValue);
          const r=p5.map(nearestDistance,0,minSize,1,0,true)**4;
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
  const p5=new P5(sketch,canvasContainer);
  
}