class Camera extends GameObject {
    constructor(position, rotation, canvas, scripts, mesh,voidColor="blue") {
        super(position, scripts, mesh, rotation);
        this.output = canvas;
        this.drawingUtils = new DrawingUtils();
        this.width = canvas.width;
        this.height = canvas.height;
        this.aspectRatio = this.height / this.width;
        this.fov = 90;
        this.fNear = 0.1;
        this.fFar = 1000;
        this.fFovRad = 1 / Math.tan(this.fov * 0.5 / 180 * Math.PI);
        this.voidColor=voidColor;
        this.matProjection = new Matrix4x4();
        this.matProjection.m[0][0] = this.aspectRatio * this.fFovRad;
        this.matProjection.m[1][1] = this.fFovRad;
        this.matProjection.m[2][2] = this.fFar / (this.fFar - this.fNear);
        this.matProjection.m[3][2] = (-this.fFar * this.fNear) / (this.fFar - this.fNear);
        this.matProjection.m[2][3] = 1;
        this.matProjection.m[3][3] = 0;
  
    }
    display(gameObjectListt) {
      
        let gameObjectList=JSON.parse(JSON.stringify(gameObjectListt));
        this.output.getContext("2d").beginPath();
        this.output.getContext("2d").moveTo(0,0);
        this.output.getContext("2d").lineTo(this.width,0);
        this.output.getContext("2d").lineTo(this.width,this.height);
        this.output.getContext("2d").lineTo(0,this.height);
        this.output.getContext("2d").lineTo(0,0);
        this.output.getContext("2d").fillStyle=this.voidColor;
        this.output.getContext("2d").fill();





        

        let matRotZ = new Matrix4x4();
        let matRotX = new Matrix4x4();

        let fTheta = 1;
    
       
        let trianglesToRasterize=[];
        for (let i = 0; i < gameObjectList.length; i++) {
            
            matRotZ.m[0][0] = Math.cos(fTheta);
            matRotZ.m[0][1] = Math.sin(fTheta);
            matRotZ.m[1][0] = -Math.sin(fTheta);
            matRotZ.m[1][1] = Math.cos(fTheta);
            matRotZ.m[2][2] = 1;
            matRotZ.m[3][3] = 1;

            matRotX.m[0][0] = 1;
            matRotX.m[1][1] = Math.cos(fTheta * 0.5);
            matRotX.m[1][2] = Math.sin(fTheta * 0.5);
            matRotX.m[2][1] = -Math.sin(fTheta * 0.5);
            matRotX.m[2][2] = Math.cos(fTheta * 0.5);;
            matRotX.m[3][3] = 1;
          
            for (let j = 0; j < gameObjectList[i].mesh.length; j++) {
          
                let triangleTranslated;

                let triangleProjected;
                var triangleRotated = gameObjectList[i].mesh[j];
                

                triangleRotated.v1 = matRotZ.multiplyMatrixVector(triangleRotated.v1);
                triangleRotated.v2 = matRotZ.multiplyMatrixVector(triangleRotated.v2);
                triangleRotated.v3 = matRotZ.multiplyMatrixVector(triangleRotated.v3);

                triangleRotated.v1 = matRotX.multiplyMatrixVector(triangleRotated.v1);
                triangleRotated.v2 = matRotX.multiplyMatrixVector(triangleRotated.v2);
                triangleRotated.v3 = matRotX.multiplyMatrixVector(triangleRotated.v3);
                triangleTranslated = triangleRotated;
                triangleTranslated.v1.z += 3
                triangleTranslated.v2.z +=3
                triangleTranslated.v3.z += 3

                let line1 = new Vector3(triangleTranslated.v2.x - triangleTranslated.v1.x, triangleTranslated.v2.y - triangleTranslated.v1.y, triangleTranslated.v2.z - triangleTranslated.v1.z)
                let line2 = new Vector3(triangleTranslated.v3.x - triangleTranslated.v2.x, triangleTranslated.v3.y - triangleTranslated.v2.y, triangleTranslated.v3.z - triangleTranslated.v2.z)
                let normal = new Vector3((line1.y * line2.z) - (line1.z * line2.y), (line1.z * line2.x) - (line1.x * line2.z), (line1.x * line2.y) - (line1.y * line2.x));
             
                normal.normalize();
                if (normal.x * (triangleTranslated.v1.x - this.position.x) + normal.y * (triangleTranslated.v1.y - this.position.y) + normal.z * (triangleTranslated.v1.z - this.position.z) < 0) {
                    let lightDir = new Vector3(0, 0, -1);
                    lightDir.normalize();
                    let dotProduct = normal.x * lightDir.x + normal.y * lightDir.y + normal.z * lightDir.z;
                     triangleTranslated.color = "rgb(" + dotProduct * 255 + "," + dotProduct * 255 + "," + dotProduct * 255 + ")";
                    triangleTranslated.v1 = this.matProjection.multiplyMatrixVector(triangleTranslated.v1);
                    triangleTranslated.v2 = this.matProjection.multiplyMatrixVector(triangleTranslated.v2);
                    triangleTranslated.v3 = this.matProjection.multiplyMatrixVector(triangleTranslated.v3);

                    triangleProjected = triangleTranslated;
                    triangleProjected.v1.x += 1;
                    triangleProjected.v1.y += 1;
                    triangleProjected.v2.x += 1;
                    triangleProjected.v2.y += 1;
                    triangleProjected.v3.x += 1;
                    triangleProjected.v3.y += 1;
                     triangleProjected.v1.x *= (0.5 * this.width);
                     triangleProjected.v1.y *= (0.5 * this.height);
                     triangleProjected.v2.x *= (0.5 * this.width);
                     triangleProjected.v2.y *= (0.5 * this.height);
                     triangleProjected.v3.x *= (0.5 * this.width);
                     triangleProjected.v3.y *= (0.5 * this.height);

                    triangleProjected.v1 = triangleProjected.v1.addVector(gameObjectList[i].position);
                    triangleProjected.v2 = triangleProjected.v2.addVector(gameObjectList[i].position);
                    triangleProjected.v3 = triangleProjected.v3.addVector(gameObjectList[i].position);


                    
                    trianglesToRasterize.push(triangleProjected);
                }



            }
            trianglesToRasterize.sort((a,b)=>{return ((a.v1.z+a.v2.z+a.v3.z)/3-(b.v1.z+b.v2.z+b.v3.z)/3)})
          
            for(let i=0;i<trianglesToRasterize.length;i++){
                this.drawingUtils.drawTriangle(trianglesToRasterize[i], this.output.getContext("2d"), trianglesToRasterize[i].color);
            }
        }

    }
}