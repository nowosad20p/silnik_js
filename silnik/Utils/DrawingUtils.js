class DrawingUtils {
   drawTriangle(triangle, ctx, color = "black") {
      ctx.stroke();
      ctx.strokeStyle = color;
    
      ctx.lineWidth="2px";
      ctx.beginPath();
      ctx.moveTo(triangle.v1.x, triangle.v1.y);
   
     
      ctx.lineTo(triangle.v2.x, triangle.v2.y)
  
      ctx.lineTo(triangle.v3.x, triangle.v3.y)
     
      ctx.lineTo(triangle.v1.x, triangle.v1.y)
     
      ctx.stroke();
      ctx.fillStyle=color;
     ctx.fill();


   }

}