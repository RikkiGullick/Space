import { AdditiveBlending, Sprite, SpriteMaterial, TextureLoader, Box3, Scene, Texture } from "three";
import { BulletSystem } from "../player/bullet";
import { Asteroids } from "./asteroids";

export class Collitions {
    explosions: Explosions;

    constructor(private scene: Scene, private bullets: BulletSystem, private astroids: Asteroids) {
        this.explosions = new Explosions(this.scene);
    }

    check() {
        const bullets = this.bullets.bullets;

        for(var a = 0; a < this.astroids.rocks.length; a++) {
            const asteroid = this.astroids.rocks[a];
            if(asteroid.dead) continue;

            const box = new Box3().setFromObject(asteroid.mesh);
            for(var i = 0; i < bullets.length; i++) {
                const bullet = bullets[i];
                if(!bullet.dead && box.containsPoint(bullet.sprite.position)) {
                    //bullet.dead = true;
                    asteroid.dead = true;
                    this.scene.remove(asteroid.mesh);
                    //this.scene.remove(bullet.sprite);

                    this.explosions.add(bullet.x, bullet.y, asteroid.speed);
                }
            }
        }

        this.explosions.render();
    }
}

class Explosions {
    sprites: Sprite[] = [];
    explosions: { frame: number, sprite: THREE.Sprite, dead: boolean, speed: number }[] = [];

    constructor(private scene: Scene) {
        for(var i = 0; i< 100; i++) {
            const map = new TextureLoader().load( 'assets/explosion-l.png' );
            const material = new SpriteMaterial( { map: map } );
            map.repeat.set(1/32,1);
            map.offset.set(1/32*12, 0);
            material.blending = AdditiveBlending;
            const sprite = new Sprite( material );
            sprite.scale.set(0.5, 0.5, 0.5);
            this.sprites.push(sprite);
        }
    }

    add(x: number, y: number, speed: number) {
        let sprite: Sprite;
        this.explosions = this.explosions.filter(x => !x.dead);

        this.explosions.push({
            dead: false,
            sprite: sprite = <Sprite>this.sprites.pop(),
            speed: speed,
            frame: 0
        });
        sprite.position.z = x;
        sprite.position.x = y;
        sprite.material.rotation = Math.random() * Math.PI * 2;
        const size = 0.25 + (Math.random() * 0.5);
        sprite.scale.set(size, size, size);
        this.scene.add(sprite);
    }

    render() {
        for(var i = 0; i < this.explosions.length; i++) {
            var explosion = this.explosions[i];
            if(explosion.dead) continue;

            explosion.sprite.material.map?.offset.set(1/32 * explosion.frame, 0);
            explosion.sprite.position.z += explosion.speed;

            explosion.frame++;
            if(explosion.frame > 31) {
                explosion.dead = true;
                this.scene.remove(explosion.sprite);
                this.sprites.push(explosion.sprite);
            }
        }
    }

}