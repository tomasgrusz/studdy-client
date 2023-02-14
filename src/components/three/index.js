import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { StudioTest } from "./StudioTest";
import { DirectionalLightHelper, RectAreaLight, SpotLightHelper } from "three";
import { SelectiveBloom, EffectComposer } from '@react-three/postprocessing'
import { Resizer, KernelSize } from 'postprocessing'

import { useGLTF } from "@react-three/drei";

const Model = () => {

    const mode = localStorage.getItem('darkMode')

    const orbitControlsRef = useRef(null);

    const light = useRef()
    const light2 = useRef()
    // useHelper(light, SpotLightHelper, 'cyan')
    // useHelper(light2, DirectionalLightHelper, 'red')

    const studioRef = useRef()
    const meshRef1 = useRef()

    const darkModeLights = <>
        <pointLight ref={light2} args={["#a08fff", 1, 5, 1]} position={[1.5, 3, 1.5]} />
    </>

    const lightModeLights = <>
        <ambientLight ref={light2} args={["#fff", 0.25]} />
        <pointLight ref={light2} args={["#fff", 1.25, 10, 1]} position={[1.5, 5, 1.5]} castShadow={mode === 'light'} shadow-mapSize-height={2048} shadow-mapSize-width={2048} shadow-bias={-0.0005} />
    </>

    return (
        <>
            <StudioTest ref={studioRef} scale={1.5} position={[-1, 0, -1]} />
            <PerspectiveCamera makeDefault position={[10, 10, 10]} />
            <OrbitControls ref={orbitControlsRef} enablePan={false} minDistance={6.0} maxDistance={12} maxAzimuthAngle={Math.PI / 2} minAzimuthAngle={0} maxPolarAngle={Math.PI / 2.5} minPolarAngle={0.5} />

            {mode === 'light' ? lightModeLights : darkModeLights}

        </>
    )
}

const Three = (width, height) => {

    const { nodes, materials } = useGLTF("/studioTest.glb");

    const mode = localStorage.getItem('darkMode')

    const meshRef1 = useRef()
    // const meshRef2 = useRef()

    const light2 = useRef()

    return (
        <Canvas id="three-canvas-container" width={width} height={height} shadows style={{ width: `${width} !important`, height: `${height} !important` }}>
            <Suspense fallback={<></>}>
                <Model />
                <mesh
                    ref={meshRef1}
                    castShadow
                    receiveShadow
                    geometry={nodes.Bedlight.geometry}
                    material={materials.Bed_Light}
                    position={[-0.45, 1.63, 3.27]}
                    rotation={[Math.PI / 2, 0, -1.57]}
                >
                    <meshStandardMaterial color={"#e3dc8d"} metalness={1} roughness={0} emissive={'#e3dc8d'} />
                </mesh>

                {mode === 'light' ? <pointLight ref={light2} args={['#e3dc8d', 1.5, 15, 2]} position={[0, 1.63, 3.27]} castShadow shadow-mapSize-height={4096} shadow-mapSize-width={4096} shadow-bias={-0.0005} /> : <pointLight ref={light2} args={['#e3dc8d', 0, 0, 0]} />}
            </Suspense>
            <EffectComposer>
                <SelectiveBloom
                    lights={[light2]} // ⚠️ REQUIRED! all relevant lights
                    selection={[meshRef1]} // selection of objects that will have bloom effect
                    selectionLayer={2} // selection layer
                    intensity={2.0} // The bloom intensity.
                    blurPass={undefined} // A blur pass.
                    width={Resizer.AUTO_SIZE} // render width
                    height={Resizer.AUTO_SIZE} // render height
                    kernelSize={KernelSize.LARGE} // blur kernel size
                    luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
                    luminanceSmoothing={0.0025} // smoothness of the luminance threshold. Range is [0, 1]
                />
            </EffectComposer>
        </Canvas >
    );
}

export default Three;