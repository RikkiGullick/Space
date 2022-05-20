import { BufferGeometry, Float32BufferAttribute, MathUtils, Points, PointsMaterial, Scene } from "three";

export class Starfield {
    points: Points;
    points2: Points;

    constructor(private scene: Scene) {
        const vertices = [];

        for ( let i = 0; i < 3000; i +=20 ) {
            const x = MathUtils.randFloatSpread( 8 );
            const y = MathUtils.randFloatSpread( 3 ) - 8;
            const z = MathUtils.randFloatSpread( 14 );

	        vertices.push( x, y, z );
        }

        const geometry = new BufferGeometry();
        geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

        const material = new PointsMaterial( { color: 0xaaaaaa } );
        material.size = 0.03;
        this.points = new Points( geometry, material );
        this.points2 = this.points.clone();
        this.points2.position.z = -14;
        this.points2.material = (<PointsMaterial>this.points.material).clone();

        this.scene.add(this.points);
        this.scene.add(this.points2);
    }

    render() {
        this.points.position.z = this.points.position.z + 0.002;
        this.points2.position.z = this.points2.position.z + 0.002;

        if(this.points.position.z > 14) {
            this.points.position.z -= 14;
            this.points2.position.z -= 14;
        }
    }
}