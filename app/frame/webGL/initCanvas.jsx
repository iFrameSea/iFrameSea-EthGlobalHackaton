import React from "react";
import {
  MeshBuilder,
  ArcRotateCamera,
  Vector3,
  TransformNode
} from "@babylonjs/core";
import { initEvent } from "./initEvent";
import { SkyMaterial } from "@babylonjs/materials/sky";
import SceneComponent from "./SceneComponent";
import { frameMaker } from "./frameMaker";
import { defaultBuilding } from "./DefaultBuilding";
import { initEnviromet,QuickTreeGenerator } from "./initEviroment";
import { buildingRoom, buildGround } from "./buildingRoom";
import { uploadBut,loopImg } from "./uploadButton";
import {AvatarLoader} from "./Avatar"
import {data} from "./data"


// uses above component in same directory
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./App.css";
const baseUrl = "https://raw.githubusercontent.com/bagheriarash/Files/main/";

// let box;
// let roomMerged;

const onSceneReady = (scene, data) => {
  const canvas = scene.getEngine().getRenderingCanvas();
  scene.canvasRef = canvas;
  window.sceneRef = scene;
  console.log("data", data)

  const camera = new ArcRotateCamera(
    "camera1",
    -Math.PI/2,
    Math.PI/2,
    5,
    new Vector3(0, 3, -10),
    scene
  );
  //const watcher = new FreeCamera("watcher", new Vector3(0, 2, 0), scene);
  scene.activeCameras.push(camera);
  //scene.activeCameras.push(watcher);
  scene.activeCamera = camera;
  console.log("camera", scene.activeCameras)
  //camera.setTarget(currTar);
  // camera.minZ = 1000;
  // camera.maxZ = 1000.01;
  camera.lowerRadiusLimit = 2;
  camera.upperRadiusLimit = 10;
	camera.lowerBetaLimit = 0.01;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
  camera.wheelDeltaPercentage = 0.01;
  camera.speed = 0.8;
  camera.checkCollisions = true;
  // camera.applyGravity = true;
  //camera.inertia = 0.5;
  /** collision avatar check size */
  // scene.gravity = new Vector3(0, -0.5, 0);
  camera.ellipsoid = new Vector3(0.21, 0.91, 0.21);
  camera.ellipsoidOffset = new Vector3(0.21, 0.66, 0.21);
  // camera.angularSensibility = 5000;
  // camera.keysUp = [38, 87];
  // camera.keysDown = [40, 83];
  // camera.keysLeft = [65];
  // camera.keysRight = [68];
  // camera.keysRotateLeft = [37];
  // camera.keysRotateRight = [39];
  // camera.keysUpward = [81];
  // camera.keysDownward = [69];
  camera.attachControl(canvas, true); // This attaches the camera to the canvas
  // scene.useRightHandedSystem = true

  var parent = new TransformNode("parent");
  parent.id = data.parent
  parent.name = data.parent

  console.log("parent", parent);

  initEnviromet(scene, parent,data);
  buildingRoom(scene, parent,data);
  buildGround(scene,parent,data)
  uploadBut(scene, parent,data);
  AvatarLoader(scene,parent,data)
  loopImg(scene,parent,data)
  //initEvent(scene, canvas, parent);
};

/**
 * Will run on every frame render.
 */
const onRender = (scene) => {
  // if (roomMerged !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  //   // const rpm = 10;
  //   // roomMerged.rotation.y +=
  //   //   (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }
};

export default () => (
  <div>
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      data = {data}
      id="my-canvas"
    />
  </div>
);
