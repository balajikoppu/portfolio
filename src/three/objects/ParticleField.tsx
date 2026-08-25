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

    for (let i = 0; i < values.length; i += 3) {
      values[i] = (Math.random() - 0.5) * 10;
      values[i + 1] = (Math.random() - 0.5) * 10;
      values[i + 2] = (Math.random() - 0.5) * 10;
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
      />
    </Points>
  );
}