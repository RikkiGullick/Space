import * as THREE from "three";
import { AdditiveBlending } from "three";

interface IBullet {
    x: number; 
    y: number; 
    sprite: THREE.Sprite;
    dead: boolean;
    speed: number;
    speedy: number;
}
export class BulletSystem {
    sprite: THREE.Sprite;
    bullets: IBullet[];
    constructor(private scene: THREE.Scene) {
        const map = new THREE.TextureLoader().load( 'assets/laser.png' );
        const material = new THREE.SpriteMaterial( { map: map } );
        material.blending = AdditiveBlending;
        this.sprite = new THREE.Sprite( material );
        this.sprite.scale.set(0.05, 0.02, 0.1);
        this.bullets = [];
    }

    add(x: number, y: number, speed: number, speedy: number) {
        let bullet = this.sprite.clone();
        this.scene.add(bullet);
        this.bullets.push({
            x: x,
            y: y,
            sprite: bullet,
            dead: false,
            speed: speed,
            speedy: speedy
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
            b.y = b.y - b.speedy;
            if(b.x < -2) this.remove(b);
            b.sprite.position.z = b.x;
            b.sprite.position.x = b.y;
        }
    }

    remove(bullet: IBullet) {
        this.scene.remove(bullet.sprite);
        bullet.dead = true;
    }
}