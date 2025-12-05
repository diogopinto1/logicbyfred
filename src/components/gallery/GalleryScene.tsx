import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  PerspectiveCamera,
  useTexture,
  Preload,
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import { Product } from '@/store/cartStore';

interface GallerySceneProps {
  product: Product;
}

// Gallery Room Component
const GalleryRoom = () => {
  // Wall material - warm gallery wall color
  const wallMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e8e2d9'),
      roughness: 0.9,
      metalness: 0.0,
    }), []);

  // Floor material - polished concrete
  const floorMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c4beb5'),
      roughness: 0.6,
      metalness: 0.1,
    }), []);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <primitive object={floorMaterial} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1, -4]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <primitive object={wallMaterial} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <primitive object={wallMaterial} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[6, 1, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[12, 8]} />
        <primitive object={wallMaterial} />
      </mesh>
    </group>
  );
};

// Framed Artwork with Product Image
const FramedArtwork = ({ product }: { product: Product }) => {
  const frameRef = useRef<THREE.Group>(null);
  
  // Load the product texture
  const texture = useTexture(product.image);
  
  // Configure texture
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Frame material - dark wood
  const frameMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a2420'),
      roughness: 0.8,
      metalness: 0.1,
    }), []);

  // Subtle floating animation
  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={frameRef} position={[0, 0.5, -3.9]}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[2.4, 3.2, 0.15]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Artwork with product image */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2, 2.67]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.5}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

// Fallback artwork without texture
const FramedArtworkFallback = ({ product }: { product: Product }) => {
  const frameRef = useRef<THREE.Group>(null);

  const frameMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a2420'),
      roughness: 0.8,
      metalness: 0.1,
    }), []);

  const canvasMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5f3ef'),
      roughness: 0.95,
      metalness: 0,
    }), []);

  // Generate color based on product
  const artColor = useMemo(() => {
    const hue = (product.id.charCodeAt(0) * 15) % 360;
    return `hsl(${hue}, 40%, 55%)`;
  }, [product.id]);

  useFrame((state) => {
    if (frameRef.current) {
      frameRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={frameRef} position={[0, 0.5, -3.9]}>
      <mesh castShadow>
        <boxGeometry args={[2.4, 3.2, 0.15]} />
        <primitive object={frameMaterial} />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2, 2.67]} />
        <primitive object={canvasMaterial} />
      </mesh>

      {/* Abstract shape */}
      <mesh position={[0, 0, 0.1]} castShadow>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color={artColor} roughness={0.7} />
      </mesh>
    </group>
  );
};

// Museum Label Component
const MuseumLabel = ({ product }: { product: Product }) => {
  const labelMaterial = useMemo(() =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.9,
      metalness: 0,
    }), []);

  const metaLine = useMemo(() => {
    const bits: string[] = [];
    if (product.artist) bits.push(product.artist);
    if (product.year) bits.push(product.year);
    return bits.join(' · ');
  }, [product.artist, product.year]);

  return (
    <group position={[0, -1.5, -3.85]}>
      <mesh>
        <planeGeometry args={[1.9, 0.6]} />
        <primitive object={labelMaterial} />
      </mesh>
      {/* Text content */}
      <Text
        position={[0, 0.18, 0.01]}
        fontSize={0.08}
        color="#2a2420"
        maxWidth={1.7}
        lineHeight={1}
        anchorX="center"
        anchorY="top"
      >
        {product.name}
      </Text>
      {metaLine && (
        <Text
          position={[0, 0.06, 0.01]}
          fontSize={0.05}
          color="#6b6158"
          maxWidth={1.7}
          lineHeight={1.1}
          anchorX="center"
          anchorY="top"
        >
          {metaLine}
        </Text>
      )}
      <Text
        position={[0, -0.04, 0.01]}
        fontSize={0.045}
        color="#6b6158"
        maxWidth={1.7}
        lineHeight={1.2}
        anchorX="center"
        anchorY="top"
      >
        {`${product.fabric} • ${product.fit}`}
      </Text>
      <Text
        position={[0, -0.16, 0.01]}
        fontSize={0.05}
        color="#2a2420"
        anchorX="center"
        anchorY="top"
      >
        {`€${product.price}`}
      </Text>
    </group>
  );
};

// Camera Controller with subtle movement
const CameraController = () => {
  useFrame((state) => {
    // Subtle camera sway
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    state.camera.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return null;
};

// Main Gallery Scene
const GalleryScene = ({ product }: GallerySceneProps) => {
  return (
    <div className="w-full h-full bg-gallery-wall">
      <Canvas 
        shadows 
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#e0dbd3');
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0.5, 3.5]} fov={45} />
          <CameraController />
          
          {/* Ambient Light */}
          <ambientLight intensity={0.4} color="#fff5e6" />
          
          {/* Main Spotlights */}
          <spotLight
            position={[0, 4, 0]}
            intensity={1.5}
            angle={0.5}
            penumbra={0.5}
            castShadow
            shadow-mapSize={[512, 512]}
            color="#fff5e6"
          />
          <spotLight
            position={[-2, 3, 1]}
            intensity={0.8}
            angle={0.4}
            penumbra={0.6}
            color="#fff5e6"
          />
          <spotLight
            position={[2, 3, 1]}
            intensity={0.8}
            angle={0.4}
            penumbra={0.6}
            color="#fff5e6"
          />

          {/* Gallery Room */}
          <GalleryRoom />

          {/* Framed Artwork with product image */}
          <Suspense fallback={<FramedArtworkFallback product={product} />}>
            <FramedArtwork product={product} />
          </Suspense>

          {/* Museum Label */}
          <MuseumLabel product={product} />

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            rotateSpeed={0.5}
            zoomSpeed={0.5}
          />

          {/* Environment */}
          <Environment preset="apartment" />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GalleryScene;
