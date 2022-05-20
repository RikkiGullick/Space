import { Mesh } from "three";
import { Backgrounds } from "./backgrounds/backgrounds";
import { Starfield } from "./backgrounds/starfield";
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
  { name: "rock", url: 'assets/rocks2.glb' },
]);
console.log(meshes.rock);
let player = new Player(<Mesh>meshes.ship, space.scene);
let explosions = new ExplosionSystem(space.scene);
let bullets = new BulletSystem(space.scene);
let backgrounds = new Backgrounds(<Mesh>meshes.planet, space.scene);
let asteroids = new Asteroids(<Mesh[]>meshes.rock, space.scene, explosions);
let collitions = new Collitions(bullets, asteroids);
let stars = new Starfield(space.scene); 

let tick = 0;
space.renderer.setAnimationLoop(() => {
  player.render();
  bullets.render();
  backgrounds.render(tick);
  asteroids.render(tick);
  explosions.render();
  space.renderer.render( space.scene, space.camera );
  collitions.check();
  stars.render();

  if(!(tick % 5)) {
    bullets.add(player.x - 0.12, player.y, 0.0638, 0);
    bullets.add(player.x - 0.12, player.y, 0.0528, 0.005);
    bullets.add(player.x - 0.12, player.y, 0.0638, -0.005);
  }
  tick++;
});