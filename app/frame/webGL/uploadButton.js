import * as GUI from "@babylonjs/gui";
import {
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Color3,
} from "@babylonjs/core";
import "@babylonjs/gui";
import { frameMaker } from "./frameMaker";

var _URL = window.URL || window.webkitURL;
let img;

let fileInput = document.getElementById("fileInput");
if (!fileInput) {
  fileInput = document.createElement("INPUT");
  fileInput.setAttribute("id", "fileInput");
  fileInput.setAttribute("type", "file");
}

export const uploadBut = (scene, parent, data) => {
  let advTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

  let btn = GUI.Button.CreateSimpleButton("FileUploader", "Upload File");
  btn.top = "10px";
  btn.left = "10px";
  btn.width = "100px";
  btn.height = "40px";
  btn.verticalAlignment = 0;
  btn.horizontalAlignment = 0;
  btn.background = "green";
  btn.thickness = 0.5;
  btn.onPointerClickObservable.add(function () {
    fileInput.click();
  });
  advTexture.addControl(btn);

  fileInput.onchange = function () {
    let file = fileInput.files[0];
    if (!file) return;
    img = new Image();
    let objectUrl = _URL.createObjectURL(file);
    img.src = objectUrl;
    data.NFTs.push(img.src);
    loopImg(scene, parent, data);
  };
};

const getMeta = async (url) => {
  const img = new Image();
  img.src = url;
  await img.decode();
  console.log(33, img);
  return img;
};
export const loopImg = async (scene, parent, data) => {
  let result;

  console.log("imgUrls", data.NFTs);

  if (true) {
    // because of lack of the art spaces for now we set the data.NFTs.length =6
    for (let i = 0; i < 6; i++) {
      await getMeta(data.NFTs[i]).then((img) => {
        result = img;
      });
      await result;
      console.log("dim", result.naturalWidth, result.naturalHeight);
      let width = result.naturalWidth / 1000;
      let height = result.naturalHeight / 1000;
      let addArt = MeshBuilder.CreatePlane(
        "1",
        { width: width, height: height },
        scene
      );
      // addArt.position.x = scene.activeCamera.target.x;
      // addArt.position.y += 2;
      // addArt.position.z = scene.activeCamera.target.z;
      // addArt.rotation.y = scene.activeCamera.rotation.y;
      addArt.position.x = data.coord[i][0];
      addArt.position.y = data.coord[i][1];
      addArt.position.z = data.coord[i][2];
      addArt.rotation.y = data.rot[i];
      console.log("pos", addArt.position);
      addArt.scaling.x = width;
      addArt.scaling.y = height;
      addArt.checkCollisions = true;

      let addArtMat = new StandardMaterial("paintMat", scene);
      addArtMat.diffuseTexture = new Texture(data.NFTs[i]);
      addArtMat.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
      addArtMat.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
      addArtMat.specularColor = new Color3(1, 1, 1);
      addArtMat.specularColor = new Color3(0, 0, 0);
      addArtMat.backFaceCulling = true;
      addArtMat.alpha = 1;
      addArt.material = addArtMat;

      // OF
      var profilePoints = [
        new Vector3(-0.01, 0.01, 0),
        new Vector3(-0.01, -0.01, 0),
        new Vector3(0.01, -0.01, 0),
        new Vector3(0.01, 0.01, 0),
        new Vector3(0.01, 0.01, 0),
        new Vector3(0.01, 0.01, 0),
      ];
      var profilePoints2 = [
        new Vector3(-0.03, 0.03, 0),
        new Vector3(-0.03, -0.03, 0),
        new Vector3(0.03, -0.03, 0),
        new Vector3(0.03, 0.03, 0),
        new Vector3(0.03, 0.03, 0),
        new Vector3(0.03, 0.03, 0),
      ];
      let pathAddArtOFrame = [
        new Vector3(-(width / 2) - 0.05, -(height / 2) - 0.05, 0),
        new Vector3(width / 2 + 0.05, -(height / 2) - 0.05, 0),
        new Vector3(width / 2 + 0.05, height / 2 + 0.05, 0),
        new Vector3(-(width / 2) - 0.05, height / 2 + 0.05, 0),
      ];

      let pathPaintIFrame = [
        new Vector3(-width / 2, -height / 2, 0),
        new Vector3(width / 2, -height / 2, 0),
        new Vector3(width / 2, height / 2, 0),
        new Vector3(-width / 2, height / 2, 0),
      ];
      let outerFrame = frameMaker(
        "pof",
        { path: pathAddArtOFrame, profile: profilePoints2 },
        scene
      );
      outerFrame.parent = addArt;

      let outerFrameMat = new StandardMaterial("oframe", scene);
      outerFrameMat.specularColor = new Color3(0.1, 0.1, 0.1);
      outerFrameMat.diffuseColor = new Color3(0.1, 0.1, 0.1);
      outerFrameMat.backFaceCulling = true;

      outerFrame.material = outerFrameMat;

      let innerFrame = frameMaker(
        "pof",
        { path: pathPaintIFrame, profile: profilePoints },
        scene
      );
      innerFrame.parent = addArt;

      let innerFrameMat = new StandardMaterial("oframe", scene);
      innerFrameMat.specularColor = new Color3(1, 1, 1);
      innerFrameMat.diffuseColor = new Color3(1, 1, 1);
      innerFrameMat.backFaceCulling = true;

      innerFrame.material = innerFrameMat;

      // paintComponentArr.push(addArt, innerFrame, outerFrame);
      // console.log("paintComponentArr", paintComponentArr);
      // let paintMerge = Mesh.MergeMeshes(
      //   paintComponentArr,
      //   true,
      //   true,
      //   undefined,
      //   false,
      //   true
      // );
      // for (let i = 0; i < paintComponentArr.length; i++) {
      //   paintComponentArr[i].dispose();
      // }
      // console.log("paint", paintMerge);
    }
  }
};
