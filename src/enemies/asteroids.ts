import { Mesh, Scene } from "three";
import { ExplosionSystem } from "./explosions";

interface asteroid {
    mesh: Mesh;
    x: number;
    y: number;
    dead: boolean;
    speed: number;
    rot: { x: number, y: number, z: number };
}

export class Asteroids {
    rockBin: Mesh[] = [];
    rocks: asteroid[] = [];

    constructor(private rock: Mesh, private scene: Scene, private explosions: ExplosionSystem) { 
        for(var i = 0; i < 200; i++) {
            this.rockBin.push(this.rock.clone());
        }
    }

    render(tick: number) {
        if(tick % (25 + Math.round(Math.random() * 2)) === 0) for(var i=0; i< Math.random() * 50; i++) this.addRock();

        for(var i = 0; i < this.rocks.length; i++) {
            const rock = this.rocks[i];
            rock.x = rock.x + rock.speed;

            rock.mesh.position.z = rock.x;
            rock.mesh.position.x = rock.y;
            rock.mesh.rotation.x += rock.rot.x;
            rock.mesh.rotation.y += rock.rot.y;
            rock.mesh.rotation.z += rock.rot.z;

            if(rock.x > 2) this.remove(rock);
        }
    }

    addRock() {
        if(!this.rockBin.length) return;
        this.rocks = this.rocks.filter(x => !x.dead);

        let rock: asteroid;
        this.rocks.push(rock = {
            mesh: <Mesh>this.rock.clone(), //rockBin.pop(),
            x: -2,
            y: Math.random() * 2 - 1,
            dead: false,
            speed: 0.02 + Math.random() / 250,
            rot: { x: (Math.random() - 0.5) / 10, y: (Math.random() - 0.5) / 10, z: (Math.random() - 0.5) / 10 }
        });

        rock.mesh.scale.set(0.04 + Math.random() / 8, 0.04 + Math.random() / 8, 0.04 + Math.random() / 8);
        rock.mesh.position.z = rock.x;
        rock.mesh.position.x = rock.y;
        rock.mesh.rotation.x = 0;
        rock.mesh.rotation.y = 0;
        rock.mesh.rotation.z = 0;

        this.scene.add(rock.mesh);
    }

    remove(asteroid: asteroid, explode: boolean = false) {
        asteroid.dead = true;
        this.scene.remove(asteroid.mesh);
        //this.rockBin.push(asteroid.mesh);
        if(explode) {
            this.explosions.add(asteroid.x, asteroid.y, asteroid.speed);
        }
    }
}