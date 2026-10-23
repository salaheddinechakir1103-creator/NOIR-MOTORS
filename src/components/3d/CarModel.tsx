import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CarModelProps {
  color: string;
  headlightsOn: boolean;
  activeHotspot: number | null;
  onSelectHotspot: (index: number | null) => void;
  isRotating: boolean;
}

export const CarModel: React.FC<CarModelProps> = ({
  color,
  headlightsOn,
  activeHotspot,
  onSelectHotspot,
  isRotating,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  // Subtle breathing / idle floating and wheel rotation
  useFrame((state, delta) => {
    if (groupRef.current && isRotating) {
      // Rotate the wheels if car is rotating
      wheelsRef.current.forEach((wheel) => {
        if (wheel) wheel.rotation.x += delta * 1.5;
      });
    }
  });

  // Hotspots definitions in 3D coordinate space
  const hotspots = [
    { id: 1, position: [0, 0.95, -0.7] as [number, number, number], title: 'Moteur V8 Bi-Turbo', subtitle: '720 ch · 0-100 km/h en 2.9s' },
    { id: 2, position: [0, 0.35, 2.25] as [number, number, number], title: 'Splitter Aéro Carbone', subtitle: 'Appui aérodynamique 385 kg' },
    { id: 3, position: [-1.05, 0.45, 1.45] as [number, number, number], title: 'Freins Carbone-Céramique', subtitle: 'Disques 398mm & Étriers 6 pistons' },
    { id: 4, position: [0, 1.15, 0.2] as [number, number, number], title: 'Cockpit Alcantara & Cuir', subtitle: 'Surpiqûres Orange & Finitions Carbone' },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* ========================================================
          1. CHASSIS & AERODYNAMIC BODYWORK (Physical Clearcoat Paint)
          ======================================================== */}
      {/* Lower Main Hull / Floorpan */}
      <mesh position={[0, 0.22, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.22, 4.4]} />
        <meshStandardMaterial color="#0c0d10" metalness={0.9} roughness={0.35} />
      </mesh>

      {/* Main Sculpted Body - Lower Half */}
      <mesh position={[0, 0.42, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[1.96, 0.32, 4.2]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.16}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          reflectivity={0.9}
        />
      </mesh>

      {/* Front Nose Bonnet / Hood - Sloped Aerodynamics */}
      <mesh position={[0, 0.52, 1.45]} rotation={[-0.12, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.86, 0.2, 1.6]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.16}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
        />
      </mesh>

      {/* Bonnet Air Extractor / Vent Channel */}
      <mesh position={[0, 0.57, 1.35]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.8]} />
        <meshStandardMaterial color="#121316" metalness={0.9} roughness={0.4} />
      </mesh>

      {/* Rear Engine Deck / Engine Cover with Vents */}
      <mesh position={[0, 0.62, -1.05]} rotation={[0.08, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.88, 0.22, 1.8]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.16}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
        />
      </mesh>

      {/* Engine Louver Vents (Titanium & Dark Carbon) */}
      {[-0.5, -0.75, -1.0, -1.25].map((z, idx) => (
        <mesh key={idx} position={[0, 0.72 + idx * 0.015, z]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.9, 0.02, 0.08]} />
          <meshStandardMaterial color="#1f2024" metalness={0.95} roughness={0.2} />
        </mesh>
      ))}

      {/* Muscular Front Wheel Fenders (Flared Shoulders) */}
      <mesh position={[-0.92, 0.52, 1.35]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.28, 1.1]} />
        <meshPhysicalMaterial color={color} metalness={0.85} roughness={0.16} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.92, 0.52, 1.35]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.28, 1.1]} />
        <meshPhysicalMaterial color={color} metalness={0.85} roughness={0.16} clearcoat={1.0} />
      </mesh>

      {/* Muscular Rear Wheel Fenders (Wide Body Haunches) */}
      <mesh position={[-0.96, 0.60, -1.1]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.35, 1.3]} />
        <meshPhysicalMaterial color={color} metalness={0.85} roughness={0.16} clearcoat={1.0} />
      </mesh>
      <mesh position={[0.96, 0.60, -1.1]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.35, 1.3]} />
        <meshPhysicalMaterial color={color} metalness={0.85} roughness={0.16} clearcoat={1.0} />
      </mesh>

      {/* Side Air Scoop Intakes (Cools Mid-Engine V8) */}
      <mesh position={[-0.94, 0.44, -0.15]}>
        <boxGeometry args={[0.1, 0.26, 0.65]} />
        <meshStandardMaterial color="#08080a" metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[0.94, 0.44, -0.15]}>
        <boxGeometry args={[0.1, 0.26, 0.65]} />
        <meshStandardMaterial color="#08080a" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* ========================================================
          2. COCKPIT, CANOPY & HIGH-PERFORMANCE GLASS
          ======================================================== */}
      {/* Cabin Roof Shell */}
      <mesh position={[0, 0.96, 0.05]} castShadow>
        <boxGeometry args={[1.32, 0.28, 1.7]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.85}
          roughness={0.16}
          clearcoat={1.0}
        />
      </mesh>

      {/* Windshield - Sloped Panoramic Glass */}
      <mesh position={[0, 0.82, 0.82]} rotation={[-0.62, 0, 0]}>
        <boxGeometry args={[1.34, 0.04, 0.95]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.85}
          opacity={0.92}
          transparent
          roughness={0.05}
          ior={1.52}
          reflectivity={0.95}
        />
      </mesh>

      {/* Rear Window / Engine Observation Glass */}
      <mesh position={[0, 0.86, -0.72]} rotation={[0.45, 0, 0]}>
        <boxGeometry args={[1.15, 0.04, 0.75]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.8}
          opacity={0.9}
          transparent
          roughness={0.05}
          ior={1.5}
        />
      </mesh>

      {/* Side Windows (Left & Right) */}
      <mesh position={[-0.68, 0.83, 0.08]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.03, 0.35, 1.15]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.7}
          opacity={0.85}
          transparent
          roughness={0.08}
        />
      </mesh>
      <mesh position={[0.68, 0.83, 0.08]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.03, 0.35, 1.15]} />
        <meshPhysicalMaterial
          color="#0f172a"
          transmission={0.7}
          opacity={0.85}
          transparent
          roughness={0.08}
        />
      </mesh>

      {/* Cockpit Interior Geometry (Bucket Seats & Sport Wheel visible through glass) */}
      <group position={[0, 0.45, 0.15]}>
        {/* Driver Seat */}
        <mesh position={[-0.32, 0.25, 0.05]}>
          <boxGeometry args={[0.42, 0.48, 0.46]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[-0.32, 0.5, -0.15]}>
          <boxGeometry args={[0.38, 0.42, 0.12]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        {/* Orange Accent Piping on Driver Seat */}
        <mesh position={[-0.32, 0.52, -0.1]}>
          <boxGeometry args={[0.36, 0.03, 0.03]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        {/* Passenger Seat */}
        <mesh position={[0.32, 0.25, 0.05]}>
          <boxGeometry args={[0.42, 0.48, 0.46]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[0.32, 0.5, -0.15]}>
          <boxGeometry args={[0.38, 0.42, 0.12]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        {/* Orange Accent Piping on Passenger Seat */}
        <mesh position={[0.32, 0.52, -0.1]}>
          <boxGeometry args={[0.36, 0.03, 0.03]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        {/* Steering Wheel with Orange Top Marker */}
        <mesh position={[-0.32, 0.48, 0.42]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.13, 0.022, 16, 24]} />
          <meshStandardMaterial color="#27272a" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.32, 0.60, 0.38]}>
          <boxGeometry args={[0.03, 0.02, 0.03]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>

        {/* Dashboard & Center Console Screen */}
        <mesh position={[0, 0.4, 0.55]}>
          <boxGeometry args={[1.2, 0.25, 0.35]} />
          <meshStandardMaterial color="#090a0d" metalness={0.6} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.44, 0.62]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[0.22, 0.14]} />
          <meshBasicMaterial color="#f97316" />
        </mesh>
      </group>

      {/* ========================================================
          3. CARBON FIBRE AERODYNAMICS & EXHAUST
          ======================================================== */}
      {/* Front Carbon-Fiber Splitter */}
      <mesh position={[0, 0.12, 2.22]} castShadow receiveShadow>
        <boxGeometry args={[1.98, 0.06, 0.4]} />
        <meshStandardMaterial color="#121316" metalness={0.65} roughness={0.3} />
      </mesh>
      {/* Front Aero Winglets */}
      <mesh position={[-0.98, 0.22, 2.22]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.06, 0.18, 0.32]} />
        <meshStandardMaterial color="#121316" metalness={0.65} roughness={0.3} />
      </mesh>
      <mesh position={[0.98, 0.22, 2.22]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.06, 0.18, 0.32]} />
        <meshStandardMaterial color="#121316" metalness={0.65} roughness={0.3} />
      </mesh>

      {/* Side Carbon Skirts with Orange Pinstripe */}
      <mesh position={[-1.0, 0.14, 0.15]}>
        <boxGeometry args={[0.08, 0.08, 2.3]} />
        <meshStandardMaterial color="#14151a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-1.01, 0.14, 0.15]}>
        <boxGeometry args={[0.02, 0.02, 2.3]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>
      <mesh position={[1.0, 0.14, 0.15]}>
        <boxGeometry args={[0.08, 0.08, 2.3]} />
        <meshStandardMaterial color="#14151a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.01, 0.14, 0.15]}>
        <boxGeometry args={[0.02, 0.02, 2.3]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>

      {/* Rear Aggressive Diffuser with Vertical Venturi Fins */}
      <mesh position={[0, 0.18, -2.15]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.94, 0.18, 0.45]} />
        <meshStandardMaterial color="#0e0f13" metalness={0.75} roughness={0.3} />
      </mesh>
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.16, -2.2]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.03, 0.16, 0.35]} />
          <meshStandardMaterial color="#0e0f13" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Active Carbon Rear Wing / Spoiler on Dual Pylons */}
      <group position={[0, 0.88, -2.0]}>
        {/* Left Pylon */}
        <mesh position={[-0.52, -0.12, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.04, 0.26, 0.1]} />
          <meshStandardMaterial color="#1c1d22" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Right Pylon */}
        <mesh position={[0.52, -0.12, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.04, 0.26, 0.1]} />
          <meshStandardMaterial color="#1c1d22" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Main Aerofoil Blade */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.92, 0.05, 0.34]} />
          <meshPhysicalMaterial
            color="#111215"
            metalness={0.7}
            roughness={0.25}
            clearcoat={1.0}
          />
        </mesh>
        {/* Orange Winglet Endplates */}
        <mesh position={[-0.96, 0.05, 0]}>
          <boxGeometry args={[0.03, 0.16, 0.36]} />
          <meshStandardMaterial color="#f97316" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0.96, 0.05, 0]}>
          <boxGeometry args={[0.03, 0.16, 0.36]} />
          <meshStandardMaterial color="#f97316" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* Quad Titanium Exhaust System */}
      {[-0.32, -0.12, 0.12, 0.32].map((x, i) => (
        <group key={i} position={[x, 0.42, -2.12]}>
          {/* Outer Chrome / Titanium Casing */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.075, 0.18, 24]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.98} roughness={0.12} />
          </mesh>
          {/* Inner Heat Discoloration (Blue / Violet ring) */}
          <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 0.04, 20]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          4. MATRIX LED HEADLIGHTS & OLED TAIL LIGHTS
          ======================================================== */}
      {/* Front Headlights Cluster (Left & Right) */}
      <group position={[0, 0.48, 2.05]}>
        {/* Left Headlight Lens Array */}
        <mesh position={[-0.68, 0, 0]} rotation={[0.1, -0.15, 0]}>
          <boxGeometry args={[0.38, 0.08, 0.12]} />
          <meshPhysicalMaterial
            color={headlightsOn ? '#ffffff' : '#334155'}
            emissive={headlightsOn ? '#e0f2fe' : '#000000'}
            emissiveIntensity={headlightsOn ? 3.5 : 0}
            toneMapped={false}
            transmission={0.4}
            opacity={0.9}
            transparent
            roughness={0.1}
          />
        </mesh>
        {/* Right Headlight Lens Array */}
        <mesh position={[0.68, 0, 0]} rotation={[0.1, 0.15, 0]}>
          <boxGeometry args={[0.38, 0.08, 0.12]} />
          <meshPhysicalMaterial
            color={headlightsOn ? '#ffffff' : '#334155'}
            emissive={headlightsOn ? '#e0f2fe' : '#000000'}
            emissiveIntensity={headlightsOn ? 3.5 : 0}
            toneMapped={false}
            transmission={0.4}
            opacity={0.9}
            transparent
            roughness={0.1}
          />
        </mesh>

        {/* Dynamic Light Beams cast forward when headlights are ON */}
        {headlightsOn && (
          <>
            <spotLight
              position={[-0.68, 0.1, 0.2]}
              target-position={[-0.5, 0, 10]}
              intensity={4.5}
              angle={0.6}
              penumbra={0.7}
              distance={18}
              color="#f8fafc"
            />
            <spotLight
              position={[0.68, 0.1, 0.2]}
              target-position={[0.5, 0, 10]}
              intensity={4.5}
              angle={0.6}
              penumbra={0.7}
              distance={18}
              color="#f8fafc"
            />
          </>
        )}
      </group>

      {/* Rear OLED Continuous Light Bar */}
      <group position={[0, 0.58, -2.08]}>
        {/* Full-width blade */}
        <mesh>
          <boxGeometry args={[1.72, 0.045, 0.06]} />
          <meshBasicMaterial
            color="#ef4444"
            toneMapped={false}
          />
        </mesh>
        {/* Rear center brand brake glow */}
        {headlightsOn && (
          <pointLight
            position={[0, 0, -0.2]}
            color="#ef4444"
            intensity={2.0}
            distance={4}
          />
        )}
      </group>

      {/* Front Hood Brand Crest (NOIR MOTORS shield) */}
      <mesh position={[0, 0.58, 2.08]} rotation={[-0.1, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.015, 16]} />
        <meshStandardMaterial color="#f97316" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ========================================================
          5. ULTRA-DETAILED WHEELS, BRAKES & CALIPERS
          ======================================================== */}
      {/* 4 Wheels configuration: [x, y, z, isLeft] */}
      {[
        [-0.96, 0.34, 1.45, true],   // Front Left
        [0.96, 0.34, 1.45, false],   // Front Right
        [-0.98, 0.38, -1.25, true],  // Rear Left (wider)
        [0.98, 0.38, -1.25, false],  // Rear Right (wider)
      ].map(([x, y, z, isLeft], idx) => {
        const radius = idx < 2 ? 0.35 : 0.38;
        const width = idx < 2 ? 0.24 : 0.30;
        return (
          <group
            key={idx}
            position={[x as number, y as number, z as number]}
            ref={(el) => {
              if (el) wheelsRef.current[idx] = el;
            }}
          >
            {/* Rubber Tire with Tread Grip */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[radius, radius, width, 32]} />
              <meshStandardMaterial color="#131417" roughness={0.85} metalness={0.1} />
            </mesh>

            {/* Diamond Cut Alloy Rim Lip */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[radius * 0.82, radius * 0.82, width + 0.01, 32]} />
              <meshStandardMaterial color="#f4f4f5" metalness={0.96} roughness={0.12} />
            </mesh>

            {/* 5-Twin Spoke Center Face */}
            {[0, 1, 2, 3, 4].map((spokeIdx) => {
              const angle = (spokeIdx * (Math.PI * 2)) / 5;
              return (
                <mesh
                  key={spokeIdx}
                  position={[0, 0, 0]}
                  rotation={[angle, 0, 0]}
                >
                  <boxGeometry args={[width + 0.015, radius * 0.72, 0.035]} />
                  <meshStandardMaterial color="#27272a" metalness={0.95} roughness={0.18} />
                </mesh>
              );
            })}

            {/* Wheel Center Cap with Orange Ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, width + 0.02, 20]} />
              <meshStandardMaterial color="#090a0d" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Ventilated Carbon-Ceramic Brake Disc (Stationary inside the wheel) */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[radius * 0.68, radius * 0.68, 0.04, 32]} />
              <meshStandardMaterial color="#52525b" metalness={0.9} roughness={0.28} />
            </mesh>

            {/* High Performance Brake Caliper in Bright Orange */}
            <mesh
              position={[
                isLeft ? 0.04 : -0.04,
                radius * 0.38,
                0,
              ]}
              rotation={[0, 0, isLeft ? 0.4 : -0.4]}
            >
              <boxGeometry args={[0.07, radius * 0.42, 0.12]} />
              <meshStandardMaterial
                color="#f97316"
                metalness={0.65}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* ========================================================
          6. INTERACTIVE 3D HOTSPOT ANCHORS
          ======================================================== */}
      {hotspots.map((h) => {
        const isSelected = activeHotspot === h.id;
        return (
          <group
            key={h.id}
            position={h.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectHotspot(isSelected ? null : h.id);
            }}
          >
            {/* Outer ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.08, 0.11, 24]} />
              <meshBasicMaterial
                color={isSelected ? '#f97316' : '#ffffff'}
                side={THREE.DoubleSide}
                transparent
                opacity={isSelected ? 1.0 : 0.6}
              />
            </mesh>
            {/* Inner pulsing dot */}
            <mesh>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color={isSelected ? '#f97316' : '#ffffff'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
