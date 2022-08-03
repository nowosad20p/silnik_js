class Camera extends GameObject{
    constructor(canvas,scripts,mesh){
        super(scripts,mesh);
        this.output=canvas;
        this.drawingUtils=new DrawingUtils();
        this.width=canvas.width;
        this.height=canvas.height;
        this.aspectRatio=this.height/this.width;
        this.fov=90;
        this.fNear=0.1;
        this.fFar=1000;
        this.fFovRad= 1 / Math.tan(this.fov*0.5/180*Math.PI);
      
        
        this.matProjection=new Matrix4x4();
        this.matProjection.m[0][0]=this.aspectRatio*this.fFovRad;
        this.matProjection.m[1][1]=this.fFovRad;
        this.matProjection.m[2][2]=this.fFar/(this.fFar-this.fNear);
        this.matProjection.m[3][2]=(-this.fFar*this.fNear)/(this.fFar-this.fNear);
        this.matProjection.m[2][3]=1;
        this.matProjection.m[3][3]=0;
    }
    display(gameObjectList){
        this.output.getContext("2d").clearRect(0, 0,  this.output.width,  this.output.height);
      
     
        let matRotZ=new Matrix4x4();
        let matRotX=new Matrix4x4();



        for(let i=0;i<gameObjectList.length;i++){
               let fTheta=1;
        matRotZ.m[0][0]=Math.cos(fTheta);
        matRotZ.m[0][1]=Math.sin(fTheta);
        matRotZ.m[1][0]=-Math.sin(fTheta);
        matRotZ.m[1][1]=Math.cos(fTheta);
        matRotZ.m[2][2]=1;
        matRotZ.m[3][3]=1;

        matRotX.m[0][0]=1;
        matRotX.m[1][1]=Math.cos(fTheta*0.5);
        matRotX.m[1][2]=Math.sin(fTheta*0.5);
        matRotX.m[2][1]=-Math.sin(fTheta*0.5);
        matRotX.m[2][2]=Math.cos(fTheta*0.5);;
        matRotX.m[3][3]=1;

            for(let j=0;j<gameObjectList[i].mesh.length;j++){
                let triangleTranslated;
              
                let triangleProjected;
                let triangleRotated=gameObjectList[i].mesh[j];
                 triangleRotated.v1=matRotZ.multiplyMatrixVector(triangleRotated.v1);
                 triangleRotated.v2=matRotZ.multiplyMatrixVector(triangleRotated.v2);
                 triangleRotated.v3=matRotZ.multiplyMatrixVector(triangleRotated.v3);

                 triangleRotated.v1=matRotX.multiplyMatrixVector(triangleRotated.v1);
                 triangleRotated.v2=matRotX.multiplyMatrixVector(triangleRotated.v2);
                 triangleRotated.v3=matRotX.multiplyMatrixVector(triangleRotated.v3);
                triangleTranslated=triangleRotated;
                triangleTranslated.v1.z+=3
                     triangleTranslated.v2.z+=3
                     triangleTranslated.v3.z+=3
                triangleTranslated.v1=this.matProjection.multiplyMatrixVector(triangleTranslated.v1);
                triangleTranslated.v2=this.matProjection.multiplyMatrixVector(triangleTranslated.v2);
                triangleTranslated.v3=this.matProjection.multiplyMatrixVector(triangleTranslated.v3);

                
                triangleProjected=triangleTranslated;
                triangleProjected.v1.x+=1;
                triangleProjected.v1.y+=1; 
                triangleProjected.v2.x+=1;
                triangleProjected.v2.y+=1; 
                triangleProjected.v3.x+=1;
                triangleProjected.v3.y+=1; 
                triangleProjected.v1.x*= (0.5*this.width); 
                triangleProjected.v1.y*=(0.5*this.height);
                 triangleProjected.v2.x*= (0.5*this.width); 
                triangleProjected.v2.y*=(0.5*this.height);
                triangleProjected.v3.x*= (0.5*this.width); 
                triangleProjected.v3.y*=(0.5*this.height);

                triangleProjected.v1=triangleProjected.v1.addVector(gameObjectList[i].position);
                triangleProjected.v2=triangleProjected.v2.addVector(gameObjectList[i].position);
                triangleProjected.v3=triangleProjected.v3.addVector(gameObjectList[i].position);
               

            this.drawingUtils.drawTriangle(triangleProjected,this.output.getContext("2d"));
            }
        }
        
    }
}