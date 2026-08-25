import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  progress: React.MutableRefObject<number>;
  velocity: React.MutableRefObject<number>;
};

export default function HeroCoreController({
  progress,
  velocity,
}: Props) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const scroll = progress.current;
    const speed = velocity.current;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const targetRotationX =
      pointerY * 0.25 + scroll * 1.2;

    const targetRotationY =
      pointerX * 0.35 + scroll * 2.2;

    const targetPositionX =
      scroll * 1.8;

    const targetPositionY =
      -scroll * 0.5;

    const targetScale =
      1 - scroll * 0.18;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotationX,
      0.035,
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotationY,
      0.035,
    );

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetPositionX,
      0.035,
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      targetPositionY,
      0.035,
    );

    const nextScale = THREE.MathUtils.lerp(
      group.current.scale.x,
      targetScale,
      0.035,
    );

    group.current.scale.setScalar(nextScale);

    /*
     * Scroll velocity adds a tiny rotational impulse.
     * It is intentionally capped so fast scrolling
     * doesn't produce extreme movement.
     */
    const velocityImpulse = THREE.MathUtils.clamp(
      speed * 0.002,
      -0.08,
      0.08,
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      velocityImpulse,
      0.08,
    );
  });

  return <group ref={group} />;
}