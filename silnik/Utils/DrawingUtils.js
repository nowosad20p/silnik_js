class DrawingUtils {
   drawTriangle(triangle, ctx, color = "black") {
      ctx.stroke();
      ctx.strokeStyle = color;

      ctx.lineWidth = "2px";
      ctx.beginPath();
      ctx.moveTo(triangle.v1.x, triangle.v1.y);


      ctx.lineTo(triangle.v2.x, triangle.v2.y)

      ctx.lineTo(triangle.v3.x, triangle.v3.y)

      ctx.lineTo(triangle.v1.x, triangle.v1.y)

      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();


   }
   drawRectangle(rectangle, ctx, color = "black") {
      ctx.stroke();
      ctx.strokeStyle = color;

      ctx.lineWidth = "2px";
      ctx.beginPath();
      ctx.moveTo(rectangle.v1.x, rectangle.v1.y);


      ctx.lineTo(rectangle.v2.x, rectangle.v2.y)

      ctx.lineTo(rectangle.v3.x, rectangle.v3.y)
      ctx.lineTo(rectangle.v4.x, rectangle.v4.y)
      ctx.lineTo(rectangle.v1.x, rectangle.v1.y)

      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
   }

}