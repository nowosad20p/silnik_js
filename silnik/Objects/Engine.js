class Engine {

    constructor(fpsCount) {

        this.fpsCount = fpsCount;
        this.objectList = [];
        this.camera = undefined;

    }
    fixedUpdate() {
        this.camera.display(this.objectList);
       
    
    
    }
    start(){
      this.interval=window.setInterval(()=>{this.fixedUpdate()},1000);
    }

  
    useCamera(camera) {
        this.camera = camera;

      
    }
    createObject(type, position,mesh=undefined) {
        switch (type) {
            case "cube": {
                this.objectList.push(new Cube(position, undefined));
                break;
            }
            case "gameObject": {
                this.objectList.push(new GameObject(position));   

                this.objectList[this.objectList.length-1].convertObjToMesh(mesh,this.objectList[this.objectList.length-1]);
              
              

                break;
            }
        }

    }

}