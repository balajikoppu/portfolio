import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import HeroMediaPanel from "./HeroMediaPanel";

type HeroCoreProps = {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  gifSrc?: string;
};

export default function HeroCore({
  scrollProgress,
  scrollVelocity,
  reducedMotion = false,
  gifSrc,
}: HeroCoreProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;

    if (!group) return;

    const scroll = THREE.MathUtils.clamp(scrollProgress.current, 0, 1);
    const velocity = scrollVelocity.current;

    /*
     * ------------------------------------------------------------
     * POINTER
     * ------------------------------------------------------------
     * Clamp the pointer so extreme mouse positions do not create
     * excessive movement.
     */
    const pointerX = THREE.MathUtils.clamp(state.pointer.x, -1, 1);
    const pointerY = THREE.MathUtils.clamp(state.pointer.y, -1, 1);

    /*
     * ------------------------------------------------------------
     * REDUCED MOTION
     * ------------------------------------------------------------
     * Keep the object stable when reduced motion is requested.
     */
    if (reducedMotion) {
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        0,
        0.08,
      );

      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        0,
        0.08,
      );

      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        0,
        0.08,
      );

      group.position.x = THREE.MathUtils.lerp(
        group.position.x,
        0,
        0.08,
      );

      group.position.y = THREE.MathUtils.lerp(
        group.position.y,
        0,
        0.08,
      );

      group.scale.lerp(
        new THREE.Vector3(1, 1, 1),
        0.08,
      );

      return;
    }

    /*
     * ------------------------------------------------------------
     * IDLE MOTION
     * ------------------------------------------------------------
     * Very subtle breathing/orbital movement.
     *
     * This keeps the sphere from feeling like a static image
     * while avoiding obvious "floating object" animation.
     */
    const time = state.clock.elapsedTime;

    const idleRotationX = Math.sin(time * 0.35) * 0.018;
    const idleRotationY = Math.cos(time * 0.28) * 0.025;

    const idlePositionY = Math.sin(time * 0.45) * 0.018;

    /*
     * ------------------------------------------------------------
     * POINTER ROTATION
     * ------------------------------------------------------------
     * Mouse movement creates a subtle 3D depth response.
     */
    const pointerRotationX = pointerY * 0.16;
    const pointerRotationY = pointerX * 0.24;

    /*
     * ------------------------------------------------------------
     * SCROLL ROTATION
     * ------------------------------------------------------------
     * Scroll adds controlled movement to the object.
     *
     * Reduced from the original values so the Hero remains
     * visually stable and premium.
     */
    const scrollRotationX = scroll * 0.55;
    const scrollRotationY = scroll * 0.9;

    /*
     * ------------------------------------------------------------
     * TARGET ROTATION
     * ------------------------------------------------------------
     */
    const targetRotationX =
      pointerRotationX +
      scrollRotationX +
      idleRotationX;

    const targetRotationY =
      pointerRotationY +
      scrollRotationY +
      idleRotationY;

    /*
     * ------------------------------------------------------------
     * SCROLL POSITION
     * ------------------------------------------------------------
     * The sphere moves slightly as the visitor leaves the Hero.
     *
     * Keep this subtle so it doesn't collide visually with the
     * typography or appear to fly away.
     */
    const targetPositionX = scroll * 0.65;
    const targetPositionY = -scroll * 0.28;

    /*
     * ------------------------------------------------------------
     * SCROLL VELOCITY
     * ------------------------------------------------------------
     * Give fast scrolling a tiny rotational impulse.
     *
     * This makes the object feel physically responsive without
     * producing a distracting spin.
     */
    const velocityImpulse = THREE.MathUtils.clamp(
      velocity * 0.0015,
      -0.075,
      0.075,
    );

    /*
     * ------------------------------------------------------------
     * SUBTLE SCALE
     * ------------------------------------------------------------
     * The sphere becomes just slightly smaller as the user leaves
     * the Hero.
     */
    const targetScale = THREE.MathUtils.lerp(
      1,
      0.94,
      scroll,
    );

    /*
     * ------------------------------------------------------------
     * SMOOTH ROTATION
     * ------------------------------------------------------------
     */
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      targetRotationX,
      0.045,
    );

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      targetRotationY,
      0.045,
    );

    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      velocityImpulse,
      0.075,
    );

    /*
     * ------------------------------------------------------------
     * SMOOTH POSITION
     * ------------------------------------------------------------
     */
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      targetPositionX,
      0.045,
    );

    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      targetPositionY + idlePositionY,
      0.045,
    );

    /*
     * ------------------------------------------------------------
     * SMOOTH SCALE
     * ------------------------------------------------------------
     */
    const currentScale = group.scale.x;

    const nextScale = THREE.MathUtils.lerp(
      currentScale,
      targetScale,
      0.045,
    );

    group.scale.setScalar(nextScale);
  });

  return (
    <group ref={groupRef}>
      <HeroMediaPanel
        gifSrc={gifSrc}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}