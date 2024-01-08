import { Scene3D, PhysicsLoader, Project, ExtendedObject3D } from "enable3d";

export class Player{
    x:number = 0
    y:number = 5
    z:number = 5
    health:number = 0
    jumps:number = 2
    maxJumps:number = 2
    speed:number = 0.1
    traction:number = 0.1
    airspeed:number = this.speed/4
    firstJumpHeight:number = 10
    consectutiveJumpHeight:number = 8
    player
    model
    movingRight:boolean = false
    movingLeft:boolean = false
    movingUp:boolean = false
    movingDown:boolean = false
    grounded:boolean = false
    loaded:boolean = false

    constructor (physics, document) {
        physics.load.gltf('assets/box_man.glb').then(gltf => {
          const child = gltf.scene.children[0]
          const guy = new ExtendedObject3D()
          guy.name = 'man'
          guy.rotateY(Math.PI + 0.1) 
          guy.rotation.set(0, Math.PI * 1.5, 0)

          physics.animationMixers.add(guy.animation.mixer)
          child.animations.forEach(animation => {
            if (animation.name) {
              guy.animation.add(animation.name, animation)
            }
          })
          guy.animation.play('idle')
          physics.add.existing(guy)
          physics.physics.add.existing(guy, {
            shape: 'sphere',
            radius: 0.25,
            width: 0.5,
            offset: { y: -0.25 }
          })
          guy.body.setFriction(0.8)
          guy.body.setAngularFactor(0, 0, 0)
          this.player = guy
          this.loaded = true
        })

        // this.player.body.setFriction(this.traction)
        document.addEventListener("keydown", (e) => {
            if (e.key === "w" && this.jumps > 0) this.movingUp = true;  this.jumps--
            if (e.key === "s") this.movingDown = true;
            if (e.key === "d") this.movingRight = true;
            if (e.key === "a") this.movingLeft = true; 
          });
      
          document.addEventListener("keyup", (e) => {
            if (e.key === "w") this.movingUp = false;
            if (e.key === "s") this.movingDown = false;
            if (e.key === "d") this.movingRight = false;
            if (e.key === "a") this.movingLeft = false;
          });
    }
    resetMovement() {
        this.movingRight = false;
        this.movingLeft = false;
        this.movingUp = false;
        this.movingDown = false;
    }
}

