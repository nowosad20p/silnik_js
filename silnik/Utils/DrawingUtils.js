class DrawingUtils{
   drawTriangle(triangle,ctx,color="black"){
     ctx.strokeStyle=color;
    ctx.moveTo(triangle.v1.x,triangle.v1.y);
    ctx.beginPath();
    ctx.lineTo(triangle.v2.x,triangle.v2.y)
    ctx.lineTo(triangle.v3.x,triangle.v3.y)
    ctx.lineTo(triangle.v1.x,triangle.v1.y)
    ctx.stroke();

   }

}