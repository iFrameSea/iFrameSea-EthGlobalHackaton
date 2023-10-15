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
import { SkyMaterial } from "@babylonjs/materials/sky";
import { frameMaker } from "./frameMaker";
import { defaultBuilding } from "./DefaultBuilding";

export const buildingRoom = (scene, parent) => {
  //   const buildGround = (z) => {
  //     let floor = MeshBuilder.CreateBox(
  //       "door",
  //       { width: 24, height: 25, depth: 0.1 },
  //       scene
  //     );
  //     floor.rotation.x = -Math.PI / 2;
  //     floor.position.x = 0;
  //     floor.position.y = 0;
  //     floor.position.z = z + 12.5;
  //     let floorMat = new StandardMaterial("ground", scene);
  //     floorMat.diffuseTexture = new Texture(
  //       "https://images.pexels.com/photos/2117937/pexels-photo-2117937.jpeg?cs=srgb&dl=pexels-scott-webb-2117937.jpg&fm=jpg",
  //       scene
  //     );
  //     floorMat.diffuseTexture.uScale = 6;
  //     floorMat.diffuseTexture.vScale = 6;
  //     floorMat.specularColor = new Color3(0, 0, 0);
  //     floor.material = floorMat;
  //   };
  //   buildGround(0);
  // buildRoom Data
  let path = [
    new Vector3(-6, -6, 0),
    new Vector3(6, -6, 0),
    new Vector3(6, 6, 0),
    new Vector3(-6, 6, 0),
  ];
  let path2 = [
    new Vector3(-0.52, -0.52, 0),
    new Vector3(0.52, -0.52, 0),
    new Vector3(0.52, 0.52, 0),
    new Vector3(-0.52, 0.52, 0),
  ];
  let path3 = [
    new Vector3(-0.5, -0.5, 0),
    new Vector3(0.5, -0.5, 0),
    new Vector3(0.5, 0.5, 0),
    new Vector3(-0.5, 0.5, 0),
  ];
  //profile in XoY plane, the left most point(s) will form the outer edge of the frame along the given path.
  var profilePoints = [
    new Vector3(-0.1, 0.1, 0),
    new Vector3(-0.1, -0.1, 0),
    new Vector3(0.1, -0.1, 0),
    new Vector3(0.1, -0.1, 0),
    new Vector3(-0.1, -0.1, 0),
    new Vector3(-0.1, 0.1, 0),
  ];
  var profilePoints2 = [
    new Vector3(-0.03, 0.03, 0),
    new Vector3(-0.03, -0.03, 0),
    new Vector3(0.03, -0.03, 0),
    new Vector3(0.03, -0.03, 0),
    // new Vector3(-.02, -.02, 0),
    // new Vector3(-.02, .02, 0)
  ];
  let floor = [];
  let floorMat = [];
  let roomMerged;
  let roomComponentArr = [];
  let door;
  let joint;
  let separator;
  let wall = [];
  let wallMat = [];
  let wallFrame = [];
  let wallFrameMat = [];
  let pathWallFrame = [];
  let roof = [];
  let roofMat = [];
  let pathRoofFrame = [];
  let entrance = [];
  let entranceMat = [];
  let evenSeparator = [];
  let evenSeparatorMat = [];
  let oddWall = [];
  let oddWallMat = [];
  let evenWall = [];
  let evenWallMat = [];
  let roofFrame = [];
  let roofFrameMat = [];
  let x = 0;
  let y = 0;
  let z = 0;
  // build Room Function
  let defualtOrigin = (x, y, z) => {
    for (let i = 0; i < defaultBuilding.length; i++) {
      if (defaultBuilding[i].type == "entrance") {
        for (let j = 0; j < defaultBuilding[i].coord.length; j++) {
          entrance[j] = MeshBuilder.CreateBox(
            "entrance" + j,
            {
              width: defaultBuilding[i].prop[j].width,
              height: defaultBuilding[i].prop[j].height,
              depth: defaultBuilding[i].prop[j].depth,
            },
            scene
          );
          entrance[j].position.x = x + defaultBuilding[i].coord[j][0];
          entrance[j].position.y = y + defaultBuilding[i].coord[j][1];
          entrance[j].position.z = z + defaultBuilding[i].coord[j][2];
          entrance[j].rotation.x = defaultBuilding[i].prop[j].rtx;
          entrance[j].rotation.y = defaultBuilding[i].prop[j].rty;
          entrance[j].rotation.z = defaultBuilding[i].prop[j].rtz;
          entrance[j].checkCollisions = true;
          entranceMat[j] = new StandardMaterial("entranceMat" + j, scene);
          if (defaultBuilding[i].prop[j].dt == true) {
            entranceMat[j].diffuseTexture = new Texture(
              defaultBuilding[i].prop[j].tx,
              scene
            );
            entranceMat[j].diffuseTexture.uScale = 60;
            entranceMat[j].diffuseTexture.vScale = 60;
            entranceMat[j].specularColor = new Color3(0, 0, 0);
          } else if (defaultBuilding[i].prop[j].dt == false) {
            entranceMat[j].diffuseColor = defaultBuilding[i].prop[j].dc;
          }
          entranceMat[j].alpha = defaultBuilding[i].prop[j].alpha;
          entrance[j].material = entranceMat[j];
        }
      } else if (defaultBuilding[i].type == "room") {
        for (let j = 0; j < defaultBuilding[i].coord.length; j++) {
          wall[j] = MeshBuilder.CreateBox(
            "room" + j,
            {
              width: defaultBuilding[i].prop[j].width,
              height: defaultBuilding[i].prop[j].height,
              depth: defaultBuilding[i].prop[j].depth,
            },
            scene
          );
          wall[j].position.x = x + defaultBuilding[i].coord[j][0];
          wall[j].position.y = y + defaultBuilding[i].coord[j][1];
          wall[j].position.z = z + defaultBuilding[i].coord[j][2];
          wall[j].rotation.x = defaultBuilding[i].prop[j].rtx;
          wall[j].rotation.y = defaultBuilding[i].prop[j].rty;
          wall[j].rotation.z = defaultBuilding[i].prop[j].rtz;
          wall[j].checkCollisions = true;
          wallMat[j] = new StandardMaterial("wallMat" + j, scene);
          if (defaultBuilding[i].prop[j].dt == true) {
            wallMat[j].diffuseTexture = new Texture(
              defaultBuilding[i].prop[j].tx,
              scene
            );
            wallMat[j].diffuseTexture.uScale = 60;
            wallMat[j].diffuseTexture.vScale = 60;
            wallMat[j].specularColor = new Color3(0, 0, 0);
          } else if (defaultBuilding[i].prop[j].dt == false) {
            wallMat[j].diffuseColor = defaultBuilding[i].prop[j].dc;
          }
          wallMat[j].alpha = defaultBuilding[i].prop[j].alpha;
          wall[j].material = wallMat[j];
          if (defaultBuilding[i].prop[j].alpha !== 1) {
            pathWallFrame[j] = [
              new Vector3(
                -defaultBuilding[i].prop[j].width / 2,
                -defaultBuilding[i].prop[j].height / 2,
                0
              ),
              new Vector3(
                defaultBuilding[i].prop[j].width / 2,
                -defaultBuilding[i].prop[j].height / 2,
                0
              ),
              new Vector3(
                defaultBuilding[i].prop[j].width / 2,
                defaultBuilding[i].prop[j].height / 2,
                0
              ),
              new Vector3(
                -defaultBuilding[i].prop[j].width / 2,
                defaultBuilding[i].prop[j].height / 2,
                0
              ),
            ];
            wallFrame[j] = frameMaker(
              "wallfr_" + j,
              { path: pathWallFrame[j], profile: profilePoints2 },
              scene
            );
            wallFrame[j].position.x = x + defaultBuilding[i].coord[j][0];
            wallFrame[j].position.y = y + defaultBuilding[i].coord[j][1];
            wallFrame[j].position.z = z + defaultBuilding[i].coord[j][2];
            wallFrame[j].rotation.x = defaultBuilding[i].prop[j].rtx;
            wallFrame[j].rotation.y = defaultBuilding[i].prop[j].rty;
            wallFrame[j].rotation.z = defaultBuilding[i].prop[j].rtz;
            // wallFrame[j].scaling.x = defaultBuilding[i].prop[j].width
            // wallFrame[j].scaling.y = defaultBuilding[i].prop[j].height
            // wallFrame[j].scaling.z = 10
            wallFrameMat[j] = new StandardMaterial("oframe", scene);
            wallFrameMat[j].specularColor = new Color3(0, 0, 0);
            wallFrameMat[j].diffuseColor = new Color3(0, 0, 0);
            wallFrame[j].material = wallFrameMat[j];
          }
        }
      } else if (defaultBuilding[i].type == "oddWall") {
        console.log("odd");
        for (let j = 0; j < defaultBuilding[i].coord.length; j++) {
          oddWall[j] = MeshBuilder.CreateBox(
            "room",
            {
              width: defaultBuilding[i].prop[j].width,
              height: defaultBuilding[i].prop[j].height,
              depth: defaultBuilding[i].prop[j].depth,
            },
            scene
          );
          oddWall[j].position.x = x + defaultBuilding[i].coord[j][0];
          oddWall[j].position.y = y + defaultBuilding[i].coord[j][1];
          oddWall[j].position.z = z + defaultBuilding[i].coord[j][2];
          oddWall[j].rotation.x = defaultBuilding[i].prop[j].rtx;
          oddWall[j].rotation.y = defaultBuilding[i].prop[j].rty;
          oddWall[j].rotation.z = defaultBuilding[i].prop[j].rtz;
          oddWall[j].checkCollisions = true;
          oddWallMat[j] = new StandardMaterial("oddWallMat", scene);
          if (defaultBuilding[i].prop[j].dt == true) {
            oddWallMat[j].diffuseTexture = new Texture(
              defaultBuilding[i].prop[j].tx,
              scene
            );
            oddWallMat[j].diffuseTexture.uScale = 60;
            oddWallMat[j].diffuseTexture.vScale = 60;
            oddWallMat[j].specularColor = new Color3(0, 0, 0);
          } else if (defaultBuilding[i].prop[j].dt == false) {
            oddWallMat[j].diffuseColor = defaultBuilding[i].prop[j].dc;
          }
          oddWallMat[j].alpha = defaultBuilding[i].prop[j].alpha;
          oddWall[j].material = oddWallMat[j];
        }
      }
      // else if (defaultBuilding[i].type == "evenWall") {
      //     for (let j = 0; j < defaultBuilding[i].coord.length; j++) {
      //     evenWall[j] = MeshBuilder.CreateBox(
      //         "room",
      //         { width: defaultBuilding[i].prop[j].width, height: defaultBuilding[i].prop[j].height, depth: defaultBuilding[i].prop[j].depth },
      //         scene
      //     );
      //     evenWall[j].position.x = x + defaultBuilding[i].coord[j][0];
      //     evenWall[j].position.y = y + defaultBuilding[i].coord[j][1];
      //     evenWall[j].position.z = z + defaultBuilding[i].coord[j][2];
      //     evenWall[j].rotation.x = defaultBuilding[i].prop[j].rtx
      //     evenWall[j].rotation.y = defaultBuilding[i].prop[j].rty
      //     evenWall[j].rotation.z = defaultBuilding[i].prop[j].rtz
      //     evenWall[j].checkCollisions = true;
      //     evenWallMat[j] = new StandardMaterial("evenWallMat", scene);
      //     if (defaultBuilding[i].prop[j].dt == true) {
      //         evenWallMat[j].diffuseTexture = new Texture(defaultBuilding[i].prop[j].tx, scene);
      //         evenWallMat[j].diffuseTexture.uScale = 60;
      //         evenWallMat[j].diffuseTexture.vScale = 60;
      //         evenWallMat[j].specularColor = new Color3(0, 0, 0);
      //     } else if (defaultBuilding[i].prop[j].dt == false) {
      //         evenWallMat[j].diffuseColor = defaultBuilding[i].prop[j].dc
      //     }
      //     evenWallMat[j].alpha = defaultBuilding[i].prop[j].alpha
      //     evenWall[j].material = evenWallMat[j];
      //       }
      // }
      else if (defaultBuilding[i].type == "roof") {
        for (let j = 0; j < defaultBuilding[i].coord.length; j++) {
          roof[j] = MeshBuilder.CreateBox(
            "roof" + j,
            {
              width: defaultBuilding[i].prop[j].width,
              height: defaultBuilding[i].prop[j].height,
              depth: defaultBuilding[i].prop[j].depth,
            },
            scene
          );
          roof[j].position.x = x + defaultBuilding[i].coord[j][0];
          roof[j].position.y = y + defaultBuilding[i].coord[j][1];
          roof[j].position.z = z + defaultBuilding[i].coord[j][2];
          roof[j].rotation.x = defaultBuilding[i].prop[j].rtx;
          roof[j].rotation.y = defaultBuilding[i].prop[j].rty;
          roof[j].rotation.z = defaultBuilding[i].prop[j].rtz;
          roof[j].checkCollisions = true;
          roofMat[j] = new StandardMaterial("roofMat" + j, scene);
          roofMat[j].diffuseColor = defaultBuilding[i].prop[j].dc;
          roofMat[j].specularColor = new Color3(0, 0, 0);
          roofMat[j].alpha = defaultBuilding[i].prop[j].alpha;
          roof[j].material = roofMat[j];
          if (defaultBuilding[i].prop[j].alpha !== 1) {
            pathRoofFrame[j] = [
              new Vector3(
                -defaultBuilding[i].prop[j].width / 2,
                -defaultBuilding[i].prop[j].height / 2,
                0
              ),
              new Vector3(
                defaultBuilding[i].prop[j].width / 2,
                -defaultBuilding[i].prop[j].height / 2,
                0
              ),
              new Vector3(
                defaultBuilding[i].prop[j].width / 2,
                defaultBuilding[i].prop[j].height / 2,
                0
              ),
              new Vector3(
                -defaultBuilding[i].prop[j].width / 2,
                defaultBuilding[i].prop[j].height / 2,
                0
              ),
            ];
            roofFrame[j] = frameMaker(
              "line1_" + j,
              { path: pathRoofFrame[j], profile: profilePoints2 },
              scene
            );
            roofFrame[j].position.x = x + defaultBuilding[i].coord[j][0];
            roofFrame[j].position.y = y + defaultBuilding[i].coord[j][1];
            roofFrame[j].position.z = z + defaultBuilding[i].coord[j][2];
            roofFrame[j].rotation.x = defaultBuilding[i].prop[j].rtx;
            roofFrame[j].rotation.y = defaultBuilding[i].prop[j].rty;
            roofFrame[j].rotation.z = defaultBuilding[i].prop[j].rtz;
            // roofFrame[j].scaling.x = defaultBuilding[i].prop[j].width
            // roofFrame[j].scaling.y = defaultBuilding[i].prop[j].height
            // roofFrame[j].scaling.z = 10
            roofFrameMat[j] = new StandardMaterial("oframe", scene);
            roofFrameMat[j].specularColor = new Color3(0, 0, 0);
            roofFrameMat[j].diffuseColor = new Color3(0, 0, 0);
            roofFrame[j].material = roofFrameMat[j];
          }
        }
      }
    }
    roomComponentArr = [
      ...entrance,
      ...wall,
      ...oddWall,
      ...roof,
      ...wallFrame,
      ...roofFrame,
      ...floor,
    ];
    console.log("meshes", roomComponentArr);
    roomMerged = Mesh.MergeMeshes(
      roomComponentArr,
      true,
      true,
      undefined,
      false,
      true
    );
    roomMerged.parent = parent;
    roomMerged.isPickable = false;
    for (let i = 0; i < roomComponentArr; i++) {
      if (roomComponentArr[i] != undefined) {
        roomComponentArr[i].dispose();
      }
    }
    console.log("meshes", roomMerged);
    roomComponentArr = [];
  };
  defualtOrigin(0, 0, 0);
  // End Build Room Function
  /********Framemaker function starts here********/
  /********Framemaker function Ends********/
  //console.log("room", roomMerged.parent);
};

export const buildGround = (scene, parent) => {
  let floor = MeshBuilder.CreateBox(
    "door",
    { width: 24, height: 25, depth: 0.1 },
    scene
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.x = 0;
  floor.position.y = 0;
  floor.position.z = 12.5;

  let floorMat = new StandardMaterial("ground", scene);
  floorMat.diffuseTexture = new Texture(
    "https://images.pexels.com/photos/2117937/pexels-photo-2117937.jpeg?cs=srgb&dl=pexels-scott-webb-2117937.jpg&fm=jpg",
    scene
  );
  floorMat.diffuseTexture.uScale = 6;
  floorMat.diffuseTexture.vScale = 6;
  floorMat.specularColor = new Color3(0, 0, 0);
  floor.material = floorMat;
};
