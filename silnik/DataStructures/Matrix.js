class Matrix4x4 {

    constructor(colums, rows, matrix = null) {
        this.m = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        
    }
    
    multiplyByMatrix(matrix) {

        //TODO:sprawdzenie czy ilość kolumn i wierszy sie zgadza
        let newMatrix = new Matrix4x4;
        for (let i = 0; i < 4; i++) {

            for (let j = 0; j < 4; j++) {
                let dotProduct = 0;
                for (let k = 0; k < 4; k++) {
                    dotProduct += this.m[i][k] * matrix.m[k][j];


                }
                newMatrix.m[i][j] = dotProduct;
            }

        }
        this.m= newMatrix.m;
    }
}
function IdentityMatrix(){
    matrix=new Matrix4x4(4,4);
    matrix.m[0][0]=1;
    matrix.m[1][1]=1;
    matrix.m[2][2]=1;
    matrix.m[3][3]=1;
    return matrix;
}
function TranslationMatrix(x,y,z){
    let matrix=new Matrix4x4(4,4);
    matrix.m[0][0]=1;
    matrix.m[1][1]=1;
    matrix.m[2][2]=1;
    matrix.m[3][3]=1;
    matrix.m[3][0]=x;
    matrix.m[3][1]=y;
    matrix.m[3][2]=z;
    return matrix;
}
function ProjectionMatrix(fov,aspectRatio,near,far){
    fovRad = 1 / Math.tan(fov * 0.5 / 180 * Math.PI);
    matProjection = new Matrix4x4(4, 4);
    matProjection.m[0][0] = aspectRatio * fovRad;
    matProjection.m[1][1] = fovRad;
    matProjection.m[2][2] = far / (far - near);
    matProjection.m[3][2] = (-far *near) / (far - near);
    matProjection.m[2][3] = 1;
    matProjection.m[3][3] = 0;
    return matProjection;
}
function RotZMatrix(AngleRad){
    matRot=new Matrix4x4(4,4);
    matRot.m[0][0] = Math.cos(AngleRad);
    matRot.m[0][1] = Math.sin(AngleRad);
    matRot.m[1][0] = -Math.sin(AngleRad);
    matRot.m[1][1] = Math.cos(AngleRad);
    matRot.m[2][2] = 1;
    matRot.m[3][3] = 1;
    return matRot;
}
function RotYMatrix(AngleRad){
    matrixY=new Matrix4x4(4,4);
    matrixY.m[0][0]=Math.cos(AngleRad);
    matrixY.m[0][2]=Math.sin(AngleRad);
    matrixY.m[2][0]=-Math.sin(AngleRad);
    matrixY.m[1][1]=1
    matrixY.m[2][2]=Math.cos(AngleRad);
    matrixY.m[3][3]=1

    
    return matrixY;
}
function RotXMatrix(AngleRad){
    matRotX=new Matrix4x4()
    matRotX.m[0][0] = 1;
    matRotX.m[1][1] = Math.cos(AngleRad);
    matRotX.m[1][2] = Math.sin(AngleRad);
    matRotX.m[2][1] = -Math.sin(AngleRad);
    matRotX.m[2][2] = Math.cos(AngleRad);;
    matRotX.m[3][3] = 1;
  
    return matRotX;
}
function multiplyMatrixAndVector(matrix,vector){
    
        let o = new Vector3(0, 0, 0)
        m=matrix;
        i=vector;
        o.x=i.x*m.m[0][0]+i.y*m.m[1][0]+i.z*m.m[2][0]+i.w*m.m[3][0];
        o.y=i.x*m.m[0][1]+i.y*m.m[1][1]+i.z*m.m[2][1]+i.w*m.m[3][1];
        o.z=i.x*m.m[0][2]+i.y*m.m[1][2]+i.z*m.m[2][2]+i.w*m.m[3][2];
        o.w=i.x*m.m[0][3]+i.y*m.m[1][3]+i.z*m.m[2][3]+i.w*m.m[3][3];

        return o;
    
}
function multiplyMatrices(matrix1,matrix2) {

    //TODO:sprawdzenie czy ilość kolumn i wierszy sie zgadza
    let newMatrix = new Matrix4x4;
    for (let i = 0; i < 4; i++) {

        for (let j = 0; j < 4; j++) {
            let dotProduct = 0;
            for (let k = 0; k < 4; k++) {
                dotProduct += matrix1.m[i][k] * matrix2.m[k][j];


            }
            newMatrix.m[i][j] = dotProduct;
        }

    }
    return newMatrix;
}