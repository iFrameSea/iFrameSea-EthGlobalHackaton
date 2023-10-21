import * as GUI from "@babylonjs/gui";
import {
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Color3,
  ActionManager,
  ExecuteCodeAction,
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
      addArt.isPickable = true;

      //addArt.checkCollisions = true;

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

      likeIconFunc(scene, addArt, data, width, height, i);

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

      addArt.actionManager = new ActionManager(scene);
      addArt.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
          console.log("Click the Art");
        })
      );
    }
  }
};

let likeIconFunc = (scene, parent, data, width, height, tokenID) => {
  let fileRoute = "https://raw.githubusercontent.com/bagheriarash/Files/main/";
  let likeNum = new MeshBuilder.CreatePlane(
    "likeNum",
    { width: 0.4, height: 0.4 },
    scene
  );

  likeNum.parent = parent;
  likeNum.position.x += width / 2 + 0.18;
  likeNum.position.y += height / 2 - 0.2;
  likeNum.position.z = -0.05;
  console.log("likeBut");

  let matnum = new StandardMaterial("oframe", scene);
  matnum.diffuseColor = new Color3(1, 0, 0);
  likeNum.material = matnum;

  let likeNumText = GUI.AdvancedDynamicTexture.CreateForMesh(
    likeNum,
    1024,
    1024
  );
  let rectLike = new GUI.Rectangle();
  rectLike.adaptWidthToChildren = true;
  rectLike.width = 0.3;
  rectLike.height = 0.2;
  rectLike.cornerRadius = 20;
  rectLike.color = "black";
  rectLike.thickness = 2;
  rectLike.background = "black";
  rectLike.alpha = 0.8;
  // if (dataRow.like?.count > 0) {
  //   rectLike.alpha = 0.8
  // }
  likeNumText.addControl(rectLike);

  let textLike = new GUI.TextBlock();
  // if (dataRow.like?.count > 0) {
  //   textLike.text = `${dataRow.like.count}`
  // }
  textLike.color = "red";
  textLike.width = 0.6;
  textLike.fontSize = 170;
  textLike.fontStyle = "bold";

  rectLike.addControl(textLike);

  var likeIcon = MeshBuilder.CreatePlane("LikeIcon", { size: 0.13 }, scene);
  likeIcon.id = parent;

  likeIcon.parent = parent;
  likeIcon.position.x += width / 2 + 0.185;
  likeIcon.position.y += height / 2 - 0.07;
  likeIcon.position.z -= 0.06;

  // likeIcon.iconType = "like";

  likeIcon.isPickable = true;
  let mat = new StandardMaterial("disc-mat", scene);
  let tex = new Texture(fileRoute + "heartEmpty.png", scene);
  mat.opacityTexture = tex;
  mat.diffuseColor = new Color3(0, 0, 0);
  mat.emissiveColor = new Color3(0, 0, 0);
  likeIcon.material = mat;

  likeIcon.actionManager = new ActionManager(scene);
  likeIcon.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickUpTrigger, function () {
      console.log("Like the Art");
      //eventBus.emit("likeButton", tokenID);
    })
  );
};
