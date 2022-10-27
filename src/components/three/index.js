import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export default function Three() {

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
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls ref={orbitControlsRef} enablePan={false} enableZoom={false} maxAzimuthAngle={Math.PI / 2} minAzimuthAngle={- Math.PI / 2} maxPolarAngle={Math.PI / 2.2} minPolarAngle={0.5} />


            <mesh position={[0, 1, 0]} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={"#ffffff"} />
            </mesh>

            <mesh rotation={[- Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color={"#222222"} />
            </mesh>

            <ambientLight args={["#ffffff", 0.25]} />
            <spotLight args={["#f14e51", 10, 6, Math.PI / 4, 0.5]} position={[-1, 4, 1]} castShadow />
        </>
    )
}