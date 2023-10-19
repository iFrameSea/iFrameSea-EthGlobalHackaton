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

var currentMesh;
var dragPoint;
var planeNormal;
var newParentFlag = false;

export const initEvent = (scene, canvas, parent) => {
  let pickParentInfo;

  //let pickObject = scene.pickObject;
  let pickObject = function () {
    return scene.pick(scene.pointerX, scene.pointerY, function (m) {
      //return m != ground;
      console.log("!11", m);
      return m.parent != parent;
    });
  };

  let pickParent = function (mesh) {
    return scene.pick(scene.pointerX, scene.pointerY, function (m) {
      console.log("!22", m);
      return m != mesh;
    });
  };
  let onPointerDown = function (evt) {
    if (evt.button !== 0) {
      return;
    }

    var pickInfo = pickObject();
    if (pickInfo.hit) {
      var mesh = pickInfo.pickedMesh;
      pickParentInfo = pickParent(mesh);

      if (pickParentInfo.hit) {
        currentMesh = mesh;
        dragPoint = pickParentInfo.pickedPoint;
        planeNormal = pickParentInfo.getNormal(true);

        currentMesh.showBoundingBox = true;

        setTimeout(function () {
          scene.activeCamera.detachControl(canvas);
        }, 0);
      }
    }
  };

  let onPointerUp = function () {
    if (dragPoint) {
      if (newParentFlag) {
        let ap = currentMesh.getAbsolutePosition();
        currentMesh.parent = newParentFlag;
        currentMesh.setAbsolutePosition(ap);
        newParentFlag = false;
      }
      scene.activeCamera.attachControl(canvas, true);
      currentMesh.showBoundingBox = false;
      currentMesh = null;
      dragPoint = null;
      planeNormal = null;
    }
  };

  let onPointerMove = function (evt) {
    if (!dragPoint) {
      return;
    }

    pickParentInfo = pickParent(currentMesh);
    if (!pickParentInfo.hit) {
      return;
    }

    var current = pickParentInfo.pickedPoint;
    var normal = pickParentInfo.getNormal(true);
    var parentMesh = pickParentInfo.pickedMesh;

    if (
      parentMesh == currentMesh.parent &&
      normal.x == planeNormal.x &&
      normal.y == planeNormal.y &&
      normal.z == planeNormal.z
    ) {
      var dragVector = current.subtract(dragPoint);
      currentMesh.position.addInPlace(dragVector);
    } else {
      var displacement = new Vector3(-0.5, -0.5, -0.5); //TODO: calcular esse vetor de acordo com o ponto zero do mesh
      var vector = normal.multiply(displacement);
      var boundingInfo = currentMesh.getBoundingInfo();
      var dimensions = boundingInfo.maximum.subtract(boundingInfo.minimum);
      var diff = dimensions.multiply(vector);
      var absolutePosition = current.subtract(diff);
      currentMesh.setAbsolutePosition(absolutePosition);
      newParentFlag = parentMesh;
      planeNormal = normal;
    }

    dragPoint = current;
  };

  canvas.addEventListener("pointerdown", onPointerDown, false);
  canvas.addEventListener("pointerup", onPointerUp, false);
  canvas.addEventListener("pointermove", onPointerMove, false);

  scene.onDispose = function () {
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointermove", onPointerMove);
  };
};
