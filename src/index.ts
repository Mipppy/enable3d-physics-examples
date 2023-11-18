import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from "enable3d";
import * as THREE from "three";

var frames = 0;
var startTime = performance.now();
var fpsElement = document.getElementById("fps")!;
let mouse, raycaster, map;
export class ThreePhysicsComponent extends Scene3D {
  constructor() {
    super();
  }

  async init() {
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

  }

  async preload() { }

  async create() {
    // map = this.physics.add.ground({ width: 40, height: 40 })

    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed();
    // position camera
    this.camera.position.set(13, 10, 23);

    //this.haveSomeFun()
    // enable physics debug
    if (this.physics.debug) {
      this.physics.debug.enable();
    }

    let torus1 = this.physics.add.torus(
      { y: 10, z: 3, tube: 0.2, radialSegments: 16, tubularSegments: 16 },
      { lambert: { color: "orange" } }
    );
    torus1.body.applyForceX(5);
    // //gltf loader
    // new GLTFLoader().loadAsync("/fountain.glb").then((gltf) => {
    //   const duck: any = gltf.scene.children[0];
    //   duck.position.y += 1;
    //   duck.scale.set(1.05, 1.05, 1.05);
    //   const object = new ExtendedObject3D();
    //   object.add(duck);
    //   object.position.z = 6;
    //   this.add.existing(object);
    //   this.physics.add.existing(object, {
    //     shape: "box",
    //     width: 2,
    //     height: 2,
    //     depth: 2,
    //   });
    //   // duck.position.z = 6
    //   // this.scene.add(duck as any)
    //   // this.physics.add.existing(duck, { shape: 'convex'})
    // });

    const ball = this.physics.add.sphere(
      { x: -200, y: 20, radius: 3, heightSegments: 16, widthSegments: 16 },
      { phong: { color: "black" } }
    );
    ball.body.applyForceX(110);
    for (let y = 0; y <= 6; y += 2) {
      for (let z = -6; z <= 6; z += 2) {
        for (let x = 4; x <= 8; x += 2) {
          this.physics.add.box(
            { x, y, z, width: 1.95, height: 1.95, depth: 1.95, mass: 0.3 },
            { phong: { color: "orange" } }
          );
        }
      }
    }
    this.renderer.domElement.addEventListener(
      "click",
      this.onMouseClick.bind(this)
    );
    setInterval(()=> {
      this.getAndSwitchMap.bind(this)
    },1000)
  }
  getAndSwitchMap() {
    var currentMap = Number((document.getElementById("map") as HTMLSelectElement).options[(document.getElementById("map") as HTMLSelectElement).selectedIndex].value)
    if (currentMap === 0) {

    }
    else if(currentMap === 1) {

    }
    else if (currentMap === 2) {

    }
  }
  update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - startTime;

    // Increment frame count
    frames++;

    // Update FPS every second
    if (deltaTime >= 1000) {
      const fps = Math.round((frames * 1000) / deltaTime);
      fpsElement.textContent = `FPS: ${fps}`;

      // Reset variables for the next second
      frames = 0;
      startTime = currentTime;
    }
  }
  onMouseClick(event) {
    var e = document.getElementById("options-menu") as HTMLSelectElement | null;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 0.98;

    raycaster.setFromCamera(mouse, this.camera);

    // Calculate the intersection point in the 3D space
    const intersects = raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;
      var objectType = getObjectType()
      var color = (document.getElementById("color") as HTMLInputElement).value !== "" ? (document.getElementById("color") as HTMLInputElement).value : "#0000ff"
      var gravity = Number((document.getElementById("gravity") as HTMLInputElement).value !== "" ? (document.getElementById("gravity") as HTMLInputElement).value : -10)
      var bounce = Number((document.getElementById("bounce") as HTMLInputElement).value !== "" ? (document.getElementById("bounce") as HTMLInputElement).value : 0) / 100
      var friction = Number((document.getElementById("friction") as HTMLInputElement).value !== "" ? (document.getElementById("friction") as HTMLInputElement).value : 50) / 100
      console.log(`Bounce: ${bounce}, Gravity: ${gravity}, Friction: ${friction}`)
      if (e?.selectedIndex === 0) {
        var squareWidth = (document.getElementById("square-width") as HTMLInputElement)?.value !== "" ? (document.getElementById("square-width") as HTMLInputElement).value : 1;
        var squareHeight = (document.getElementById("square-height") as HTMLInputElement)?.value !== "" ? (document.getElementById("square-height") as HTMLInputElement).value : 1;
        var squareLength = ((document.getElementById("square-length") as HTMLInputElement)?.value !== "" ? (document.getElementById("square-length") as HTMLInputElement).value : 1);
        const box = this.add.box(
          {
            x: intersectionPoint.x,
            y: intersectionPoint.y,
            z: intersectionPoint.z,
            width: Number(squareWidth),
            height: Number(squareHeight),
            depth: Number(squareLength),
          },
          {
            phong: { color: color },  
          }
        );
        this.physics.add.existing(box);
        box.body.setBounciness(bounce)
        box.body.setGravity(0, gravity, 0)
        box.body.setFriction(friction)
        box.body.setCollisionFlags(Number(objectType))
      }
      else if (e?.selectedIndex === 1) {
        var circleRadius = ((document.getElementById("circle-radius") as HTMLInputElement)?.value !== "" ? (document.getElementById("circle-radius") as HTMLInputElement).value : 1);
        var circleWidthSegments = ((document.getElementById("circle-width-segments") as HTMLInputElement)?.value !== "" ? (document.getElementById("circle-width-segments") as HTMLInputElement).value : 16);
        var circleHeightSegments = ((document.getElementById("circle-height-segments") as HTMLInputElement)?.value !== "" ? (document.getElementById("circle-height-segments") as HTMLInputElement).value : 16);
        
        const ball = this.add.sphere(
          { x: intersectionPoint.x, y: intersectionPoint.y, z: intersectionPoint.z, radius: Number(circleRadius), heightSegments: Number(circleHeightSegments), widthSegments: Number(circleWidthSegments) },
          { phong: { color: color }, 
        }
        );
        this.physics.add.existing(ball, {shape: "convex"})
        ball.body.setBounciness(bounce)
        ball.body.setGravity(0, gravity, 0)
        ball.body.setFriction(friction)
        ball.body.setCollisionFlags(Number(objectType))
      }
      else if (e?.selectedIndex === 2) {
        var height = (document.getElementById("cylinder-height") as HTMLInputElement)?.value !== "" ? (document.getElementById("cylinder-height") as HTMLInputElement).value : 2;
        var bottomRadius = (document.getElementById("bottom-radius") as HTMLInputElement)?.value !== "" ? (document.getElementById("bottom-radius") as HTMLInputElement).value : 1;
        var topRadius = ((document.getElementById("top-radius") as HTMLInputElement)?.value !== "" ? (document.getElementById("top-radius") as HTMLInputElement).value : 1);
        const cylinder = this.add.cylinder({
          x: intersectionPoint.x,
          y: intersectionPoint.y,
          z: intersectionPoint.z,
          radiusTop: Number(topRadius),
          radiusBottom: Number(bottomRadius),
          height: Number(height)
        }, {
          phong: { color: color },
          compound: true,        });

        this.physics.add.existing(cylinder, { shape: "convex"})
        cylinder.body.setBounciness(bounce);
        cylinder.body.setGravity(0, gravity, 0);
        cylinder.body.setFriction(friction);
        cylinder.body.setCollisionFlags(Number(objectType))
      }
    }
  }
}

const config = {
  scenes: [ThreePhysicsComponent],
  antialias: true,
  gravity: { x: 0, y: -9.81, z: 0 },
};
PhysicsLoader("/ammo", () => new Project(config));

document.getElementById("options-menu")?.addEventListener("change", (element) => {
  hideOtherElements()
  var currentObjectSelected = (element.target as HTMLSelectElement).options[(element.target as HTMLSelectElement).selectedIndex].text
  document.getElementById("selected-object")!.innerText = currentObjectSelected;
  if ((element.target as HTMLSelectElement).selectedIndex === 0) {
    var squareElements = document.getElementsByName("square")
    for (let i = 0; i < squareElements.length; i++) {
      squareElements[i].style.display = "inline-block";
    }
  }
  else if ((element.target as HTMLSelectElement).selectedIndex === 1) {
    var circleElements = document.getElementsByName("circle")
    for (let i = 0; i < circleElements.length; i++) {
      circleElements[i].style.display = "inline-block";
    }
  }
  else if ((element.target as HTMLSelectElement).selectedIndex === 2) {
    var cylinderElements = document.getElementsByName("cylinder")
    for (let i = 0; i < cylinderElements.length; i++) {
      cylinderElements[i].style.display = "inline-block"
    }
  }
})
// document.getElementById("map")?.addEventListener("change", (element) => {
//   var currentMap = (element.target as HTMLSelectElement).options[(element.target as HTMLSelectElement).selectedIndex].value
//   loadMap(currentMap)
// })
// function loadMap(mapNumber) {
//   if (mapNumber === 0) {

//   }
//   else if (mapNumber === 1) {

//   }
//   else if (mapNumber === 2) {

//   }
// }



function hideOtherElements() {
  var elementNodeList = document.querySelectorAll(".editor")
  for (let i = 0; i < elementNodeList.length; i++) {
    (elementNodeList[i] as HTMLInputElement).style.display = "none";
  }
}
hideOtherElements()
var squareElements = document.getElementsByName("square")
for (let i = 0; i < squareElements.length; i++) {
  squareElements[i].style.display = "inline-block";
}
function getObjectType() {
  var objectType = (document.getElementById('object-type') as HTMLSelectElement).options[(document.getElementById("object-type") as HTMLSelectElement).selectedIndex].value;
  return objectType;
}