import * as GUI from "@babylonjs/gui";
import React from "react";
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Color3,
  Animation,
  PointLight,
  Mesh,
  DeviceSourceManager,
  DeviceType,
} from "@babylonjs/core";
import "@babylonjs/gui";
import { frameMaker } from "./frameMaker";

// var _URL = window.URL || window.webkitURL;
// let img;
// let mySrc;
// let image = {};
// let paintComponentArr = [];
// let paintArr = {
//   rot: [Math.PI / 2, Math.PI / 2, -Math.PI / 2, -Math.PI / 2, 0, 0],
//   coord: [
//     [47 / 4, 10 / 4, 20 / 4],
//     [47 / 4, 10 / 4, 80 / 4],
//     [-47 / 4, 10 / 4, 20 / 4],
//     [-47 / 4, 10 / 4, 80 / 4],
//     [-20 / 4, 10 / 4, 99 / 4],
//     [20 / 4, 10 / 4, 99 / 4],
//   ],
// };
// let artArr = [];
// let artDimension = {
//   width: [],
//   height: [],
// };

// let fileInput = document.getElementById("fileInput");
// if (!fileInput) {
//   fileInput = document.createElement("INPUT");
//   fileInput.setAttribute("id", "fileInput");
//   fileInput.setAttribute("type", "file");
// }

// export const uploadBut = (scene, parent) => {
//   let advTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

//   let btn = GUI.Button.CreateSimpleButton("FileUploader", "Upload File");
//   btn.top = "10px";
//   btn.left = "10px";
//   btn.width = "100px";
//   btn.height = "40px";
//   btn.verticalAlignment = 0;
//   btn.horizontalAlignment = 0;
//   btn.background = "green";
//   btn.thickness = 0.5;
//   btn.onPointerClickObservable.add(function () {
//     fileInput.click();
//   });
//   advTexture.addControl(btn);

//   fileInput.onchange = function () {
//     let file = fileInput.files[0];
//     if (!file) return;
//     img = new Image();
//     let objectUrl = _URL.createObjectURL(file);
//     img.onload = async function () {
//       await console.log(1, img.width + " " + img.height);
//       await img.width;
//       await img.height;
//       image.width = img.width;
//       image.height = img.height;
//       await _URL.revokeObjectURL(objectUrl);
//       artDimension.width.push(image.width);
//       artDimension.height.push(image.height);
//     };
//     img.src = objectUrl;

//     console.log(2, image);
//     console.log(3, img.width + " " + img.height);
//     artArr.push(img.src);

//     addImg(scene);
//   };
// };

// export const addImg = (scene) => {
//   console.log("Arrrs", artArr, artDimension);
//   if (true) {
//     for (let i = 0; i < artArr.length; i++) {
//       let width = artDimension.width[i] / 1000;
//       let height = artDimension.height[i] / 1000;
//       let addArt = MeshBuilder.CreatePlane(
//         "1",
//         { width: width, height: height },
//         scene
//       );
//       // addArt.position.x = scene.activeCamera.target.x;
//       // addArt.position.y += 2;
//       // addArt.position.z = scene.activeCamera.target.z;
//       // addArt.rotation.y = scene.activeCamera.rotation.y;
//       addArt.position.x = paintArr.coord[i][0];
//       addArt.position.y = paintArr.coord[i][1];
//       addArt.position.z = paintArr.coord[i][2];
//       addArt.rotation.y = paintArr.rot[i];
//       console.log("pos", addArt.position);
//       console.log(22, image["width"]);
//       addArt.scaling.x = width;
//       addArt.scaling.y = height;
//       addArt.checkCollisions = true;

//       console.log("camTarget", image);

//       let addArtMat = new StandardMaterial("paintMat", scene);
//       addArtMat.diffuseTexture = new Texture(artArr[i]);
//       addArtMat.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
//       addArtMat.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
//       addArtMat.specularColor = new Color3(1, 1, 1);
//       addArtMat.specularColor = new Color3(0, 0, 0);
//       addArtMat.backFaceCulling = true;
//       addArtMat.alpha = 1;
//       addArt.material = addArtMat;

//       // OF
//       var profilePoints = [
//         new Vector3(-0.01, 0.01, 0),
//         new Vector3(-0.01, -0.01, 0),
//         new Vector3(0.01, -0.01, 0),
//         new Vector3(0.01, 0.01, 0),
//         new Vector3(0.01, 0.01, 0),
//         new Vector3(0.01, 0.01, 0),
//       ];
//       var profilePoints2 = [
//         new Vector3(-0.03, 0.03, 0),
//         new Vector3(-0.03, -0.03, 0),
//         new Vector3(0.03, -0.03, 0),
//         new Vector3(0.03, 0.03, 0),
//         new Vector3(0.03, 0.03, 0),
//         new Vector3(0.03, 0.03, 0),
//       ];
//       let pathAddArtOFrame = [
//         new Vector3(-(width / 2) - 0.05, -(height / 2) - 0.05, 0),
//         new Vector3(width / 2 + 0.05, -(height / 2) - 0.05, 0),
//         new Vector3(width / 2 + 0.05, height / 2 + 0.05, 0),
//         new Vector3(-(width / 2) - 0.05, height / 2 + 0.05, 0),
//       ];

//       let pathPaintIFrame = [
//         new Vector3(-width / 2, -height / 2, 0),
//         new Vector3(width / 2, -height / 2, 0),
//         new Vector3(width / 2, height / 2, 0),
//         new Vector3(-width / 2, height / 2, 0),
//       ];
//       let outerFrame = frameMaker(
//         "pof",
//         { path: pathAddArtOFrame, profile: profilePoints2 },
//         scene
//       );
//       outerFrame.parent = addArt;

//       let outerFrameMat = new StandardMaterial("oframe", scene);
//       outerFrameMat.specularColor = new Color3(0.1, 0.1, 0.1);
//       outerFrameMat.diffuseColor = new Color3(0.1, 0.1, 0.1);
//       outerFrameMat.backFaceCulling = true;

//       outerFrame.material = outerFrameMat;

//       let innerFrame = frameMaker(
//         "pof",
//         { path: pathPaintIFrame, profile: profilePoints },
//         scene
//       );
//       innerFrame.parent = addArt;

//       let innerFrameMat = new StandardMaterial("oframe", scene);
//       innerFrameMat.specularColor = new Color3(1, 1, 1);
//       innerFrameMat.diffuseColor = new Color3(1, 1, 1);
//       innerFrameMat.backFaceCulling = true;

//       innerFrame.material = innerFrameMat;

//       // paintComponentArr.push(addArt, innerFrame, outerFrame);
//       // console.log("paintComponentArr", paintComponentArr);
//       // let paintMerge = Mesh.MergeMeshes(
//       //   paintComponentArr,
//       //   true,
//       //   true,
//       //   undefined,
//       //   false,
//       //   true
//       // );
//       // for (let i = 0; i < paintComponentArr.length; i++) {
//       //   paintComponentArr[i].dispose();
//       // }
//       // console.log("paint", paintMerge);
//     }
//   }
// };
