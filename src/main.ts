import { Backgrounds } from "./backgrounds/backgrounds";
import { Asteroids } from "./enemies/asteroids";
import { Collitions } from "./enemies/collisions";
import { ExplosionSystem } from "./enemies/explosions";
import { BulletSystem } from "./player/bullet";
import { Player } from "./player/player";
import { Space } from "./scene/Space";
import { MeshLoader } from "./utilities/meshloader";

const space = new Space();

let meshes = await MeshLoader.loadMeshes([
  { name: "ship", url: 'assets/ship1.glb' },
  { name: "planet", url: 'assets/planet.glb' },
  { name: "rock", url: 'assets/rocks.glb' },
]);
let player = new Player(meshes.ship);

space.scene.add(player.mesh);
let explosions = new ExplosionSystem(space.scene);
let bullets = new BulletSystem(space.scene);
let backgrounds = new Backgrounds(meshes.planet, space.scene);
let asteroids = new Asteroids(meshes.rock, space.scene, explosions);
let collitions = new Collitions(bullets, asteroids);

let tick = 0;
space.renderer.setAnimationLoop((time) => {
  player.render();
  bullets.render();
  backgrounds.render(tick);
  asteroids.render(tick);
  explosions.render();
  space.renderer.render( space.scene, space.camera );
  collitions.check();

  if(!(tick % 5)) {
    bullets.add(player.x - 0.08, player.y, 0.0528);
  }
  tick++;
});