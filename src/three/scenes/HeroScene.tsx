import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";

import HeroCore from "../objects/HeroCore";
import ParticleField from "../objects/ParticleField";

type HeroSceneProps = {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  mobile?: boolean;
};

export default function HeroScene({
  scrollProgress,
  scrollVelocity,
  reducedMotion = false,
  mobile = false,
}: HeroSceneProps) {
  const particleCount = mobile ? 450 : 900;

  return (
    <Canvas
      dpr={mobile ? [1, 1.15] : [1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 6]}
        fov={42}
      />

      <ambientLight intensity={0.18} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={mobile ? 1.8 : 2.5}
      />

      <pointLight
        position={[-4, 1, 3]}
        intensity={mobile ? 7 : 12}
        distance={12}
        color="#6f63ff"
      />

      {!mobile && (
        <pointLight
          position={[3, -3, -2]}
          intensity={8}
          distance={10}
          color="#ffffff"
        />
      )}

      <ParticleField count={particleCount} />

      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.7}
      >
        <HeroCore
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
          reducedMotion={reducedMotion}
        />
      </Float>

      {!mobile && <Environment preset="studio" />}
    </Canvas>
  );
}