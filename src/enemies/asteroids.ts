import { Mesh, Scene } from "three";

interface asteroid {
    mesh: Mesh;
    x: number;
    y: number;
    dead: boolean;
    speed: number;
    rot: { x: number, y: number, z: number };
}

export class Asteroids {
    rocks: asteroid[] = [];

    constructor(private rock: Mesh, private scene: Scene) {
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

            if(rock.x > 2) { 
                rock.dead = true;
                this.scene.remove(rock.mesh);
            }
        }
    }

    addRock() {
        let mesh: Mesh = this.rock.clone();
        this.rocks = this.rocks.filter(x => !x.dead);
        this.rocks.push({
            mesh: mesh,
            x: -2,
            y: Math.random() * 2 - 1,
            dead: false,
            speed: 0.02 + Math.random() / 250,
            rot: { x: (Math.random() - 0.5) / 10, y: (Math.random() - 0.5) / 10, z: (Math.random() - 0.5) / 10 }
        });
        mesh.scale.set(0.04 + Math.random() / 8, 0.04 + Math.random() / 8, 0.04 + Math.random() / 8);
        this.scene.add(mesh);
    }
}