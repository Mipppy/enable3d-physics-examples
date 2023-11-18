import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from "enable3d";
import * as THREE from "three";
var frames = 0;
var startTime = performance.now();
var fpsElement = document.getElementById("fps")!;
let mouse, raycaster, map, previousMap, slope0, slope1, slope2, slope3, slopePlane;
let mountainPiece1, mountainPiece2, mountainPiece3, mountainPiece4,mountainPiece5
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
    map = this.physics.add.ground({ width: 21, height: 21 })
    map.body.setFriction(1)
    map.body.setBounciness(1)
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed("-ground");
    // position camera
    this.camera.position.set(17, 11, 22);
    this.camera.rotation.set(-0.521859351223322, 0.6624499805017356, 0.3399445956672308,)
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
    //gltf loader
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
  }

  getAndSwitchMap() {
    var currentMap = Number((document.getElementById("map") as HTMLSelectElement).options[(document.getElementById("map") as HTMLSelectElement).selectedIndex].value)
    console.log(currentMap)
    if (previousMap !== currentMap) {
      if (currentMap === 0) {
        map = this.physics.add.ground({ width: 21, height: 21 })
        try {
          this.destroy(slope0)
          this.physics.destroy(slope0);
          this.destroy(slope1)
          this.physics.destroy(slope1)
          this.destroy(slope2)
          this.physics.destroy(slope2)
          this.destroy(slope3)
          this.physics.destroy(slope3)
          this.destroy(slopePlane)
          this.physics.destroy(slopePlane)

        } catch (err) {
          void (0)
        }
        try {
          this.destroy(mountainPiece1)
          this.physics.destroy(mountainPiece1)
          this.destroy(mountainPiece2)
          this.physics.destroy(mountainPiece2)
          this.destroy(mountainPiece3)
          this.physics.destroy(mountainPiece3)
          this.destroy(mountainPiece4)
          this.physics.destroy(mountainPiece4)
          this.destroy(mountainPiece5)
          this.physics.destroy(mountainPiece5)
          this.camera.position.set(17, 11, 22);
          this.camera.rotation.set(-0.521859351223322, 0.6624499805017356, 0.3399445956672308,)
        }
        catch( err) {
          void(0)
        }
      } else if (currentMap === 1) {
        this.camera.position.set(27, 21, 32);
        this.camera.rotation.set(-0.521859351223322, 0.6624499805017356, 0.3399445956672308,)
        slope0 = this.add.box({ width: 21, depth: 21 });
        slope0.position.set(20, 4, 0);
        slope0.rotateZ(Math.PI / 8);
        this.physics.add.existing(slope0, { mass: 0, collisionFlags: 1 });
        slope0.body.setFriction(1);
        slope0.body.setBounciness(1)
        slope1 = this.add.box({ width: 21, depth: 21 });
        slope1.position.set(0, 7, -18);
        slope1.rotateX(Math.PI / 4);
        this.physics.add.existing(slope1, { mass: 0, collisionFlags: 1 });
        slope1.body.setFriction(1);
        slope1.body.setBounciness(1)
        slope2 = this.add.box({ width: 21, depth: 21 });
        slope2.position.set(0, 2, 20);
        slope2.rotateX(Math.PI / -20);
        this.physics.add.existing(slope2, { mass: 0, collisionFlags: 1 });
        slope2.body.setFriction(1);
        slope2.body.setBounciness(1)
        slope3 = this.add.box({ width: 21, depth: 21 });
        slope3.position.set(-18, -8, 0);
        slope3.rotateZ(-150);
        this.physics.add.existing(slope3, { mass: 0, collisionFlags: 1 });
        slope3.body.setFriction(1);
        slope3.body.setBounciness(1)
        slopePlane = this.add.box({ width: 21, depth: 21 });
        slopePlane.position.set(-30, -20, 0);
        this.physics.add.existing(slopePlane, { mass: 0, collisionFlags: 1 });
        slopePlane.body.setFriction(1);
        slopePlane.body.setBounciness(1)
        try {
          this.destroy(mountainPiece1)
          this.physics.destroy(mountainPiece1)
          this.destroy(mountainPiece2)
          this.physics.destroy(mountainPiece2)
          this.destroy(mountainPiece3)
          this.physics.destroy(mountainPiece3)
          this.destroy(mountainPiece4)
          this.physics.destroy(mountainPiece4)
          this.destroy(mountainPiece5)
          this.physics.destroy(mountainPiece5)
          this.camera.position.set(17, 11, 22);
          this.camera.rotation.set(-0.521859351223322, 0.6624499805017356, 0.3399445956672308,)
        }
        catch( err) {
          void(0)
        }
      }
      else if (currentMap === 2) {
         mountainPiece1 = this.add.sphere(
          { x: 13, y: 0, z: 0, radius: Number(5), heightSegments: Number(1), widthSegments: Number(1) },
          {
            phong: { color: "green" },
          }
        );
        this.physics.add.existing(mountainPiece1, { shape: "convex" })
        mountainPiece1.body.setCollisionFlags(2)
        mountainPiece2 = this.add.sphere(
          { x: 2, y: 1, z: 0, radius: Number(13), heightSegments: Number(1), widthSegments: Number(5) },
          {
            phong: { color: "green" },
          }
        );
        this.physics.add.existing(mountainPiece2, { shape: "convex" })
        mountainPiece2.body.setCollisionFlags(2)
        mountainPiece3 = this.add.sphere(
          { x: -2, y: 6, z: -3, radius: Number(3), heightSegments: Number(6), widthSegments: Number(4) },
          {
            phong: { color: "green" },
          }
        );
        this.physics.add.existing(mountainPiece3, { shape: "convex" })
        mountainPiece3.body.setCollisionFlags(2)
        mountainPiece4 = this.add.sphere(
          { x: 6, y: 3, z: 5, radius: Number(6), heightSegments: Number(1), widthSegments: Number(5) },
          {
            phong: { color: "green" },
          }
        );
        this.physics.add.existing(mountainPiece4, { shape: "convex" })
        mountainPiece4.body.setCollisionFlags(2)
        mountainPiece5= this.physics.add.ground({ width: 40, height: 40 })
        try {
          this.destroy(slope0)
          this.physics.destroy(slope0);
          this.destroy(slope1)
          this.physics.destroy(slope1)
          this.destroy(slope2)
          this.physics.destroy(slope2)
          this.destroy(slope3)
          this.physics.destroy(slope3)
          this.destroy(slopePlane)
          this.physics.destroy(slopePlane)

        } catch (err) {
          void (0)
        }
      }
    }
    previousMap = currentMap;
  }
  update() {
    const currentTime = performance.now();
    const deltaTime = currentTime - startTime;
    frames++;
    if (deltaTime >= 1000) {
      this.getAndSwitchMap()
      const fps = Math.round((frames * 1000) / deltaTime);
      fpsElement.textContent = `FPS: ${fps}`;

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
          {
            phong: { color: color },
          }
        );
        this.physics.add.existing(ball, { shape: "convex" })
        ball.body.setBounciness(bounce)
        ball.body.setGravity(0, gravity, 0)
        ball.body.setFriction(friction)
        ball.body.setCollisionFlags(Number(objectType))
      }
      else if (e?.selectedIndex === 2) {
        var height = (document.getElementById("cylinder-height") as HTMLInputElement)?.value !== "" ? (document.getElementById("cylinder-height") as HTMLInputElement).value : 2;
        var bottomRadius = (document.getElementById("bottom-radius") as HTMLInputElement)?.value !== "" ? (document.getElementById("bottom-radius") as HTMLInputElement).value : 1;
        var topRadius = ((document.getElementById("top-radius") as HTMLInputElement)?.value !== "" ? (document.getElementById("top-radius") as HTMLInputElement).value : 1);
        var startOnSideBool = ((document.getElementById("cylinder-start-on-side") as HTMLInputElement)?.value !== "" ? (document.getElementById("cylinder-start-on-side") as HTMLInputElement).checked : false);
        const cylinder = this.add.cylinder({
          x: intersectionPoint.x,
          y: intersectionPoint.y,
          z: intersectionPoint.z,
          radiusTop: Number(topRadius),
          radiusBottom: Number(bottomRadius),
          height: Number(height),
        }, {
          phong: { color: color },
          compound: true,
        });
        if (startOnSideBool) {
          cylinder.rotateX(-80)
        }
        this.physics.add.existing(cylinder, { shape: "convex" })
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