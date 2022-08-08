class Matrix4x4 {
    m = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    constructor() {
        this.m = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }
    multiplyMatrixVector(i) {
        let o = new Vector3(0, 0, 0);
        o.x = i.x * this.m[0][0] + i.y * this.m[1][0] + i.z * this.m[2][0] + this.m[3][0];
        o.y = i.x * this.m[0][1] + i.y * this.m[1][1] + i.z * this.m[2][1] + this.m[3][1];
        o.z = i.x * this.m[0][2] + i.y * this.m[1][2] + i.z * this.m[2][2] + this.m[3][2];
        let w = i.x * this.m[0][3] + i.y * this.m[1][3] + i.z * this.m[2][3] + this.m[3][3];
        if (w != 0) {
            o.x /= w;
            o.y /= w;
            o.z /= w;
        }
        return o;
    }
    multiplyMatrixByMatrix(matrix){
      
        //TODO:sprawdzenie czy ilość kolumn i wierszy sie zgadza
        let newMatrix=new Matrix4x4;
        for(let i=0;i<4;i++){
        
           for(let j=0;j<4;j++){
            let dotProduct=0;
                for(let k=0;k<4;k++){
                dotProduct+=this.m[i][k]*matrix.m[k][j];
               

                }
                newMatrix.m[i][j]=dotProduct;
           }
           
        }
        return newMatrix;
    }
}