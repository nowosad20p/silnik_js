class GameObject {
    constructor(position = new Vector3(0, 0, 0), scripts = [], mesh = [], rotation = new Quaternion(0, 0, 0, 0)) {
        this.scripts = scripts;
        this.position = position;
        this.mesh = mesh;
        this.rotation = rotation;
    }
    fixedUpdate() {
        for (let j = 0; j < this.scripts.length; j++) {
            this.scripts[j].fixedUpdate();
        }
    }

    convertObjToMesh(source,object) {
       
        let file = source.files[0];
        let vertexes = [];
        let faces = []
        let reader = new FileReader();
       
        reader.onload = function (progressEvent) {
            
            let lines = reader.result.split(/\r\n|\n/);
            for (let i = 0; i < lines.length - 1; i++) {
                if (lines[i][0] == "v") {
                    let vertex = "";
                    let uselessInformation = true;
                    for (let j = 0; j < lines[i].length; j++) {
                        if (lines[i][j] == " ") {
                            if (vertex.length > 0) {
                                vertexes.push(vertex);
                                vertex = "";
                            }
                            uselessInformation = false;
                        } else {
                            if (lines[i][j] == '/') {
                                if (vertex.length > 0) {
                                    vertexes.push(vertex);
                                    vertex = "";
                                }
                                uselessInformation = true;
                            } else {
                                if (!uselessInformation) {
                                    vertex += lines[i][j] + "";
                                }
                            }
                        }

                    }
                    if (vertex.length > 0) {
                        vertexes.push(vertex);
                    }

                }
                if (lines[i][0] == "f") {
                    let face = "";
                    let uselessInformation = true;
                    for (let j = 0; j < lines[i].length; j++) {
                        if (lines[i][j] == " ") {
                            if (face.length > 0) {
                                faces.push(face);
                                face = "";
                            }
                            uselessInformation = false;
                        } else {
                            if (lines[i][j] == '/') {
                                if (face.length > 0) {
                                    faces.push(face);
                                    face = "";
                                }
                                uselessInformation = true;
                            } else {
                                if (!uselessInformation) {
                                    face += lines[i][j] + "";
                                }
                            }
                        }

                    }
                    if (face.length > 0) {
                        faces.push(face);
                    }

                }
            }
            let vectors = [];
            for (let i = 0; i < vertexes.length; i += 3) {
                vectors.push(new Vector3(vertexes[i], vertexes[i + 1], vertexes[i + 2]));
            }
            let triangles = [];
            for (let i = 0; i < faces.length; i += 3) {
                triangles.push(new Triangle(vectors[faces[i] - 1], vectors[faces[i + 1] - 1], vectors[faces[i + 2] - 1]))
            }

            object.mesh= triangles;
          
        };

        reader.readAsText(file);

    };

}