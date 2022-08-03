class Vector3{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
    }
    addVector(vector){
        if(vector instanceof Vector3){
            return new Vector3(this.x+vector.x,this.y+vector.y,this.z+vector.z);
        }else{
            return "error:wrong data structure"
        }
    }
}