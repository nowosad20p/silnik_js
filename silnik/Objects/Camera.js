class Camera extends GameObject {
    constructor(position, rotation, canvas, scripts, mesh, voidColor = "blue") {
        super(position, scripts, mesh, rotation);
        this.output = canvas;
        this.drawingUtils = new DrawingUtils();
        this.width = canvas.width;
        this.height = canvas.height;
        this.aspectRatio = this.height / this.width;
        this.fov = 90;
        this.fNear = 0.1;
        this.fFar = 1000;
        
        this.voidColor = voidColor;
       

    }
    display(gameObjectListt) {
        //getting rid of object reference
        let gameObjectList = JSON.parse(JSON.stringify(gameObjectListt));
        //clearing canvas
        this.output.getContext("2d").beginPath();
        this.output.getContext("2d").moveTo(0, 0);
        this.output.getContext("2d").lineTo(this.width, 0);
        this.output.getContext("2d").lineTo(this.width, this.height);
        this.output.getContext("2d").lineTo(0, this.height);
        this.output.getContext("2d").lineTo(0, 0);
        this.output.getContext("2d").fillStyle = this.voidColor;
        this.output.getContext("2d").fill();






        //declaring rotation matrices
        //TODO:theta calculated from rotation
       

      


       

        for (let i = 0; i < gameObjectList.length; i++) {
            //creating matrices
            let fTheta=1;
            let matRotZ=RotZMatrix(fTheta*0.5);
            let matRotX=RotXMatrix(fTheta);
            let translationMatrix=TranslationMatrix(0,0,16);
            let worldMatrix = new Matrix4x4(4,4);
            worldMatrix=IdentityMatrix();
            worldMatrix=multiplyMatrices(matRotZ,matRotX);
            worldMatrix.multiplyByMatrix(translationMatrix);
            let projectionMatrix=ProjectionMatrix(this.fov,this.aspectRatio,this.fNear,this.fFar)

          
            let trianglesToRasterize = [];
            //displaying objects
            for (let j = 0; j < gameObjectList[i].mesh.length; j++) {

                let transformedTriangle=gameObjectList[i].mesh[j];
                transformedTriangle.v1=multiplyMatrixAndVector(worldMatrix,transformedTriangle.v1);
                transformedTriangle.v2=multiplyMatrixAndVector(worldMatrix,transformedTriangle.v2);
                transformedTriangle.v3=multiplyMatrixAndVector(worldMatrix,transformedTriangle.v3);
                
               
                //normalizing triangle
                let line1 = substractVectors(transformedTriangle.v2,transformedTriangle.v1);
                let line2 = substractVectors(transformedTriangle.v3,transformedTriangle.v1);
                let normal=crossProductOfVectors(line1,line2);
                normal.normalize();

                let cameraRay=substractVectors(transformedTriangle.v1,this.position);
                if (dotProductOfVectors(normal,cameraRay)<0) {
                    let lightDir=new Vector3(0,1,-1);
                    lightDir.normalize();
                    let dotProduct=Math.max(0.1,dotProductOfVectors(lightDir,normal));
                    
                    transformedTriangle.color = "rgb(" + dotProduct * 255 + "," + dotProduct * 255 + "," + dotProduct * 255 + ")";
                    transformedTriangle.v1 = multiplyMatrixAndVector(projectionMatrix,transformedTriangle.v1);
                    transformedTriangle.v2 = multiplyMatrixAndVector(projectionMatrix,transformedTriangle.v2);
                    transformedTriangle.v3 = multiplyMatrixAndVector(projectionMatrix,transformedTriangle.v3);

                    let triangleProjected = transformedTriangle;


                    
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

                    triangleProjected.v1.addVector(gameObjectList[i].position)
                    triangleProjected.v2.addVector(gameObjectList[i].position)
                    triangleProjected.v3.addVector(gameObjectList[i].position)



                    trianglesToRasterize.push(triangleProjected);
                }



            }
            trianglesToRasterize.sort((a, b) => {
                return ((a.v1.z + a.v2.z + a.v3.z) / 3 - (b.v1.z + b.v2.z + b.v3.z) / 3)
            })

            for (let i = 0; i < trianglesToRasterize.length; i++) {
                this.drawingUtils.drawTriangle(trianglesToRasterize[i], this.output.getContext("2d"), trianglesToRasterize[i].color);
            }
        }

    }
}