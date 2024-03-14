import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";

const Cuboid = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const boxRef = useRef(null);
  const engineRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect((imageUrl) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvasRef.current = canvas;

    const engine = new BABYLON.Engine(canvas, true);
    engineRef.current = engine;

    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;

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
      width: 4.536,
      height: 4,
      depth: 4.536,
      wrap: true,
    });
    boxRef.current = box;

    box.scaling.z = 4;
    box.scaling.x = 4.536;
    box.scaling.y = 4;

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
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    const changeTexture = (newImageUrl) => {
      const texture = new BABYLON.Texture(newImageUrl);
      const material = new BABYLON.StandardMaterial("material");
      material.diffuseTexture = texture;
      material.backFaceCulling = false;
      boxRef.current.material = material;
    };
    changeTexture(imageUrl);
  }, [imageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Cuboid;
