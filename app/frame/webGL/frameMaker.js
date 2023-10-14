import { Vector3, MeshBuilder, Mesh } from "@babylonjs/core";

export const frameMaker = (name, options, scene) => {
  var path = options.path;
  var profile = options.profile;

  var originX = Number.MAX_VALUE;

  for (var m = 0; m < profile.length; m++) {
    originX = Math.min(originX, profile[m].x);
  }

  var innerData = [];
  var outerData = [];
  var angle = 0;
  var extrusion = 0;
  var width = 0;
  var cornerProfile = [];

  var nbPoints = path.length;
  var line = Vector3.Zero();
  var nextLine = Vector3.Zero();
  path[1].subtractToRef(path[0], line);
  path[2].subtractToRef(path[1], nextLine);

  for (var p = 0; p < nbPoints; p++) {
    angle =
      Math.PI -
      Math.acos(
        Vector3.Dot(line, nextLine) / (line.length() * nextLine.length())
      );
    let direction = Vector3.Cross(line, nextLine).normalize().z;
    let lineNormal = new Vector3(line.y, -1 * line.x, 0).normalize();
    line.normalize();
    let extrusionLength = line.length();
    cornerProfile[(p + 1) % nbPoints] = [];
    //local profile
    for (m = 0; m < profile.length; m++) {
      width = profile[m].x - originX;
      cornerProfile[(p + 1) % nbPoints].push(
        path[(p + 1) % nbPoints]
          .subtract(lineNormal.scale(width))
          .subtract(line.scale((direction * width) / Math.tan(angle / 2)))
      );
    }

    line = nextLine.clone();
    path[(p + 3) % nbPoints].subtractToRef(path[(p + 2) % nbPoints], nextLine);
  }

  var frame = [];
  var extrusionPaths = [];

  for (var p = 0; p < nbPoints; p++) {
    extrusionPaths = [];
    for (var m = 0; m < profile.length; m++) {
      extrusionPaths[m] = [];
      extrusionPaths[m].push(
        new Vector3(cornerProfile[p][m].x, cornerProfile[p][m].y, profile[m].y)
      );
      extrusionPaths[m].push(
        new Vector3(
          cornerProfile[(p + 1) % nbPoints][m].x,
          cornerProfile[(p + 1) % nbPoints][m].y,
          profile[m].y
        )
      );
    }

    frame[p] = MeshBuilder.CreateRibbon(
      "frameLeft",
      {
        pathArray: extrusionPaths,
        sideOrientation: Mesh.DOUBLESIDE,
        updatable: true,
        closeArray: true,
      },
      scene
    );
  }

  return Mesh.MergeMeshes(frame, true).convertToFlatShadedMesh();
};
