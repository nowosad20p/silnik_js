class TimeUtils{
    constructor(){
        this.deltaTime=0;
        let today = new Date();
        this.currentMs = today.getTime();
     
    }
    fixedUpdate(){
        let today = new Date();
        this.deltaTime=today.getTime()-this.currentMs;
        this.currentMs=today.getTime();
  
    }
}