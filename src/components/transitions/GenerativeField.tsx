import { Line, Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type GenerativeFieldProps = {
  scrollProgress: React.MutableRefObject<number>;
  scrollVelocity: React.MutableRefObject<number>;
  reducedMotion?: boolean;
};

function createField(count: number) {
  const points = new Float32Array(count * 3);
  const lines: [number, number, number][][] = [];

  for (let index = 0; index < count; index += 1) {
    const column = index % 20;
    const row = Math.floor(index / 20);
    const angle = (index / count) * Math.PI * 8;
    const radius = 0.7 + (row / 16) * 1.9;

    points[index * 3] = Math.cos(angle) * radius + (column - 9.5) * 0.08;
    points[index * 3 + 1] = (row - 8) * 0.15;
    points[index * 3 + 2] = Math.sin(angle) * radius;
  }

  for (let index = 0; index < count - 20; index += 20) {
    lines.push([
      [points[index * 3], points[index * 3 + 1], points[index * 3 + 2]],
      [points[(index + 20) * 3], points[(index + 20) * 3 + 1], points[(index + 20) * 3 + 2]],
    ]);
  }

  return { points, lines };
}

export default function GenerativeField({ scrollProgress, scrollVelocity, reducedMotion = false }: GenerativeFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const field = useMemo(() => createField(340), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const intensity = reducedMotion ? 0.08 : 1;
    const velocity = THREE.MathUtils.clamp(scrollVelocity.current * 0.001, -0.08, 0.08);
    const progress = scrollProgress.current;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, state.pointer.y * 0.12 + progress * 0.3, 0.025 * intensity);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.18 - progress * 0.45, 0.025 * intensity);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, velocity, 0.06 * intensity);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, progress * 0.4, 0.025 * intensity);
  });

  return (
    <group ref={groupRef} scale={0.8}>
      <Points positions={field.points} stride={3}>
        <PointMaterial transparent color="#c8c1ff" size={0.025} sizeAttenuation depthWrite={false} opacity={0.65} />
      </Points>
      {field.lines.slice(0, 16).map((points, index) => (
        <Line key={index} points={points} color="#8d7cff" transparent opacity={0.18} lineWidth={0.5} />
      ))}
    </group>
  );
}
