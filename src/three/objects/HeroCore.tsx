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

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current || !shellRef.current) {
      return;
    }

    if (reducedMotion) {
      return;
    }

    const time = state.clock.elapsedTime;

    const scroll = scrollProgress.current;
    const velocity = scrollVelocity.current;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    /*
     * Pointer influence
     */
    const pointerRotationX = pointerY * 0.25;
    const pointerRotationY = pointerX * 0.35;

    /*
     * Scroll influence
     */
    const scrollRotationX = scroll * 1.1;
    const scrollRotationY = scroll * 2.0;

    const targetRotationX =
      pointerRotationX + scrollRotationX;

    const targetRotationY =
      pointerRotationY + scrollRotationY;

    const targetPositionX =
      scroll * 1.7;

    const targetPositionY =
      -scroll * 0.45;

    /*
     * Scroll velocity
     */
    const velocityImpulse = THREE.MathUtils.clamp(
      velocity * 0.002,
      -0.08,
      0.08,
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.035,
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.035,
    );

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      velocityImpulse,
      0.08,
    );

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetPositionX,
      0.035,
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetPositionY,
      0.035,
    );

    /*
     * Constant internal movement
     */
    coreRef.current.rotation.x = time * 0.12;
    coreRef.current.rotation.y = time * 0.18;

    shellRef.current.rotation.x = -time * 0.08;
    shellRef.current.rotation.z = time * 0.1;

    /*
     * Breathing effect
     */
    const pulse =
      1 + Math.sin(time * 1.4) * 0.025;

    coreRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.25, 5]} />

        <meshStandardMaterial
          color="#8d7cff"
          emissive="#4639a8"
          emissiveIntensity={1.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      <mesh ref={shellRef} scale={1.18}>
        <icosahedronGeometry args={[1.25, 3]} />

        <meshBasicMaterial
          color="#c7c1ff"
          transparent
          opacity={0.28}
          wireframe
        />
      </mesh>

      <mesh scale={1.42}>
        <sphereGeometry args={[1.25, 32, 32]} />

        <meshBasicMaterial
          color="#8d7cff"
          transparent
          opacity={0.025}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}