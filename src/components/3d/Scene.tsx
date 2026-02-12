import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    PerspectiveCamera,
    Environment,
    Float,
    ContactShadows,
    Stars
} from '@react-three/drei';
import { DataFlowShader, DigitalGrid, TechParticles, CursorFollower, VoxelBlock, VoxelHumanoid, Lungs3D, Proctor3D, Doctor3D, Factory3D } from './Elements';

const Scene = ({ storyPhase = 0, isIntro = false, activeProjectTitle = "" }: { storyPhase?: number, isIntro?: boolean, activeProjectTitle?: string }) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-auto">
            {/* @ts-ignore */}
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#22d3ee" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#a855f7" />

                <Suspense fallback={null}>
                    <DataFlowShader />
                    <DigitalGrid />
                    <TechParticles />
                    <CursorFollower />

                    {/* Position humanoid and artifacts to align with the left column of the grid */}
                    <group position={[-3.5, 0, 0]}>
                        <VoxelHumanoid storyPhase={storyPhase} isIntro={isIntro} />

                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <group position={[1.5, 0, 2]}>
                                <Factory3D active={storyPhase === 2 && activeProjectTitle.includes('BIM')} />
                                <Lungs3D active={storyPhase === 2 && activeProjectTitle.includes('Lung')} />
                                <Proctor3D active={storyPhase === 2 && activeProjectTitle.includes('Proctor')} />
                                <Doctor3D active={storyPhase === 2 && activeProjectTitle.includes('Doctor')} />
                            </group>
                        </Float>
                    </group>

                    {/* Tech Geometries - Sparse background elements */}
                    <Float speed={4} rotationIntensity={1} floatIntensity={1}>
                        <VoxelBlock position={[-10, 5, -8]} color="#22d3ee" />
                        <VoxelBlock position={[10, -5, -8]} color="#a855f7" />
                        <VoxelBlock position={[-8, -8, -12]} color="#1e1b4b" />
                    </Float>
                </Suspense>

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="city" />
                <ContactShadows
                    position={[0, -4.5, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2}
                    far={4.5}
                />
            </Canvas>
        </div>
    );
};

export default Scene;
