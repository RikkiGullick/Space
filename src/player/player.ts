import { Mesh } from "three";

export class Player {
    mesh: Mesh;
    x: number = 0;
    y: number = 0;
    rotation: number = 0;
    rotationGoal: number = 0;
    rotationSpeed: number = 0;
    oldDy: number = 0;
    mouseX: number = 0;
    mouseY: number = 0;

    constructor(ship: Mesh) {
        this.mesh = ship;
        this.mesh.scale.set(0.04, 0.04, 0.04);

        this.initMouse();
    }

    initMouse() {
        document.addEventListener('mousemove', (evt) => {
            this.mouseX = -(evt.clientX - (window.innerWidth / 2)) / 600,
            this.mouseY = (evt.clientY - (window.innerHeight / 2)) / 600
        });
    }


    render() {
        let dx = this.mouseX - this.x;
        this.x = this.x + (dx / 15);
      
        let dy = this.mouseY - this.y;
        this.y = this.y + (dy / 10);

        this.calcRotation(dy);

        this.mesh.position.x = this.y;
        this.mesh.position.z = this.x;
        this.mesh.rotation.z = this.rotation;
    }

    calcRotation(dy: number) {      
        this.rotation = this.rotation + this.rotationSpeed;
        
        if ((dy > 0 && this.rotationGoal > 0) || (dy < 0 && this.rotationGoal < 0)) this.rotationGoal *= -1;
      
        this.rotationSpeed += ((this.rotationGoal - this.rotationSpeed) / 20);
      
        if(Math.abs(this.oldDy) > Math.abs(dy)) {
          if(Math.abs(dy) > 0.01) {
            this.rotationGoal = -dy;
          }
        }
      
        this.oldDy = dy;
    }
}