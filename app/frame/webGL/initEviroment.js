import {
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Color3,
  Vector2,
  Mesh,
  VertexData,
  VertexBuffer,
} from "@babylonjs/core";
import { WaterMaterial } from "@babylonjs/materials";
import { WoodProceduralTexture } from "@babylonjs/procedural-textures/";
import "@babylonjs/materials";
import "@babylonjs/loaders";
import { SkyMaterial } from "@babylonjs/materials";

const baseUrl = "https://raw.githubusercontent.com/bagheriarash/Files/main/";
export const initEnviromet = (scene, parent, data) => {
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
    { width: 250, height: 250 },
    scene
  );
  // ground.checkCollisions = true;

  let groundMat = new StandardMaterial("ground", scene);
  groundMat.diffuseTexture = new Texture(
    "https://images.pexels.com/photos/1587548/pexels-photo-1587548.jpeg?cs=srgb&dl=pexels-colys-hat-1587548.jpg&fm=jpg",
    scene
  );
  groundMat.diffuseTexture.uScale = 50;
  groundMat.diffuseTexture.vScale = 50;
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
    width: 250,
    height: 3,
    depth: 0.1,
  });
  hedge1.position.y += 1.5;
  hedge1.position.z += 125;
  hedge1.checkCollisions = true;

  let hedge2 = new MeshBuilder.CreateBox("hedge1", {
    width: 250,
    height: 3,
    depth: 0.1,
  });
  hedge2.position.y += 1.5;
  hedge2.position.z -= 125;
  hedge2.checkCollisions = true;

  let hedge3 = new MeshBuilder.CreateBox("hedge1", {
    width: 250,
    height: 3,
    depth: 0.1,
  });
  hedge3.position.y += 1.5;
  hedge3.position.x += 125;
  hedge3.rotation.y += Math.PI / 2;
  hedge3.checkCollisions = true;

  let hedge4 = new MeshBuilder.CreateBox("hedge1", {
    width: 250,
    height: 3,
    depth: 0.1,
  });
  hedge4.position.y += 1.5;
  hedge4.position.x -= 125;
  hedge4.rotation.y -= Math.PI / 2;
  hedge4.checkCollisions = true;

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
  //rock ground
  let ambit = new MeshBuilder.CreateBox(
    "ambit",
    { width: 96, height: 100, depth: 0.1 },
    scene
  );
  ambit.rotation.x = Math.PI / 2;
  ambit.position.z = -50;

  let ambitMat = new StandardMaterial("ground", scene);
  ambitMat.diffuseTexture = new Texture(
    "https://images.pexels.com/photos/1578243/pexels-photo-1578243.jpeg?cs=srgb&dl=pexels-daria-shevtsova-1578243.jpg&fm=jpg",
    scene
  );
  ambitMat.diffuseTexture.uScale = 15;
  ambitMat.diffuseTexture.vScale = 15;
  ambitMat.specularColor = new Color3(0, 0, 0);
  ambit.material = ambitMat;
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

  var ground2 = Mesh.CreateGround("ground||", 1000, 1000, 32, scene, false);
  ground2.position.y = -15;
  ground2.material = groundMaterial2;
  ground2.isPickable = false;
  ground2.parent = parent;

  // Water
  var waterMesh = Mesh.CreateGround("ground||", 1000, 1000, 512, scene, false);
  waterMesh.position.y = -9;
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

  // tree
  var leafMaterial = new StandardMaterial("leafMaterial", scene);
  leafMaterial.diffuseColor = new Color3(0.5, 1, 0.5);

  var woodMaterial = new StandardMaterial(name, scene);
  var woodTexture = new WoodProceduralTexture(name + "text", 512, scene);
  woodTexture.ampScale = 50;
  woodMaterial.diffuseTexture = woodTexture;

  var tree = QuickTreeGenerator(15, 10, 5, woodMaterial, leafMaterial, scene);
  tree.position.x = -30;
  tree.position.z = -20;
  tree.scaling = new Vector3(0.3, 0.3, 0.3);
  tree.checkCollisions = true;

  const tree2 = tree.clone("tree2");
  tree2.position.z = -10;

  const tree3 = tree.clone("tree3");
  tree3.position.z = -30;

  const tree4 = tree.clone("tree4");
  tree4.position.z = -40;

  const tree5 = tree.clone("tree5");
  tree5.position.z = -50;

  const tree6 = tree.clone("tree6");
  tree6.position.z = -60;
};
export const QuickTreeGenerator = function (
  sizeBranch,
  sizeTrunk,
  radius,
  trunkMaterial,
  leafMaterial,
  scene
) {
  var tree = new Mesh("tree", scene);
  tree.checkCollisions = true;

  tree.isVisible = false;

  var leaves = new Mesh("leaves", scene);

  //var vertexData = VertexData.CreateSphere(2,sizeBranch); //this line for BABYLONJS2.2 or earlier
  var vertexData = VertexData.CreateSphere({
    segments: 2,
    diameter: sizeBranch,
  }); //this line for BABYLONJS2.3 or later

  vertexData.applyToMesh(leaves, false);

  var positions = leaves.getVerticesData(VertexBuffer.PositionKind);
  var indices = leaves.getIndices();
  var numberOfPoints = positions.length / 3;

  var map = [];

  // The higher point in the sphere
  var v3 = Vector3;
  var max = [];

  for (var i = 0; i < numberOfPoints; i++) {
    var p = new v3(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    );

    if (p.y >= sizeBranch / 2) {
      max.push(p);
    }

    var found = false;
    for (var index = 0; index < map.length && !found; index++) {
      var array = map[index];
      var p0 = array[0];
      if (p0.equals(p) || p0.subtract(p).lengthSquared() < 0.01) {
        array.push(i * 3);
        found = true;
      }
    }
    if (!found) {
      var array = [];
      array.push(p, i * 3);
      map.push(array);
    }
  }
  var randomNumber = function (min, max) {
    if (min == max) {
      return min;
    }
    var random = Math.random();
    return random * (max - min) + min;
  };

  map.forEach(function (array) {
    var index,
      min = -sizeBranch / 10,
      max = sizeBranch / 10;
    var rx = randomNumber(min, max);
    var ry = randomNumber(min, max);
    var rz = randomNumber(min, max);

    for (index = 1; index < array.length; index++) {
      var i = array[index];
      positions[i] += rx;
      positions[i + 1] += ry;
      positions[i + 2] += rz;
    }
  });

  leaves.setVerticesData(VertexBuffer.PositionKind, positions);
  var normals = [];
  VertexData.ComputeNormals(positions, indices, normals);
  leaves.setVerticesData(VertexBuffer.NormalKind, normals);
  leaves.convertToFlatShadedMesh();

  leaves.material = leafMaterial;
  leaves.position.y = sizeTrunk + sizeBranch / 2 - 2;

  var trunk = Mesh.CreateCylinder(
    "trunk",
    sizeTrunk,
    radius - 2 < 1 ? 1 : radius - 2,
    radius,
    10,
    2,
    scene
  );

  trunk.position.y = sizeBranch / 2 + 2 - sizeTrunk / 2;

  trunk.material = trunkMaterial;
  trunk.convertToFlatShadedMesh();
  trunk.checkCollisions = true;

  leaves.parent = tree;
  trunk.parent = tree;
  return tree;
};
