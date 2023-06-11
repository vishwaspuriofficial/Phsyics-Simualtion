// set canvas
var canvas = document.getElementById("simulation"),
    context = canvas.getContext("2d");

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    canvas: canvas,
    engine: engine,
});
render.options.wireframes = false;

// create two boxes and a 4ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


positionX = [boxA.position.x];
positionY = [boxA.position.y];
velocityX = [boxA.velocity.x];
velocityY = [boxA.velocity.y];
accelerationX = [];
accelerationY = [];
time = [0];

//Dynamic Frame Per Second
fps = 100


var timer = setInterval(() => {
    if ((positionX.at(-1) == boxA.position.x) && (positionY.at(-1) == boxA.position.y)) {
        xptGraph();
        yptGraph();
        xvtGraph();
        yvtGraph();
        xatGraph();
        yatGraph();
        clearInterval(timer);
    }
    positionX.push(boxA.position.x);
    positionY.push(boxA.position.y);
    velocityX.push(boxA.velocity.x);
    velocityY.push(boxA.velocity.y);
    accelerationX.push((velocityX.at(-1)-velocityX.at(-2))/(fps/1000));
    accelerationY.push((velocityY.at(-1)-velocityY.at(-2))/(fps/1000));
    time.push(Math.round((time.at(-1)+0.1) * 10) / 10);
    console.log(time.at(-1))
}, fps)

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

