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
var engine = Engine.create({
    enableSleeping: true
});

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
var border = [],
    thickness = 10000 

border.push(Bodies.rectangle(400, 600 + thickness/2, 800 + thickness, thickness, { isStatic: true }));
border.push(Bodies.rectangle(400, - thickness/2, 800 + thickness, thickness, { isStatic: true }));
border.push(Bodies.rectangle(-thickness/2, 300, thickness, 600 + thickness, { isStatic: true }));
border.push(Bodies.rectangle(800 + thickness/2, 300, thickness, 600 + thickness, { isStatic: true }));
// add ground the world
Composite.add(engine.world, border);

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
colours = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]


function startSimulation() {
    objects.forEach(function(object) {
        if (object.isStatic){
            Matter.Sleeping.set(object, false)
            Matter.Body.setStatic(object, false)
        }
    });
}

function clearObjects() {
    location.reload()
}

function createObject() {
    var box = Bodies.rectangle(400,200,document.getElementById("length").value,document.getElementById("width").value, {render: {
        fillStyle: colours.at(objects.length),
        strokeStyle: 'white',
        lineWidth: 3}})
    Matter.Body.setMass(box, parseFloat(document.getElementById("mass").value))
    Matter.Body.setStatic(box, true)
    Matter.Events.on(box, "sleepStart", function(e){
        if (selectedObject == box.render.fillStyle) {
        console.log("change")
        createGraph(selectedObject, document.getElementById("graph").innerText.slice(-3))
    }})
    objects.push(box)
    if (objects.length==6) {
        document.getElementById("addObject").disabled = true;
        document.getElementById("ao").remove()
    }
    Composite.add(engine.world, [objects.at(-1)]);
    dynamicOptions()
}

function dynamicOptions() {
    var options = "";
    var x = 0;
    
    objects.forEach(function(object){
        x++
        var colour =  colours.at(x-1).charAt(0).toUpperCase() + colours.at(x-1).slice(1)
        options += `<li><a onclick="selectObject('${colour}')" class="dropdown-item">Object ${colour}</a></li>`;
    });
 document.getElementById("dynamicObjects").innerHTML = options;
}

// function simulationData() {
//     objects.forEach(function(object){
//         console.log(object)
//         Object.assign(object,{positionX: [object.position.x]});
//         Object.assign(object,{positionY: [object.position.y]});
//         Object.assign(object,{velocityX: [object.velocity.x]});
//         Object.assign(object,{velocityY: [object.velocity.x]});
//         Object.assign(object,{accelerationX: []});
//         Object.assign(object,{accelerationY: []});
//         Object.assign(object,{time: [0]});

//         Math.round((object.positionX.at(-1)) * 100) / 100

//         var timer = setInterval(() => {
//             console.log(object.positionY.at(-1), object.position.y);
//             if (((Math.round((object.positionX.at(-1)) * 100) / 100) == (Math.round((object.position.x) * 100) / 100)) && ((Math.round((object.positionY.at(-1)) * 100) / 100) == (Math.round((object.position.y) * 100) / 100))) {
//                 vals.push(object)
//                 clearInterval(timer); 
//                 console.log(vals);
//             }
//             object.positionX.push(object.position.x);
//             object.positionY.push(object.position.y);
//             object.velocityX.push(object.velocity.x);
//             object.velocityY.push(object.velocity.y);
//             object.accelerationX.push((object.velocityX.at(-1)-object.velocityX.at(-2))/(fps/1000));
//             object.accelerationY.push((object.velocityY.at(-1)-object.velocityY.at(-2))/(fps/1000));
//             object.time.push(Math.round((object.time.at(-1)+0.1) * 10) / 10);
//         }, fps)
//     });
// }

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
    object = objects.at(colours.indexOf(selectedObject));
    if (graph=="xpt") {
        drawGraph(object, object.positionX, "xptGraph",'X-Position (cm)')
    }
    else if (graph=="ypt") {
        drawGraph(object, object.positionY, "yptGraph",'Y-Position (cm)')
    }
    else if (graph=="xvt") {
        drawGraph(object, object.velocityX, "xvtGraph",'X-Velocity (cm/ms)')
    }
    else if (graph=="yvt") {
        drawGraph(object, object.velocityY, "yvtGraph",'Y-Velocity (cm/ms)')
    }
    else if (graph=="xat") {
        drawGraph(object, object.accelerationX,"xatGraph",'X-Acceleration (cm/ms^2)')
    }
    else if (graph=="yat") {
        drawGraph(object, object.accelerationY,"yatGraph",'Y-Acceleration (cm/ms^2)')
    }
}

function drawGraph(object,data,gt,title) {
    new Chart(gt, {
        type: "line",
        data: {
            labels: object.time,
            datasets: [{
                data: data,
                label: "Movement of Object "+ selectedObject,
            }]
        },
        options: {
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Time (ms)'
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: title
                }
              }]
            }     
          }
      });
}

selectedObject = ""
function selectObject(obj) {
    selectedObject = obj
    document.getElementById("obj").innerHTML = "Choose Object: " + obj;
    createGraph(obj, document.getElementById("graph").innerText.slice(-3))
}