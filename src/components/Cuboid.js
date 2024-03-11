import * as BABYLON from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

const Cuboid = ({ imageUrl, id }) => {
  const canvasRef = useRef(null);
  const mapWidth = 4.536;
  const mapHeight = 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      0,
      0,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 0, -26));
    camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0.5, 0.5, -0.5),
      scene
    );

    new BABYLON.HemisphericLight(
      "light2",
      new BABYLON.Vector3(-0.5, -0.5, 0.5),
      scene
    );

    const box = BABYLON.MeshBuilder.CreateBox("box", {
      width: mapWidth,
      height: mapHeight,
      depth: mapWidth,
      wrap: true,
    });

    box.scaling.z = mapHeight;
    box.scaling.x = mapWidth;
    box.scaling.y = mapHeight;

    const texture = new BABYLON.Texture(imageUrl);
    const material = new BABYLON.StandardMaterial("material");
    material.diffuseTexture = texture;
    material.backFaceCulling = false;
    box.material = material;

    engine.runRenderLoop(() => {
      scene.render();
    });

    return () => {
      engine.stopRenderLoop();
      scene.dispose();
    };
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} id={id} />
    </div>
  );
};

export default Cuboid;
