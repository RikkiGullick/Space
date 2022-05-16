import { Box3 } from "three";
import { BulletSystem } from "../player/bullet";
import { Asteroids } from "./asteroids";

export class Collitions {
    constructor(private bullets: BulletSystem, private astroids: Asteroids) {
    }

    check() {
        const bullets = this.bullets.bullets;

        for(var a = 0; a < this.astroids.rocks.length; a++) {
            const asteroid = this.astroids.rocks[a];
            if(!asteroid.dead) {
                const box = new Box3().setFromObject(asteroid.mesh);
                for(var i = 0; i < bullets.length; i++) {
                    const bullet = bullets[i];
                    if(!bullet.dead && box.containsPoint(bullet.sprite.position)) {
                        this.bullets.remove(bullet);
                        this.astroids.remove(asteroid, true);
                    }
                }
            }
        }
    }
}

