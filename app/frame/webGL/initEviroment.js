import {
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Color3,
  Vector2,
  Mesh,
} from "@babylonjs/core";
import { WaterMaterial } from "@babylonjs/materials";
import "@babylonjs/procedural-textures";
import "@babylonjs/materials";
import "@babylonjs/loaders";
import { SkyMaterial } from "@babylonjs/materials";

const baseUrl = "https://raw.githubusercontent.com/bagheriarash/Files/main/";
export const initEnviromet = (scene, parent) => {
  //light
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  //  let light3 = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  //light.range = 1000;
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light2 = new HemisphericLight("light", new Vector3(0, -1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light2.intensity = 1;
  // End light code

  // ground

  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 500, height: 500 },
    scene
  );
  // ground.checkCollisions = true;

  let groundMat = new StandardMaterial("ground", scene);
  groundMat.diffuseTexture = new Texture(
    "https://images.pexels.com/photos/1587548/pexels-photo-1587548.jpeg?cs=srgb&dl=pexels-colys-hat-1587548.jpg&fm=jpg",
    scene
  );
  groundMat.diffuseTexture.uScale = 500;
  groundMat.diffuseTexture.vScale = 500;
  groundMat.specularColor = new Color3(0, 0, 0);
  //  ground.material = groundMat;
  ground.material = groundMat;
  // scene.ignoreMeshToSelect = [];
  // scene.ignoreMeshToSelect.push(ground);
  // ground.isPickable = false;
  // ground.parent = parent;
  //ground.receiveShadows = true;

  // hedge
  let hedge1 = new MeshBuilder.CreateBox("hedge1", {
    width: 500,
    height: 10,
    depth: 0.1,
  });
  hedge1.position.y += 0.5;
  hedge1.position.z += 250;

  let hedge2 = new MeshBuilder.CreateBox("hedge1", {
    width: 500,
    height: 10,
    depth: 0.1,
  });
  hedge2.position.y += 0.5;
  hedge2.position.z -= 250;

  let hedge3 = new MeshBuilder.CreateBox("hedge1", {
    width: 500,
    height: 10,
    depth: 0.1,
  });
  hedge3.position.y += 0.5;
  hedge3.position.x += 250;
  hedge3.rotation.y += Math.PI / 2;

  let hedge4 = new MeshBuilder.CreateBox("hedge1", {
    width: 500,
    height: 10,
    depth: 0.1,
  });
  hedge4.position.y += 0.5;
  hedge4.position.x -= 250;
  hedge4.rotation.y -= Math.PI / 2;

  //hedge material
  let hedgeMat = new StandardMaterial("hedge", scene);

  hedgeMat.specularColor = new Color3(1, 1, 1);
  hedgeMat.diffuseColor = new Color3(0.1, 0.1, 0.1);

  hedgeMat.alpha = 0.1;
  hedge1.material = hedgeMat;
  hedge2.material = hedgeMat;
  hedge3.material = hedgeMat;
  hedge4.material = hedgeMat;

  // End ground code

  //   // Sky material
  // Sky material
  var skyboxMaterial = new SkyMaterial("skyMaterial", scene);
  skyboxMaterial.backFaceCulling = false;
  //skyboxMaterial._cachedDefines.FOG = true;

  // Sky mesh (box)
  var skybox = Mesh.CreateBox("skyBox", 1000.0, scene);
  skybox.material = skyboxMaterial;
  skyboxMaterial.useSunPosition = true; // Do not set sun position from azimuth and inclination
  skyboxMaterial.sunPosition = new Vector3(400, 100, 0);
  skyboxMaterial.inclination = 0.5;

  // Ground
  var groundMaterial2 = new StandardMaterial("groundMaterial2", scene);
  groundMaterial2.diffuseTexture = new Texture(
    "https://raw.githubusercontent.com/bagheriarash/Files/main/sand.jpg",
    scene
  );
  groundMaterial2.diffuseTexture.uScale =
    groundMaterial2.diffuseTexture.vScale = 100;

  var ground2 = Mesh.CreateGround("ground||", 512, 512, 32, scene, false);
  ground2.position.y = -100;
  ground2.material = groundMaterial2;
  ground2.isPickable = false;
  ground2.parent = parent;

  // Water
  var waterMesh = Mesh.CreateGround("ground||", 1000, 1000, 512, scene, false);
  waterMesh.position.y = -100;
  var water = new WaterMaterial("water", scene, new Vector2(1000, 1000));
  water.backFaceCulling = true;
  water.bumpTexture = new Texture(
    "https://raw.githubusercontent.com/bagheriarash/Files/main/waterbump.png",
    scene
  );

  water.windForce = -5;
  water.waveHeight = 0.1;
  water.bumpHeight = 0.1;
  water.waveLength = 0.1;
  water.colorBlendFactor = 0;
  water.addToRenderList(skybox);
  water.addToRenderList(ground2);
  waterMesh.material = water;
  waterMesh.isPickable = false;
  waterMesh.parent = parent;
};
