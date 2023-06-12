// set canvas
var canvas = document.getElementById("simulation"),
    context = canvas.getContext("2d");

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    canvas: canvas,
    engine: engine,
});
render.options.wireframes = false;
render.options.showVelocity = true;


//mouse controls
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;

// createboxes and a ground
// var boxA = Bodies.rectangle(400, 200, 80, 80);
// var boxB = Bodies.rectangle(400, 50, 80, 80);
// var boxC = Bodies.rectangle(400, 100, 80, 80);
var ground = Bodies.rectangle(400, 800, 800, 600, { isStatic: true });

// add ground the world
Composite.add(engine.world, [ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

//Dynamic Frame Per Second
fps = 1
objects = []
vals = []
letters = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
colours = ["red", "orange", "yellow", "green", "blue", "purple"]


function startSimulation() {
    objects.forEach(function(object) {
        Matter.Body.setStatic(object, false)
    });
}

function clearObjects() {
    location.reload()
}

function createObject() {
    var box = Bodies.rectangle(200,200,document.getElementById("length").value,document.getElementById("width").value, {render: {
        fillStyle: colours.at(objects.length),
        strokeStyle: 'white',
        lineWidth: 3}, isStatic: true})
    box.mass = document.getElementById("mass").value
    objects.push(box)
    Composite.add(engine.world, [objects.at(-1)]);
    dynamicOptions()
}



function dynamicOptions() {
    var options = "";
    var x = 0;
    objects.forEach(function(object){
        x++
        options += `<li><a onclick="selectObject('${letters.at(x)}')" class="dropdown-item">Object ${letters.at(x)}</a></li>`;
    });
 document.getElementById("dynamicObjects").innerHTML = options;
}

objects.forEach(function(object){
    console.log(object)
    Object.assign(object,{positionX: [object.position.x]});
    Object.assign(object,{positionY: [object.position.y]});
    Object.assign(object,{velocityX: [object.velocity.x]});
    Object.assign(object,{velocityY: [object.velocity.x]});
    Object.assign(object,{accelerationX: []});
    Object.assign(object,{accelerationY: []});
    Object.assign(object,{time: [0]});

    Math.round((object.positionX.at(-1)) * 100) / 100

    var timer = setInterval(() => {
        console.log(object.positionY.at(-1), object.position.y);
        if (((Math.round((object.positionX.at(-1)) * 100) / 100) == (Math.round((object.position.x) * 100) / 100)) && ((Math.round((object.positionY.at(-1)) * 100) / 100) == (Math.round((object.position.y) * 100) / 100))) {
            vals.push(object)
            clearInterval(timer); 
            console.log(vals);
        }
        object.positionX.push(object.position.x);
        object.positionY.push(object.position.y);
        object.velocityX.push(object.velocity.x);
        object.velocityY.push(object.velocity.y);
        object.accelerationX.push((object.velocityX.at(-1)-object.velocityX.at(-2))/(fps/1000));
        object.accelerationY.push((object.velocityY.at(-1)-object.velocityY.at(-2))/(fps/1000));
        object.time.push(Math.round((object.time.at(-1)+0.1) * 10) / 10);
    }, fps)
});

function showObjects(graph) {
    document.getElementById("graph").innerHTML = "Choose Graph: " + graph;
    o = document.getElementById("obj");
    if (o.innerText.includes(":")) {
        createGraph(selectedObject, graph)
      }
    else {
        o.hidden = false;
    }
}


function createGraph(selectedObject, graph) {
    document.getElementById("xpt").hidden = true;
    document.getElementById("ypt").hidden = true;
    document.getElementById("xvt").hidden = true;
    document.getElementById("yvt").hidden = true;
    document.getElementById("xat").hidden = true;
    document.getElementById("yat").hidden = true;
    document.getElementById(graph).hidden = false;
    object = objects[selectedObject];
    if (graph=="xpt") {
        drawGraph(object, object.positionX, "xptGraph")
    }
    else if (graph=="ypt") {
        drawGraph(object, object.positionY, "yptGraph")
    }
    else if (graph=="xvt") {
        drawGraph(object, object.velocityX, "xvtGraph")
    }
    else if (graph=="yvt") {
        drawGraph(object, object.velocityY, "yvtGraph")
    }
    else if (graph=="xat") {
        drawGraph(object, object.accelerationX,"xatGraph")
    }
    else if (graph=="yat") {
        drawGraph(object, object.accelerationY,"yatGraph")
    }
}

function drawGraph(object,data,gt) {
    new Chart(gt, {
        type: "line",
        data: {
            labels: object.time,
            datasets: [{
                data: data
            }]
        },
        options: {}
      });
}

selectedObject = ""
function selectObject(obj) {
    selectedObject = obj
    document.getElementById("obj").innerHTML = "Choose Object: " + obj;
    createGraph(obj, document.getElementById("graph").innerText.slice(-3))
}

// document.getElementById("simulation").onclick = function(e) {
//     console.log(e.offsetX,e.offsetY)
//     objects.at(-1).x = e.offsetX
//     objects.at(-1).y = e.offsetY
//     if (count==0) {
//         const img = new Image(50, 50);
//         img.id = "A";
//         img.src = "A.png"; 
//         ay = e.offsetY-50
//         ax = e.offsetX-25
//         img.style=`position: absolute; top:${ay}px; left:${ax}px`;
//         document.body.appendChild(img);
//     }


// positionX = [boxA.position.x];
// positionY = [boxA.position.y];
// velocityX = [boxA.velocity.x];
// velocityY = [boxA.velocity.y];
// accelerationX = [];
// accelerationY = [];
// time = [0];

// //Dynamic Frame Per Second
// fps = 0.01


// var timer = setInterval(() => {
//     if ((positionX.at(-1) == boxA.position.x) && (positionY.at(-1) == boxA.position.y)) {
//         xptGraph();
//         yptGraph();
//         xvtGraph();
//         yvtGraph();
//         xatGraph();
//         yatGraph();
//         clearInterval(timer);
//     }
//     positionX.push(boxA.position.x);
//     positionY.push(boxA.position.y);
//     velocityX.push(boxA.velocity.x);
//     velocityY.push(boxA.velocity.y);
//     accelerationX.push((velocityX.at(-1)-velocityX.at(-2))/(fps/1000));
//     accelerationY.push((velocityY.at(-1)-velocityY.at(-2))/(fps/1000));
//     time.push(Math.round((time.at(-1)+0.1) * 10) / 10);
//     console.log(time.at(-1))
// }, fps)

function xptGraph() {
    new Chart("xptGraph", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                fill: false,
                lineTension: 0,
                data: positionX
            }]
        },
        options: {}
      });
}

function yptGraph() {
    new Chart("yptGraph", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                fill: false,
                lineTension: 0,
                data: positionY
            }]
        },
        options: {}
      });
}

function xvtGraph() {
    new Chart("xvtGraph", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                fill: false,
                lineTension: 0,
                data: velocityX
            }]
        },
        options: {}
      });
}

function yvtGraph() {
    new Chart("yvtGraph", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                fill: false,
                lineTension: 0,
                data: velocityY
            }]
        },
        options: {}
      });
}

function xatGraph() {
    new Chart("xatGraph", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                fill: false,
                lineTension: 0,
                data: accelerationX
            }]
        },
        options: {}
      });
}

function yatGraph() {
    new Chart("yatGraph", {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                fill: false,
                lineTension: 0,
                data: accelerationY
            }]
        },
        options: {}
      });
}


// function directionVectorY() {
//     const img = new Image(50, 50);
//     img.id = "vectorX";
//     img.src = "./assets/img/vector.png"; 
//     img.style=`position: absolute; top:${positionY.at(-1)}px; left:${positionX.at(-1)}px`;
//     document.body.appendChild(img);
    

// }
