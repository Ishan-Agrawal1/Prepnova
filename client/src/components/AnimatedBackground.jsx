import { Canvas } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';

export default function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#050810']} />
        <ambientLight intensity={0.5} />
        
        {/* Abstract floating particles (Cyan) */}
        <Float speed={1} rotationIntensity={1} floatIntensity={2}>
          <Sparkles count={150} scale={12} size={3} speed={0.4} opacity={0.4} color="#00f5ff" />
        </Float>

        {/* Abstract floating particles (Purple) */}
        <Float speed={1.5} rotationIntensity={2} floatIntensity={3}>
          <Sparkles count={100} scale={15} size={4} speed={0.2} opacity={0.3} color="#8b5cf6" />
        </Float>
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
