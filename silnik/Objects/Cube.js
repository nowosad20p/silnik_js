class Cube extends GameObject{
    constructor(position,scripts){
        super(position,scripts,[
            new Triangle(new Vector3(0,0,0),new Vector3(0,1,0),new Vector3(1,1,0)),
            new Triangle(new Vector3(0,0,0),new Vector3(1,1,0),new Vector3(1,0,0)),

            new Triangle(new Vector3(1,0,0),new Vector3(1,1,0),new Vector3(1,1,1)),
            new Triangle(new Vector3(1,0,0),new Vector3(1,1,1),new Vector3(1,0,1)),

            new Triangle(new Vector3(1,0,1),new Vector3(1,1,1),new Vector3(0,1,1)),
            new Triangle(new Vector3(1,0,1),new Vector3(0,1,1),new Vector3(0,0,1)),

            new Triangle(new Vector3(0,0,1),new Vector3(0,1,1),new Vector3(0,1,0)),
            new Triangle(new Vector3(0,0,1),new Vector3(0,1,0),new Vector3(0,0,0)),

            new Triangle(new Vector3(0,1,0),new Vector3(0,1,1),new Vector3(1,1,1)),
            new Triangle(new Vector3(0,1,0),new Vector3(1,1,1),new Vector3(1,1,0)),

            new Triangle(new Vector3(1,0,1),new Vector3(0,0,1),new Vector3(0,0,0)),
            new Triangle(new Vector3(1,0,1),new Vector3(0,0,0),new Vector3(1,0,0)),
        ]);
       
    }
}