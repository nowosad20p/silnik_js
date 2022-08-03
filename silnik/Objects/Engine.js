class Engine{
    
    constructor(fpsCount){
    
       this.fpsCount=fpsCount;
        this.objectList=[];
        this.camera = undefined;
        
    }
  
       
    
    fixedUpdate(){
       
        this.camera.display(this.objectList);
    }
    useCamera(camera){
        this.camera=camera;
        this.camera.display(this.objectList);
       
    }
    createObject(type,position){
        switch(type){
            case "cube":{
                this.objectList.push(new Cube(position,undefined));
            }
        }
        
    }

}