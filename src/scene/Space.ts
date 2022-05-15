import { WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, FogExp2 } from "three";

export class Space {
    scene: Scene;
    camera: PerspectiveCamera;
    renderer: THREE.WebGLRenderer;

    constructor() {
        this.scene = new Scene();
        this.scene.fog = new FogExp2(0x000000, .08);
        this.camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 40);
        this.renderer = new WebGLRenderer( { antialias: true } );
        this.initCamera();
        this.initLight();
        this.initRenderer();
    }

    private initLight() {
        const light = new DirectionalLight(0xFFFFFF, 2);
        light.position.set(-20, 2, 2);
        this.scene.add( light );
    }

    private initCamera() {
        this.camera.position.y = 2.6;
        this.camera.rotation.set(-Math.PI/2, 0, Math.PI/2);
    }

    private initRenderer() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
    }
}