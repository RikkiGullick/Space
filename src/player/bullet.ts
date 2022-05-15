import * as THREE from "three";

export class BulletSystem {
    sprite: THREE.Sprite;
    bullets: { x: number, y: number, sprite: THREE.Sprite, dead: boolean, speed: number }[];
    constructor(private scene: THREE.Scene) {
        const map = new THREE.TextureLoader().load( 'assets/laser.png' );
        const material = new THREE.SpriteMaterial( { map: map } );
        this.sprite = new THREE.Sprite( material );
        this.sprite.scale.set(0.05, 0.02, 0.1);
        this.bullets = [];
    }

    add(x: number, y: number, speed: number) {
        let bullet = this.sprite.clone();
        this.scene.add(bullet);
        this.bullets.push({
            x: x,
            y: y,
            sprite: bullet,
            dead: false,
            speed: speed
        });
        bullet.position.set(y, 0, x);
        bullet.scale.set(Math.random() * 0.2 + 0.015, 0.0008 + Math.random() * 0.02, 0.01);
        
        this.bullets = this.bullets.filter(x => !x.dead);
    }

    render() {
        for(var i=0; i<this.bullets.length; i++) {
            var b = this.bullets[i];
            if(b.dead) continue;
            b.x = b.x - b.speed;
            if(b.x < -2) {
                this.scene.remove(b.sprite);
                b.dead = true;
            }

            b.sprite.position.z = b.x;
            //b.sprite.material.opacity = 0.5 + Math.random() * 2;
        }
    }
}