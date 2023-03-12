import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const SmallPlant = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Small Plant */}
            <group position={position || [0.34, 2, 1.8]} rotation={[-Math.PI, 0.37, -Math.PI]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube035.geometry}
                    material={materials.Plant1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube035_1.geometry}
                    material={materials.Pot}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube035_2.geometry}
                    material={materials.Dirt}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube035_3.geometry}
                    material={materials["Plant Flower"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube035_4.geometry}
                    material={materials["Plant Flower 2"]}
                />
            </group>
        </>
    )
}

export const Camera = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Camera */}
            <group
                position={position || [0.51, 1.93, 1.73]}
                rotation={[0, -0.94, 0]}
                scale={[0.03, 0.05, 0.08]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube039.geometry}
                    material={materials["Camera Body Black"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube039_1.geometry}
                    material={materials["Camera Body Silver"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube039_2.geometry}
                    material={materials["Camera Lens"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube039_3.geometry}
                    material={materials["Camera Tool"]}
                />
            </group>
        </>
    )
}

export const RubikCube = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Rubik's Cube */}
            <group position={position || [0.33, 1.93, 1.66]} rotation={[0, -0.82, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043.geometry}
                    material={materials["Rubik Cube Body"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043_1.geometry}
                    material={materials["Rubik Cube Red"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043_2.geometry}
                    material={materials["Rubik Cube Green"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043_3.geometry}
                    material={materials["Rubik Cube Blue"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043_4.geometry}
                    material={materials["Rubik Cube White"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043_5.geometry}
                    material={materials["Rubik Cube Yellow"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube043_6.geometry}
                    material={materials["Rubik Cube Purple"]}
                />
            </group>
        </>
    )
}

export const Geode = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Geode */}
            <group
                position={position || [2.03, 1.68, 0.46]}
                rotation={[0, 0.27, -Math.PI]}
                scale={[-0.12, -0.2, -0.15]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube051.geometry}
                    material={materials["Geode Rock"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube051_1.geometry}
                    material={materials["Geode Inner"]}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Geode_Crystal_Mesh.geometry}
                material={materials["Geode Inner"]}
                position={position || [2.03, 1.68, 0.46]}
                rotation={[0, 0.27, -Math.PI]}
                scale={[-0.12, -0.2, -0.15]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle.geometry}
                material={materials.Amethyst}
                position={[0.51, 4.68, 0.32]}
                scale={0.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001.geometry}
                material={materials.Amethyst}
                position={[0.51, 4.68, 0.01]}
                scale={0.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002.geometry}
                material={materials.Amethyst}
                position={[0.51, 4.68, -0.31]}
                scale={0.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle003.geometry}
                material={materials.Amethyst}
                position={[0.88, 4.68, 0.37]}
                scale={[0.12, 0.05, 0.12]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle004.geometry}
                material={materials.Amethyst}
                position={[0.88, 4.68, 0.01]}
                scale={[0.12, 0.05, 0.12]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle005.geometry}
                material={materials.Amethyst}
                position={[0.88, 4.68, -0.37]}
                scale={[0.12, 0.05, 0.12]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle006.geometry}
                material={materials.Amethyst}
                position={[0.14, 4.68, 0.32]}
                scale={0.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle007.geometry}
                material={materials.Amethyst}
                position={[0.14, 4.68, 0.01]}
                scale={0.1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle008.geometry}
                material={materials.Amethyst}
                position={[0.14, 4.68, -0.31]}
                scale={0.1}
            />
        </>
    )
}

export const PencilContainer = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Pencil Container */}
            <group position={position || [0.37, 0.96, 1.24]} rotation={[0, Math.PI / 2, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube046.geometry}
                    material={materials["Pencil Container"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube046_1.geometry}
                    material={materials["Pencil 1"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube046_2.geometry}
                    material={materials["Pencil 2"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube046_3.geometry}
                    material={materials["Pencil 3"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube046_4.geometry}
                    material={materials["Pencil Container Inside"]}
                />
            </group>
        </>
    )
}

export const MakeUp = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    const relativePosition = [
        position ? [position[0], position[1], position[2]] : [0.35, 0.96, 1.74],
        position ? [position[0] + 0.11, position[1] - 0.01, position[2] + 0.03] : [0.46, 0.96, 1.77],
        position ? [position[0] + 0.08, position[1], position[2] - 0.04] : [0.43, 0.97, 1.7],
    ]
    return (
        <>
            {/* Make-Up */}
            <group
                position={relativePosition[0]}
                rotation={[-Math.PI, 1.15, -Math.PI]}
                scale={1.17}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube044.geometry}
                    material={materials["Make Up Container"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube044_1.geometry}
                    material={materials["Make Up Powder 1"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube044_2.geometry}
                    material={materials["Make Up Powder 2"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube044_3.geometry}
                    material={materials["Make Up Powder 3"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube044_4.geometry}
                    material={materials["Make Up Powder 4"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube044_5.geometry}
                    material={materials.Metallic}
                />
            </group>
            <group
                position={relativePosition[1]}
                rotation={[0, 0.42, 0]}
                scale={[0.03, 0, 0.03]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder007.geometry}
                    material={materials["Make Up Container"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder007_1.geometry}
                    material={materials["Make Up Powder 3"]}
                />
            </group>
            <group
                position={relativePosition[2]}
                rotation={[-Math.PI, 1.15, -Math.PI]}
                scale={1.17}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube045.geometry}
                    material={materials["Bin Metallic"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube045_1.geometry}
                    material={materials["Make Up Bottle"]}
                />
            </group>
        </>
    )
}

export const Candle = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Candle */}
            <group position={position || [0.71, 1.01, 0.32]} scale={0.05}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006.geometry}
                    material={materials["Candle Container"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006_1.geometry}
                    material={materials["Bin Metallic"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006_2.geometry}
                    material={materials["Candle Wax"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder006_3.geometry}
                    material={materials["Candle Wick"]}
                />
            </group>
        </>
    )
}

export const AlarmClock = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Alarm Clock */}
            <group position={position || [0.76, 1.02, 1.8]} rotation={[0, 1.04, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube042.geometry}
                    material={materials["Alarm Clock Box"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube042_1.geometry}
                    material={materials["Alarm Clock Face"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube042_2.geometry}
                    material={materials["Alarm Clock Button"]}
                />
            </group>
        </>
    )
}

export const DrinkCan = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Drink Can */}
            <group
                position={position || [1.05, 1, 0.34]}
                rotation={[0, 1.16, 0]}
                scale={[-0.04, -0.07, -0.04]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005.geometry}
                    material={materials["Bin Metallic"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder005_1.geometry}
                    material={materials["Can Label"]}
                />
            </group>
        </>
    )
}

export const CoffeeMug = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Coffee Mug */}
            <group position={position || [0.79, 1, 0.62]} rotation={[0, 0.69, 0]} scale={0.04}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder004.geometry}
                    material={materials.Mug}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder004_1.geometry}
                    material={materials.Coffee}
                />
            </group>
        </>
    )
}

export const Globe = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Globe */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Globe_Stand.geometry}
                material={materials["Globe Holder"]}
                position={position}
                rotation={[0, -0.46, 0]}
                scale={[0.1, 0.01, 0.1]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Globe_Holder.geometry}
                    material={materials["Globe Holder"]}
                    position={[-0.01, 24.45, 0.19]}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[17.39, 3.05, 2.23]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Globe_Sphere.geometry}
                    material={materials.Globe}
                    position={[-0.01, 24.4, 0.18]}
                    scale={[1.34, 10.47, 1.34]}
                />
            </mesh>
        </>
    )
}

export const Microscope = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Microscope */}
            <group
                position={position || [0.41, 1.91, 1.25]}
                rotation={[-Math.PI, 0.01, -Math.PI]}
                scale={1.21}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube034.geometry}
                    material={materials["Camera Body Silver"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube034_1.geometry}
                    material={materials["Camera Body Black"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube034_2.geometry}
                    material={materials["Camera Lens"]}
                />
            </group>
        </>
    )
}

export const BookStack = ({ position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Book Stack */}
            <group
                position={position || [0.41, 2.03, 0.86]}
                rotation={[Math.PI, -1.55, Math.PI]}
                scale={0.86}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube033.geometry}
                    material={materials["Book Cover 4"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube033_1.geometry}
                    material={materials["Book Cover 2"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube033_2.geometry}
                    material={materials["Book Cover 5"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube033_3.geometry}
                    material={materials["Book Paper"]}
                />
            </group>
        </>
    )
}