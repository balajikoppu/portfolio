import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

type ParticleFieldProps = {
  count?: number;
};

export default function ParticleField({
  count = 900,
}: ParticleFieldProps) {
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.3 + Math.random() * 3.2;

      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.cos(phi);
      values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return values;
  }, [count]);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#aaa5ff"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.88}
      />
    </Points>
  );
}