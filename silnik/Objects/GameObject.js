class GameObject{
    constructor(position=new Vector3(0,0,0),scripts=[],mesh=[],rotation=new Quaternion(0,0,0,0)){
        this.scripts=scripts;
        this.position=position;
        this.mesh=mesh; 
        this.rotation=rotation;
    }
    fixedUpdate(){
        for(let j=0;j<this.scripts.length;j++){   
            this.scripts[j].fixedUpdate();
        }
    }

}