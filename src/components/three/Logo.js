import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const Model = () => {
    const infiniteSphere = useRef(null);

    const [t, setT] = useState(0)

    useFrame(() => {
        setT(t + 0.025);
        infiniteSphere.current.rotation.y += 0.03;

        infiniteSphere.current.position.x = 1 * Math.cos(t) + 0.75;
        infiniteSphere.current.position.z = 1 * Math.sin(t) + 1.35; // These to strings make it work
    })

    const girth = 0.3;
    const connected = false;

    return (
        <>
            <PerspectiveCamera makeDefault position={[10, 16, 10]} />
            <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} minDistance={6.0} maxDistance={12} maxAzimuthAngle={Math.PI / 2} minAzimuthAngle={0} maxPolarAngle={Math.PI / 2.2} minPolarAngle={0.5} />

            <group rotation={[0, Math.PI / 2, 0]}>

                <group ref={infiniteSphere} position={[0.75, 2.2, 2.4]} >
                    <mesh receiveShadow>
                        <sphereGeometry args={[0.25, 32, 32]} />
                        <meshStandardMaterial color={"#94fae7"} metalness={1} roughness={0} emissive={"#94fae7"} />
                    </mesh>
                    <pointLight args={["#94fae7", 5, 10, Math.PI / 2, 0.5]} decay={10} castShadow />
                </group>


                <group position={[-3, 2, -1]} scale={0.75}>
                    {/* Letter S */}
                    <group>
                        <mesh position={[0, 1.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[2.5, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1.75, -1, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[2, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, 2.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[0.875, 0.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[0.875, -1.75, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        {connected ?
                            <mesh position={[2, 2.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                                <boxGeometry args={[0.5, 2, girth]} />
                                <meshStandardMaterial color={"#774fd1"} />
                            </mesh> : ''}
                    </group>
                    {/* Letter T */}
                    <group position={[2.5, 0.5, 0]}>
                        <mesh position={[1, -0.5, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, 1.75, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        {connected ?
                            <mesh position={[1.625, 1.75, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                                <boxGeometry args={[0.5, 2.25, girth]} />
                                <meshStandardMaterial color={"#774fd1"} />
                            </mesh> : ''}
                    </group>
                    {/* Letter U */}
                    <group position={[5, 0, 2.75]} rotation={[0, Math.PI / 2, 0]}>
                        <mesh position={[0.125, 0.5, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1.875, 0.5, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, -1.75, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        {connected ?
                            <mesh position={[2.25, 2.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                                <boxGeometry args={[0.5, 1.25, girth]} />
                                <meshStandardMaterial color={"#774fd1"} />
                            </mesh> : ''}
                        {connected ?
                            <mesh position={[-0.25, 2.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                                <boxGeometry args={[0.5, 1.25, girth]} />
                                <meshStandardMaterial color={"#774fd1"} />
                            </mesh> : ''}
                    </group>
                    {/* Letter D */}
                    <group position={[5, 0, 5.5]} rotation={[0, Math.PI / 2, 0]}>
                        <mesh position={[0.125, 0, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1.875, 0, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, -1.75, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, 2.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                    </group>
                    {/* Letter D */}
                    <group position={[1.75, -2.25, 2.75]} rotation={[Math.PI / 2, 0, - Math.PI / 2]}>
                        <mesh position={[0.125, 0, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1.875, 0, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[4, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, -1.75, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, 2.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                    </group>
                    {/* Letter Y */}
                    <group position={[2.25, -2.25, 5.5]} rotation={[Math.PI / 2, 0, - Math.PI / 2]}>
                        <mesh position={[0.125, 1, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[2, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1.875, 1, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[2, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, 0, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[0.5, 2.25, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                        <mesh position={[1, -1.25, 0]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                            <boxGeometry args={[2.5, 0.5, girth]} />
                            <meshStandardMaterial color={"#774fd1"} />
                        </mesh>
                    </group>
                </group>

                <spotLight args={["#f14e51", 5, 60, Math.PI / 4, 0.5]} position={[-1, 10, 1]} castShadow />
                <spotLight args={["#ffff00", 10, 5, Math.PI / 2, 0.5]} position={[-2, 7, 1]} castShadow />
                <spotLight args={["#0000ff", 15, 5, Math.PI / 2, 0.5]} position={[-5, 3, 5]} castShadow />
            </group>

            <ambientLight args={["#ffffff", 0.75]} />
        </>
    )
}

const Logo = (width, height) => {
    return (
        <Canvas id="three-canvas-container" width={width} height={height} shadows style={{ width: `${width} !important`, height: `${height} !important` }}>
            <Suspense fallback={<></>}>
                <Model />
            </Suspense>
        </Canvas >
    );
}

export default Logo;