import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type HeroCoreProps = {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
};

export default function HeroCore({
  scrollProgress,
  scrollVelocity,
  reducedMotion = false,
}: HeroCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (
      !groupRef.current ||
      !coreRef.current ||
      !shellRef.current ||
      !haloRef.current ||
      !ringRef.current ||
      !innerRef.current
    ) {
      return;
    }

    const time = state.clock.elapsedTime;
    const scroll = scrollProgress.current;
    const velocity = scrollVelocity.current;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (reducedMotion) {
      coreRef.current.rotation.x = time * 0.08;
      coreRef.current.rotation.y = time * 0.1;
      shellRef.current.rotation.x = -time * 0.06;
      shellRef.current.rotation.z = time * 0.08;
      ringRef.current.rotation.x = time * 0.3;
      ringRef.current.rotation.y = time * 0.35;
      return;
    }

    const targetRotationX = pointerY * 0.28 + scroll * 1.2;
    const targetRotationY = pointerX * 0.38 + scroll * 2.1;
    const targetPositionX = scroll * 1.25;
    const targetPositionY = -scroll * 0.5;
    const velocityImpulse = THREE.MathUtils.clamp(
      velocity * 0.0022,
      -0.12,
      0.12,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.04,
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.04,
    );

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      velocityImpulse,
      0.08,
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPositionX,
      0.04,
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPositionY,
      0.04,
    );

    coreRef.current.rotation.x = time * 0.16;
    coreRef.current.rotation.y = time * 0.2;

    shellRef.current.rotation.x = -time * 0.12;
    shellRef.current.rotation.z = time * 0.16;

    ringRef.current.rotation.x = time * 0.45;
    ringRef.current.rotation.y = time * 0.52;
    ringRef.current.rotation.z = time * 0.28;

    haloRef.current.position.z = -0.35 + Math.sin(time * 1.4) * 0.12;

    const pulse = 1 + Math.sin(time * 1.7) * 0.025;
    coreRef.current.scale.setScalar(pulse);
    innerRef.current.scale.setScalar(1.06 + Math.sin(time * 1.3) * 0.04);
    shellRef.current.scale.setScalar(1.22 + Math.sin(time * 1.1) * 0.03);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={haloRef} position={[0, 0, -0.35]} scale={1.85}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#8d7cff"
          transparent
          opacity={0.09}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={innerRef} scale={0.82}>
        <icosahedronGeometry args={[1.3, 2]} />
        <meshPhysicalMaterial
          color="#ddd7ff"
          emissive="#8d7cff"
          emissiveIntensity={0.9}
          metalness={0.62}
          roughness={0.18}
          transmission={0.18}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0.18}
          reflectivity={0.9}
        />
      </mesh>

      <mesh ref={coreRef} scale={1.15}>
        <icosahedronGeometry args={[1.25, 4]} />
        <meshStandardMaterial
          color="#9c8cff"
          emissive="#3d3698"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      <mesh ref={shellRef} scale={1.34}>
        <icosahedronGeometry args={[1.25, 3]} />
        <meshBasicMaterial
          color="#c7c1ff"
          transparent
          opacity={0.22}
          wireframe
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={1.28}>
        <torusGeometry args={[1.5, 0.04, 12, 120]} />
        <meshBasicMaterial
          color="#aea3ff"
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh scale={1.55}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial
          color="#8d7cff"
          transparent
          opacity={0.028}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}