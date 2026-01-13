import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export const CursorFollower = () => {
    const meshRef = useRef<THREE.Group>(null!);
    const { viewport, mouse } = useThree();

    useFrame(() => {
        const x = (mouse.x * viewport.width) / 2.5;
        const y = (mouse.y * viewport.height) / 2.5;
        meshRef.current.position.set(x, y, 0);
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <group ref={meshRef}>
            <mesh castShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.6, 0.6, -0.2]}>
                <octahedronGeometry args={[0.2]} />
                <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
            </mesh>
        </group>
    );
};

export const DataFlowShader = () => {
    const meshRef = useRef<THREE.Mesh>(null!);

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float time;
        varying vec2 vUv;
        
        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            vec2 uv = vUv;
            uv.y += time * 0.1;
            
            float grid = step(0.98, fract(vUv.x * 20.0)) + step(0.98, fract(uv.y * 20.0));
            float data = step(0.995, random(floor(vUv * 50.0) + floor(time * 5.0)));
            
            vec3 color = mix(vec3(0.02, 0.02, 0.05), vec3(0.1, 0.4, 0.6), grid * 0.2);
            color += vec3(0.0, 0.8, 1.0) * data * (1.0 - vUv.y);
            
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    useFrame((state) => {
        if (meshRef.current) {
            // @ts-ignore
            meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -15]} scale={[50, 50, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    time: { value: 0 }
                }}
            />
        </mesh>
    );
};

export const DigitalGrid = () => {
    return (
        <gridHelper
            args={[100, 50, "#22d3ee", "#111111"]}
            position={[0, -10, 0]}
            rotation={[Math.PI / 2, 0, 0]}
        />
    );
};

export const TechParticles = () => {
    const pointsRef = useRef<THREE.Points>(null!);
    const count = 1000;
    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 40;
            p[i * 3 + 1] = (Math.random() - 0.5) * 40;
            p[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
        return p;
    }, []);

    useFrame((state) => {
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#22d3ee" transparent opacity={0.4} />
            </points>
        </group>
    );
};

// Detailed Humanoid Segments
const SEGMENTS = [
    // Body Parts
    { name: 'head', size: [0.6, 0.6, 0.6], pos: [0, 1.8, 0], color: '#ffffff' },
    { name: 'torso', size: [1, 1.2, 0.5], pos: [0, 0.8, 0], color: '#22d3ee' },
    { name: 'armL', size: [0.3, 1, 0.3], pos: [-0.7, 0.8, 0], color: '#a855f7' },
    { name: 'armR', size: [0.3, 1, 0.3], pos: [0.7, 0.8, 0], color: '#a855f7' },
    { name: 'handL', size: [0.25, 0.25, 0.25], pos: [-0.7, 0.2, 0], color: '#ffffff' },
    { name: 'handR', size: [0.25, 0.25, 0.25], pos: [0.7, 0.2, 0], color: '#ffffff' },
    { name: 'legL', size: [0.4, 1.2, 0.4], pos: [-0.3, -0.4, 0], color: '#22d3ee' },
    { name: 'legR', size: [0.4, 1.2, 0.4], pos: [0.3, -0.4, 0], color: '#22d3ee' },

    // Facial Features
    { name: 'eyeL', size: [0.12, 0.12, 0.1], pos: [-0.15, 1.9, 0.3], color: '#00ffff', emissive: 5 },
    { name: 'eyeR', size: [0.12, 0.12, 0.1], pos: [0.15, 1.9, 0.3], color: '#00ffff', emissive: 5 },
    { name: 'nose', size: [0.1, 0.1, 0.1], pos: [0, 1.8, 0.3], color: '#ffffff' },
    { name: 'earL', size: [0.1, 0.2, 0.1], pos: [-0.35, 1.85, 0], color: '#ffffff' },
    { name: 'earR', size: [0.1, 0.2, 0.1], pos: [0.35, 1.85, 0], color: '#ffffff' },
];

export const VoxelHumanoid = ({ storyPhase, isIntro }: { storyPhase: number, isIntro: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const { clock } = useThree();
    const [burstTime, setBurstTime] = useState(-10);

    const randomDir = useMemo(() => SEGMENTS.map(() => [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    ]), []);

    const randomOffsets = useMemo(() => SEGMENTS.map(() => Math.random() * Math.PI * 2), []);

    useFrame((_state) => {
        const time = _state.clock.getElapsedTime();
        if (!groupRef.current) return;

        const timeSinceBurst = time - burstTime;
        const isCurrentlyBursting = timeSinceBurst > 0 && timeSinceBurst < 2.5;
        const burstFactor = isCurrentlyBursting
            ? Math.sin(Math.min(timeSinceBurst * 2, Math.PI))
            : 0;

        groupRef.current.children.forEach((child, i) => {
            const segment = SEGMENTS[i];
            const offset = randomOffsets[i];

            // 1. Base Structure & Narrative Phase Logic
            let targetPos = [...segment.pos];
            let targetRot = [0, 0, 0];
            let targetScale = [1, 1, 1];

            if (isIntro) {
                const dir = randomDir[i];
                targetPos = [dir[0], dir[1], dir[2]];
                targetScale = [0, 0, 0];
            } else if (storyPhase >= 2) {
                // When showing projects or further sections, keep him small and on the side
                const dir = randomDir[i];
                targetPos = [dir[0] + 5, dir[1], -15];
                targetScale = [0.3, 0.3, 0.3];
            }

            // 2. Additive Dancing Animation (Always active in basic phases)
            if (!isCurrentlyBursting && storyPhase < 2) {
                // Bobbing torso/head
                if (segment.name === 'torso' || segment.name === 'head' || segment.name.includes('eye')) {
                    targetPos[1] += Math.sin(time * 4) * 0.15;
                    targetRot[2] = Math.sin(time * 2 + offset) * 0.05;
                }
                // Rhythmic arms
                if (segment.name.includes('arm') || segment.name.includes('hand')) {
                    const side = segment.name.includes('L') ? -1 : 1;
                    targetRot[2] += Math.sin(time * 4 + offset) * 0.5 * side;
                    targetPos[1] += Math.cos(time * 4) * 0.1;
                }
                // Stepping legs
                if (segment.name.includes('leg')) {
                    targetRot[0] = Math.sin(time * 8 + offset) * 0.3;
                    targetPos[1] += Math.max(0, Math.sin(time * 8 + offset) * 0.15);
                }
            }

            // 3. Burst Effect (Highest Priority)
            if (burstFactor > 0) {
                const dir = randomDir[i];
                targetPos[0] += dir[0] * burstFactor;
                targetPos[1] += dir[1] * burstFactor;
                targetPos[2] += dir[2] * burstFactor;
                targetRot[0] += timeSinceBurst * 10;
                targetRot[1] += timeSinceBurst * 5;
            }

            // Smooth interpolation
            child.position.x += (targetPos[0] - child.position.x) * 0.1;
            child.position.y += (targetPos[1] - child.position.y) * 0.15;
            child.position.z += (targetPos[2] - child.position.z) * 0.1;

            child.rotation.x += (targetRot[0] - child.rotation.x) * 0.1;
            child.rotation.y += (targetRot[1] - child.rotation.y) * 0.1;
            child.rotation.z += (targetRot[2] - child.rotation.z) * 0.1;

            child.scale.setScalar(THREE.MathUtils.lerp(child.scale.x, targetScale[0], 0.1));
        });

        // General floating/sway
        groupRef.current.position.y = -1 + Math.sin(time * 2) * 0.1;
    });

    return (
        <group
            ref={groupRef}
            position={[0, -1, 0]}
            onClick={(e) => {
                e.stopPropagation();
                // Use the reliable R3F clock time
                setBurstTime(clock.getElapsedTime());
            }}
        >
            {SEGMENTS.map((seg) => (
                <mesh key={seg.name} castShadow>
                    <boxGeometry args={seg.size as any} />
                    <meshStandardMaterial
                        color={seg.color}
                        emissive={seg.color}
                        emissiveIntensity={(seg as any).emissive || 0.5}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}
        </group>
    );
};


export const Factory3D = ({ active }: { active: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (!groupRef.current) return;
        const targetScale = active ? 1.5 : 0;
        groupRef.current.scale.setScalar(
            THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1)
        );
        groupRef.current.rotation.y += 0.01;
    });

    return (
        <group ref={groupRef} scale={0}>
            {/* Voxel Factory Structure */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 1.5, 2]} />
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Smoking Chimneys */}
            <mesh position={[-0.5, 1, -0.5]}>
                <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.5, 1, 0.5]}>
                <cylinderGeometry args={[0.2, 0.2, 1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            {/* Rotating Gears */}
            <Float speed={5} rotationIntensity={2}>
                <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.5, 0.1, 16, 32]} />
                    <meshStandardMaterial color="#94a3b8" metalness={1} />
                </mesh>
            </Float>
            <Float speed={3} rotationIntensity={1}>
                <mesh position={[-1, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.3, 0.08, 16, 32]} />
                    <meshStandardMaterial color="#64748b" metalness={1} />
                </mesh>
            </Float>
        </group>
    );
};

export const Lungs3D = ({ active }: { active: boolean }) => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (!meshRef.current) return;
        const targetScale = active ? 1.5 : 0;
        meshRef.current.scale.setScalar(
            THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
        );
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <group ref={meshRef} scale={0}>
            <mesh position={[-0.8, 0, 0]}>
                <boxGeometry args={[1.2, 2.2, 0.8]} />
                <meshStandardMaterial color="#ff4d4d" emissive="#ff4d4d" emissiveIntensity={0.5} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.8, 0, 0]}>
                <boxGeometry args={[1.2, 2.2, 0.8]} />
                <meshStandardMaterial color="#ff4d4d" emissive="#ff4d4d" emissiveIntensity={0.5} transparent opacity={0.7} />
            </mesh>
            <mesh scale={2}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#4ade80" transparent opacity={0.05} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

export const Proctor3D = ({ active }: { active: boolean }) => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const targetScale = active ? 1.5 : 0;
        meshRef.current.scale.setScalar(
            THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
        );
        meshRef.current.rotation.y = Math.sin(time) * 0.5;
        meshRef.current.position.y = Math.cos(time) * 0.2;
    });

    return (
        <group ref={meshRef} scale={0}>
            {/* Camera Eye */}
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#222222" metalness={1} roughness={0} />
            </mesh>
            <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, 0, 1]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Scanning Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.05, 16, 100]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1} transparent opacity={0.5} />
            </mesh>
        </group>
    );
};

export const Doctor3D = ({ active }: { active: boolean }) => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (!meshRef.current) return;
        const targetScale = active ? 1.5 : 0;
        meshRef.current.scale.setScalar(
            THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
        );
        meshRef.current.rotation.y += 0.02;
    });

    return (
        <group ref={meshRef} scale={0}>
            {/* AI Network Sphere */}
            <mesh>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="#a855f7" wireframe emissive="#a855f7" emissiveIntensity={1} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} transparent opacity={0.3} />
            </mesh>
            {/* Pulsing Core */}
            <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                <mesh scale={0.3}>
                    <dodecahedronGeometry />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
                </mesh>
            </Float>
        </group>
    );
};

export const VoxelBlock = ({ position, color }: { position: [number, number, number], color: string }) => (
    <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </mesh>
);
