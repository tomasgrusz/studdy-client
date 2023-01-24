import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

const Model = () => {

    const orbitControlsRef = useRef(null);
    useFrame((state) => {
        if (!!orbitControlsRef.current) {
            const { x, y } = state.mouse;
            // console.log(orbitControlsRef.current.getAzimuthalAngle())
            // orbitControlsRef.current.setAzimuthalAngle(orbitControlsRef.current.getAzimuthalAngle() + (Math.PI / 16));
        }
    })

    return (
        <>

            <PerspectiveCamera makeDefault position={[10, 0, 10]} />
            <OrbitControls ref={orbitControlsRef} enablePan={false} minDistance={6.0} maxDistance={12} maxAzimuthAngle={0} minAzimuthAngle={- Math.PI / 2} maxPolarAngle={Math.PI / 2.2} minPolarAngle={0.5} />


            <mesh position={[-1, 1, 1]} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={"#ffffff"} />
            </mesh>

            <mesh position={[-1, 0, 1]} rotation={[- Math.PI / 2, 0, 0]} receiveShadow>
                <boxGeometry args={[5, 5, 0.25]} />
                <meshStandardMaterial color={"#222222"} />
            </mesh>

            <mesh position={[1.375, 2, 1]} rotation={[Math.PI, 0, 0]} receiveShadow>
                <boxGeometry args={[0.25, 4, 5]} />
                <meshStandardMaterial color={"#222222"} />
            </mesh>

            <mesh position={[-1, 2, -1.375]} rotation={[0, 0, - Math.PI / 2]} receiveShadow>
                <boxGeometry args={[4, 5, 0.25]} />
                <meshStandardMaterial color={"#222222"} />
            </mesh>

            <ambientLight args={["#ffffff", 1]} />
            <spotLight args={["#f14e51", 10, 6, Math.PI / 4, 0.5]} position={[-1, 4, 1]} castShadow />
        </>
    )
}

const Three = (width, height) => {
    return (
        <Canvas id="three-canvas-container" shadows style={{ width: width, height: height }}>
            <Suspense fallback={<></>}>
                <Model />
            </Suspense>
        </Canvas >
    );
}

export default Three;