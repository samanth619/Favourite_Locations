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
      Math.PI / 2,
      Math.PI / 4,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 0, -25));
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 1, 0), scene);

    const box = BABYLON.MeshBuilder.CreateBox(
      "box",
      { width: mapWidth, height: mapHeight, depth: 3 },
      scene
    );

    box.scaling.z = mapHeight;
    box.scaling.x = mapWidth;
    box.scaling.y = mapHeight;

    const texture = new BABYLON.Texture(imageUrl, scene);
    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseTexture = texture;

    // Set material properties
    material.ambientColor = new BABYLON.Color3(1, 1, 1); // Adjust as needed
    material.specularColor = new BABYLON.Color3(0, 0, 0); // Adjust as needed

    material.backFaceCulling = false;
    box.material = material;

    scene.createDefaultEnvironment({
      createGround: false,
      createSkybox: false,
    });

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
