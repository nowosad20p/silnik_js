class Vector3 {
    constructor(x, y, z,w=1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w=w;
    }
    addVector(vector) {


        this.x += vector.x
        this.y += vector.y
        this.z += vector.z;
    }
    substractVector(vector){
        this.x-=vector.x;
        this.y-=vector.y;
        this.z-=vector.z;
    }
    divide(number){
        this.x/=number;
        this.y/=number;
        this.z/=number;
    }
    multiply(number){
        this.x*=number;
        this.y*=number;
        this.z*=number;
    }
    normalize() {
        let l = this.length();
        this.x /= l;
        this.y /= l;
        this.z /= l;
    }
    length(){
        return (Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z)));
    }
}

function addVectors(vector1, vector2) {
    {
        return new Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);

    }
}
function substractVectors(vector1, vector2) {
    {
        return new Vector3(vector1.x - vector2.x, vector1.y- vector2.y, vector1.z - vector2.z);

    }
}
function divideVector(vector, number) {
    {
        return new Vector3(vector.x/number, vector.y/number, vector.z/number);

    }
}
function multiplyVector(vector, number) {
    {
        return new Vector3(vector.x*number, vector.y*number, vector.z*number);

    }
}
function dotProductOfVectors(vector1,vector2){
    return (vector1.x*vector2.x+vector1.y*vector2.y+vector1.z*vector2.z);
}
function crossProductOfVectors(vector1,vector2){
    return new Vector3(
        vector1.y*vector2.z-vector1.z*vector2.y,
        vector1.z*vector2.x-vector1.x*vector2.z,
        vector1.x*vector2.y-vector1.y*vector2.x
        );

}