import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Confetti from "react-confetti";
import HelloGif from "./hello-wave.gif";
import "./App.css";

const Model = () => {
  const { scene } = useGLTF(
    "https://bxidevelopment1.s3.ap-south-1.amazonaws.com/assets/rose+3d.glb"
  );
  scene.scale.set(30, 30, 30);

  scene.traverse((object) => {
    if (object.isMesh) {
      object.material.emissiveIntensity = 0.9;
      object.material.needsUpdate = true;
    }
  });
  scene.position.set(0, -5, 0);

  return <primitive object={scene} />;
};

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="App"
      style={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          width: "400px",
          height: "220px",
          zIndex: 1000,
          borderRadius: "10px",
        }}
      >
        <img
          src={HelloGif}
          alt="Hello, Wave!"
          className="hello-wave"
          style={{
            width: "130px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "300px",
            margin: "auto",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins",
              fontSize: "30px",
              background: "-webkit-linear-gradient(#fd7ecc, #F6289B)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hello Khyati
          </h3>
          🌺
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 20] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Model />
        <OrbitControls />
      </Canvas>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={30}
        gravity={0.1}
        run={true}
      />
    </div>
  );
}

export default App;
