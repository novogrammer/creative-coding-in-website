import P5 from "p5";

export function setupCanvas(canvasContainer:HTMLDivElement){
  const sketch=(p5:P5)=>{
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
      p5.rectMode(p5.CENTER);
      for(let ix=xQty*-0.5;ix<=xQty*0.5;ix+=1){
        for(let iy=yQty*-0.5;iy<=yQty*0.5;iy+=1){
          const x=ix*size+p5.width*0.5;
          const y=iy*size+p5.height*0.5;
          const randomValue=p5.noise(ix*0.5,iy*0.5,performance.now()*0.001);
          p5.noStroke();
          p5.fill(randomValue*255,randomValue*255,randomValue*255);
          p5.ellipse(x,y,size,size);

        }
        p5.pop();
      }

    }
    window.addEventListener("resize",()=>{
      console.log("resize");
      p5.resizeCanvas(canvasContainer.clientWidth,canvasContainer.clientHeight);
    })
  }
  const p5=new P5(sketch,canvasContainer);
  
}