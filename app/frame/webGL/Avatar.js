import {
  SceneLoader,
  ActionManager,
  ExecuteCodeAction,
  Vector3,
  BoundingInfo,
  ShadowGenerator,
  DirectionalLight,

  Mesh,
  MeshBuilder,
  getBoundingInfo,
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

var fileRoute = "https://raw.githubusercontent.com/bagheriarash/Files/main/";
export const AvatarLoader = async (scene, parent,data) => {
  let readyPalyerAvatar;
  let animationAvatar;

  var inputMap = {};
  scene.actionManager = new ActionManager(scene);
  scene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
      inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    })
  );
  scene.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
      inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    })
  );

  let animating = true;

  readyPalyerAvatar = await SceneLoader.ImportMeshAsync(
    "",
    fileRoute,
    "iFrameSeaDefaultAvatar.glb",
    scene
  );

  animationAvatar = await SceneLoader.ImportMeshAsync(
    "",
    fileRoute,
    "AnimeTest9.glb",
    scene
  );

  //readyPalyerAvatar.meshes[0].position = Vector3.Zero();

  const { min, max } =
    readyPalyerAvatar.meshes[0].getHierarchyBoundingVectors();
  const boundingInfo = new BoundingInfo(min, max);

  const centerPoint = boundingInfo.boundingBox.center.scale(-1.6);
  readyPalyerAvatar.meshes[0].position = centerPoint;
  readyPalyerAvatar.meshes[0].bakeCurrentTransformIntoVertices();

  readyPalyerAvatar.meshes[0].position.y += 1;

  // node.scaling = new Vector3(.9, 3.21, .9)

  //sphere.position = centerPoint;

  linkSkeletonMeshes(
    animationAvatar.skeletons[0],
    readyPalyerAvatar.skeletons[0]
  );

  var mainAvatar = readyPalyerAvatar.meshes[0];
  // readyPalyerAvatar.meshes[1].rotation.y = Math.PI;
  // readyPalyerAvatar.meshes[0].rotation.y = Math.PI;

  // readyPalyerAvatar.meshes[0].checkCollisions = true;
  //readyPalyerAvatar.meshes[1].checkCollisions = true;
  animationAvatar.meshes[1].visibility = 0;

  mainAvatar.position = new Vector3(0, 1.4, -10);
  mainAvatar.checkCollisions = true;

  var mainAvatarSpeed = 0.1;
  var mainAvatarSpeedBackwards = 0.11;
  var mainAvatarRotationSpeed = 0.1;
  animationAvatar.meshes[0].parent = mainAvatar;
  mainAvatar.scaling = new Vector3(0.95, 0.95, 0.95);
  console.log("C", scene.activeCameras);
  scene.activeCameras[0].target = mainAvatar;
  // scene.activeCameras[0].setTarget(mainAvatar);
  console.log("targeet", scene.activeCameras[0].target);

  //scene.activeCameras[0].target.x = mainAvatar.position.x;
  //scene.activeCameras[0].target.z = mainAvatar.position.z;
  //scene.activeCameras[0].target.y = 2;

  // mainAvatar.applyGravity = true;

  // var light = new DirectionalLight(
  //   "dir06",
  //   new Vector3(-1, -2, -1).normalize(),
  //   scene
  // );
  // light.position = new Vector3(2, 4, 2);

  // var generator = new ShadowGenerator(256, light);
  // generator.usePoissonSampling = true;
  // generator.bias = 0.000001;
  // generator.addShadowCaster(mainAvatar, true);

  //lable name
  let nameLable = new MeshBuilder.CreatePlane(
    "nameIcon",
    { width: 0.45, height: 0.45, sideOrientation: Mesh.DOUBLESIDE },
    scene
  );
  nameLable.parent = mainAvatar;
  nameLable.position.y += 0.65;
  // nameLable.position.z = -0.003;
  // nameLable.isPickable = true;

  let nameText = GUI.AdvancedDynamicTexture.CreateForMesh(nameLable, 256, 256);
  let textName = "arash";

  var nameLableBut = GUI.Button.CreateSimpleButton("Open_Btn", textName);

  nameLableBut.width = 1;
  nameLableBut.height = 0.22;
  nameLableBut.fontSize = 40;
  nameLableBut.resizeToFit = true;
  nameLableBut.textWrapping = true;

  nameLableBut.color = "#FFFFFF";
  nameLableBut.cornerRadius = 80;
  nameLableBut.background = "#000000";
  nameLableBut.alpha = 1;
  // nameLableBut.thickness = 4
  nameLableBut.hoverCursor = "pointer";
  // nameLableBut.fontStyle = 'bold'
  nameLableBut.fontFamily = "Arial";

  nameText.addControl(nameLableBut);

  const walkAnim = scene.getAnimationGroupByName("walking");
  const idleAnim = scene.getAnimationGroupByName("idle");
  const sayHi = scene.getAnimationGroupByName("sayHi");

  const walkBackAnim = scene.getAnimationGroupByName("walkingBackward");

  //Rendering loop (executed for everyframe)
  scene.onBeforeRenderObservable.add(() => {
    var keydown = false;
    //Manage the movements of the character (e.g. position, direction)
    if (inputMap["w"]) {
      mainAvatar.moveWithCollisions(
        mainAvatar.forward.scaleInPlace(mainAvatarSpeed)
      );
      keydown = true;
    }
    if (inputMap["s"]) {
      mainAvatar.moveWithCollisions(
        mainAvatar.forward.scaleInPlace(-mainAvatarSpeedBackwards)
      );
      keydown = true;
    }
    if (inputMap["a"]) {
      mainAvatar.rotate(Vector3.Up(), -mainAvatarRotationSpeed);
      keydown = true;
    }
    if (inputMap["d"]) {
      mainAvatar.rotate(Vector3.Up(), mainAvatarRotationSpeed);
      keydown = true;
    }
    if (inputMap["q"]) {
      keydown = true;
    }

    //Manage animations to be played
    if (keydown) {
      if (!animating) {
        animating = true;
        if (inputMap["s"]) {
          //Walk backwards
          walkBackAnim.start(
            true,
            1.0,
            walkBackAnim.from,
            walkBackAnim.to,
            false
          );
        } else if (inputMap["q"]) {
          //Walk backwards
          sayHi.start(true, 1.0, sayHi.from, sayHi.to, false);
        }
        // else if
        //     (inputMap["b"]) {
        //     //Samba!
        //     sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
        // }
        else {
          //Walk
          walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
        }
      }
    } else {
      if (animating) {
        //Default animation is idle when no key is down
        idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

        //Stop all animations besides Idle Anim when no key is down
        walkAnim.stop();
        walkBackAnim.stop();
        sayHi.stop();

        //Ensure animation are played only once per rendering loop
        animating = false;
      }
    }
  });
};

let linkSkeletonMeshes = (ms, ss) => {
  if (ms != null && ms.bones != null && ms.bones.length > 0) {
    if (ss != null && ss.bones != null && ss.bones.length > 0) {
      const boneCount = ss.bones.length;
      for (let index = 0; index < boneCount; index++) {
        const sbone = ss.bones[index];
        if (sbone != null) {
          const mbone = findBoneByName(ms, sbone.name);
          if (mbone != null) {
            sbone._linkedTransformNode = mbone._linkedTransformNode;
          } else {
            console.warn("Failed to locate bone on mater rig: " + sbone.name);
          }
        }
      }
    }
  }
};

let findBoneByName = (skeleton, name) => {
  let result = null;
  if (skeleton != null && skeleton.bones != null) {
    for (let index = 0; index < skeleton.bones.length; index++) {
      const bone = skeleton.bones[index];
      const bname = bone.name
        .toLowerCase()
        .replace("mixamo:", "")
        .replace("left_", "left")
        .replace("right_", "right");
      const xname = name
        .toLowerCase()
        .replace("mixamo:", "")
        .replace("left_", "left")
        .replace("right_", "right");
      if (bname === xname) {
        result = bone;
        break;
      }
    }
  }
  return result;
};
