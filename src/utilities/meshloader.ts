import { Mesh } from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface MeshLoaderData {
    name: string;
    url: string;
}

interface LoadedMeshes { [Key: string]: Mesh | Mesh[] }
const loader = new GLTFLoader();

export class MeshLoader {
    
    static async loadMeshes(data: MeshLoaderData[]): Promise<LoadedMeshes> {
        let results: LoadedMeshes = {};
        for(let i = 0; i < data.length; i++) {
            const item = data[i];
            const mesh = await this.modelLoader(item.url);
            if(mesh.length === 1) results[item.name] = mesh[0];
            else results[item.name] = mesh;
        }
        return results;
    }

    static modelLoader(url: string): Promise<Mesh[]> {
      return new Promise((resolve, reject) => {
        loader.load(url, data => resolve(<THREE.Mesh[]>data.scene.children), undefined, reject);
      });
    }
}