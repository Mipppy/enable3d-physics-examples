
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from "enable3d";
import * as THREE from "three";
import { Player } from "./player"
var frames: number = 0;
var startTime: number = performance.now();
var fpsElement: HTMLElement = document.getElementById("fps")!;
let mouse: THREE.Vector2, raycaster: THREE.Raycaster, player: Player, ground: ExtendedObject3D
let players: Player[] = []

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

  async preload() {
    const model = this.load.preload('man', '/assets/box_man.glb')
  }

  async create() {
    if (this.physics.debug) {
      this.physics.debug.enable();
    }

    this.warpSpeed("-ground")
    ground = this.physics.add.ground({ width: 21, height: 21 })
    ground.body.setFriction(1)
    this.camera.position.set(0, .75, -40);
    this.camera.lookAt(0, 0, 5)
    new Promise((resolve) => {
      const player = new Player(this, document, (loadedPlayer) => {
        resolve(loadedPlayer);
      });
    });

  }

  async update() {
    if (player.movingRight) {
      player.player.body.applyForceX(-(player.grounded ? player.speed : player.airspeed))
    }
    if (player.movingLeft) {
      player.player.body.applyForceX(player.grounded ? player.speed : player.airspeed)
    }
    if (player.movingUp) {
      if (!player.grounded) {
        player.player.body.setVelocity(0, 0, player.player.body.velocity.z)
      }
      player.player.body.applyForceY((player.grounded ? player.consectutiveJumpHeight : player.firstJumpHeight))
      setTimeout(() => { player.jumps-- }, 10)
      player.movingUp = false
    }
    if (player.movingDown) {
      player.player.body.applyForceY(-player.consectutiveJumpHeight / 1.2)
      player.movingDown = false
    }
    fps()
  }
}
const config = {
  scenes: [ThreePhysicsComponent],
  antialias: true,
  gravity: { x: 0, y: -9.81, z: 0 },
};
PhysicsLoader("/ammo", () => {
  new Project(config)
});


function fps() {
  const currentTime = performance.now();
  const deltaTime = currentTime - startTime;
  frames++;
  if (deltaTime >= 1000) {
    const fps = Math.round((frames * 1000) / deltaTime);
    fpsElement.textContent = `FPS: ${fps}`;

    frames = 0;
    startTime = currentTime;
  }
}