import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { CarModel } from './CarModel';

export type CameraPreset = 'front-3-4' | 'side' | 'rear' | 'top' | 'wheel';

interface CarCanvasProps {
  color: string;
  headlightsOn: boolean;
  cameraPreset: CameraPreset;
  isRotating: boolean;
  activeHotspot: number | null;
  onSelectHotspot: (id: number | null) => void;
}

const PRESET_CONFIGS: Record<CameraPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  'front-3-4': { pos: [-4.5, 1.8, 4.2], target: [0, 0.4, 0] },
  'side': { pos: [-5.6, 1.1, 0.1], target: [0, 0.4, 0] },
  'rear': { pos: [-3.6, 1.5, -4.2], target: [0, 0.4, -0.4] },
  'top': { pos: [0.01, 6.5, 0.01], target: [0, 0.2, 0] },
  'wheel': { pos: [-2.2, 0.6, 2.2], target: [-0.96, 0.34, 1.45] },
};

// Camera animator component that smoothly lerps to target preset
const CameraController: React.FC<{ preset: CameraPreset; isUserInteracting: boolean }> = ({ preset, isUserInteracting }) => {
  const { camera } = useThree();
  const controlsRef = useThree((state) => state.controls) as any;

  useFrame((_, delta) => {
    if (isUserInteracting) return;
    const targetConfig = PRESET_CONFIGS[preset];
    if (!targetConfig) return;

    // Smooth exponential damping
    const dampFactor = Math.min(delta * 3.5, 1);
    camera.position.lerp(new THREE.Vector3(...targetConfig.pos), dampFactor);

    if (controlsRef && controlsRef.target) {
      controlsRef.target.lerp(new THREE.Vector3(...targetConfig.target), dampFactor);
      controlsRef.update();
    }
  });

  return null;
};

// Studio Ground Platform with circular neon edge & radial reflections
const StudioFloor: React.FC = () => {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Dark showroom circle platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial
          color="#0b0c10"
          metalness={0.9}
          roughness={0.22}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>

      {/* Subtle orange accent perimeter ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[8.85, 8.92, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
      </mesh>

      {/* Inner subtle alignment rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[4.2, 4.22, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
};

export const CarCanvas: React.FC<CarCanvasProps> = ({
  color,
  headlightsOn,
  cameraPreset,
  isRotating,
  activeHotspot,
  onSelectHotspot,
}) => {
  const isInteractingRef = useRef(false);

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]} // Adaptive pixel ratio for retina and high performance
        camera={{ position: [-4.5, 1.8, 4.2], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
      >
        <Suspense fallback={null}>
          <CameraController preset={cameraPreset} isUserInteracting={isInteractingRef.current} />

          {/* ========================================================
              STUDIO LIGHTING RIG
              ======================================================== */}
          {/* Ambient studio base */}
          <ambientLight intensity={0.4} />

          {/* Key Light (Warm, high-angle directional with crisp shadows) */}
          <directionalLight
            position={[5, 9, 6]}
            intensity={2.2}
            color="#fff7ed"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={25}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
            shadow-bias={-0.0005}
          />

          {/* Fill Light (Cool bluish fill from the opposite flank) */}
          <directionalLight
            position={[-6, 4, -4]}
            intensity={1.0}
            color="#e0f2fe"
          />

          {/* Rim / Silhouette Light (Highlights sharp roof curves and shoulders) */}
          <directionalLight
            position={[0, 5, -8]}
            intensity={1.8}
            color="#ffffff"
          />

          {/* Underbody Soft Orange Glow */}
          <pointLight
            position={[0, 0.15, 0]}
            color="#ea580c"
            intensity={0.8}
            distance={5}
          />

          {/* Studio Floor & Grounding Contact Shadow */}
          <StudioFloor />

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.75}
            scale={10}
            blur={1.8}
            far={3.5}
            resolution={512}
            color="#000000"
          />

          {/* The Hero Car Model */}
          <Float
            speed={isRotating ? 1.2 : 0}
            rotationIntensity={0.03}
            floatIntensity={0.04}
          >
            <CarModel
              color={color}
              headlightsOn={headlightsOn}
              activeHotspot={activeHotspot}
              onSelectHotspot={onSelectHotspot}
              isRotating={isRotating}
            />
          </Float>

          {/* Orbit Controls with Smooth Damping & Constraints */}
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.05}
            autoRotate={isRotating}
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 2 - 0.04} // Prevent camera from going beneath floor
            minDistance={2.4}
            maxDistance={12}
            onStart={() => {
              isInteractingRef.current = true;
            }}
            onEnd={() => {
              // Delay resetting interacting flag slightly so smooth transition doesn't immediately snap
              setTimeout(() => {
                isInteractingRef.current = false;
              }, 400);
            }}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
