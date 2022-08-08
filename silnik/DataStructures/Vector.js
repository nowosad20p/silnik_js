class Vector3{
    constructor(x,y,z){
        this.x=x;
        this.y=y;
        this.z=z;
    }
    addVector(vector){
            
           
        return new Vector3(this.x+vector.x,this.y+vector.y,this.z+vector.z);
    }
    normalize(){
       let l=(Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z)));
       this.x/=l;
       this.y/=l;
       this.z/=l;
    }
}