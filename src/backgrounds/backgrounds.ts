import { Mesh, Scene } from "three";

export class Backgrounds {
    planets: Mesh[] = [];
    constructor(private planet: Mesh, private scene: Scene) {
    }

    render(tick: number) {
        if(tick === 0) {
            let p: Mesh;
            this.planets.push(p = this.planet.clone());
            p.position.y = -3;
            p.position.x = 1;
            this.scene.add(p);
            this.planets.push(p = this.planet.clone());
            p.position.y = -9;
            p.position.x = 0;
            p.position.z = 0;
            this.scene.add(p);
        }
        for(var i = 0; i < this.planets.length; i++) {
            this.planets[i].position.z += 0.002;
            this.planets[i].rotation.x += 0.001;
            this.planets[i].rotation.z += 0.0004;
        }
    }
}