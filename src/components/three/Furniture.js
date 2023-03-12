import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Curtains = ({ furniture }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID) => {

        const IDs = {
            0: materials["Dark Wood"],
            201: materials["Oak Wood"],
            202: materials["Birch Wood"],
            203: materials["Painted Wood"],
            204: materials["Cherry Wood"],
            205: materials["Mahogany Wood"]
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Curtains */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Curtains.geometry}
                material={materials.Curtains}
                position={[0.88, 1.89, 0.27]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.75, 0.75, 0.63]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Curtain_Holder.geometry}
                material={mapID(furniture[0])}
                position={[1.27, 2.51, 0.26]}
                rotation={[1.57, 0, 0]}
                scale={[1, 0.58, 1.41]}
            />
        </>
    )
}

export const Whiteboard = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Whiteboard */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Board.geometry}
                material={materials["Material.001"]}
                position={[0.26, 1.35, 1.24]}
                rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Whiteboard.geometry}
                material={materials.Whiteboard}
                position={[0.26, 1.35, 1.23]}
                rotation={[0, 0, -Math.PI / 2]}
            />
        </>
    )
}

export const Bookshelf = ({ furniture }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID) => {

        const IDs = {
            0: materials["Dark Wood"],
            201: materials["Oak Wood"],
            202: materials["Birch Wood"],
            203: materials["Painted Wood"],
            204: materials["Cherry Wood"],
            205: materials["Mahogany Wood"]
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Bookshelf */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bookshelf.geometry}
                material={mapID(furniture[0])}
                position={[2.51, 1.3, 0.42]}
                rotation={[0, -Math.PI / 2, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bookshelf_Door.geometry}
                material={mapID(furniture[0])}
                position={[2.51, 0.93, 0.63]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[0.38, 1, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bookshelf_Door_Handles.geometry}
                material={materials.Handle}
                position={[2.56, 0.95, 0.78]}
                rotation={[-0.03, 0, -Math.PI / 2]}
                scale={[0.06, 0.04, 0.04]}
            />
            <group
                position={[3.01, 1.25, 0.44]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.86}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube049.geometry}
                    material={materials["Book Cover 3"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube049_1.geometry}
                    material={materials["Book Cover 1"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube049_2.geometry}
                    material={materials["Book Cover 2"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube049_3.geometry}
                    material={materials["Book Cover 4"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube049_4.geometry}
                    material={materials["Book Cover 5"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube049_5.geometry}
                    material={materials["Book Paper"]}
                />
            </group>
        </>
    )
}

export const Laptop = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Laptop */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Laptop_Bottom.geometry}
                material={materials.Laptop}
                position={[0.64, 0.96, 1.01]}
                rotation={[0, 1.05, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Laptop_Keyboard.geometry}
                material={materials.Material}
                position={[0.47, 0.96, 1.12]}
                rotation={[0.04, 1.05, -0.04]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Laptop_Top.geometry}
                material={materials.Laptop}
                position={[0.47, 1.09, 0.92]}
                rotation={[-1.82, -0.41, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Laptop_Screen.geometry}
                material={materials.Screen}
                position={[0.47, 1.09, 0.92]}
                rotation={[-1.82, -0.41, -2.14]}
            />
        </>
    )
}

export const DeskLamp = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Desk Lamp */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Desk_Lamp_Stand.geometry}
                material={materials["Bin Metallic"]}
                position={[0.48, 0.97, 0.41]}
                rotation={[0, Math.PI / 2, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Desk_Lamp.geometry}
                material={materials["Bin Metallic"]}
                position={[0.41, 1.19, 0.41]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Desk_Lamp_Light.geometry}
                material={materials["Bin Metallic"]}
                position={[0.41, 1.19, 0.41]}
            />
        </>
    )
}

export const Chair = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Chair */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Chair_Top.geometry}
                material={materials["Chair Legs"]}
                position={[1.49, 0.65, 1]}
                rotation={[0, -0.51, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Chair_Bar.geometry}
                material={materials["Bin Metallic"]}
                position={[1.5, 0.32, 0.99]}
                rotation={[0, -0.51, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Chair_Legs.geometry}
                material={materials["Chair Legs"]}
                position={[1.48, 0.29, 1.24]}
                rotation={[Math.PI, -1.33, Math.PI]}
            />
        </>
    )
}

export const Bed = ({ furniture, bed }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID, type) => {

        const IDs = {
            0: type === 'bed' ? materials["Bed Sheet"] : materials["Dark Wood"],
            201: materials["Oak Wood"],
            202: materials["Birch Wood"],
            203: materials["Painted Wood"],
            204: materials["Cherry Wood"],
            205: materials["Mahogany Wood"],
            251: materials["Bed Sheet 1"],
            252: materials["Bed Sheet 2"],
            253: materials["Bed Sheet 3"],
            254: materials["Bed Sheet 4"],
            255: materials["Bed Sheet 5"]
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Bed */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bed_Frame.geometry}
                material={mapID(furniture[0])}
                position={[2.56, 0.51, 2.96]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bed_Mattress.geometry}
                material={materials.Mattress}
                position={[1.45, 0.66, 2.46]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bed_Sheet.geometry}
                material={mapID(bed[0], 'bed')}
                position={[1.5, 1.24, 2.47]}
                scale={[1.41, 1, 0.9]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Pillow.geometry}
                material={materials.Pillow}
                position={[0.52, 0.87, 2.47]}
                rotation={[0, 0, -0.68]}
                scale={[0.22, 0.28, 0.42]}
            />
        </>
    )
}

export const Desk = ({ furniture }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID) => {

        const IDs = {
            0: materials["Dark Wood"],
            201: materials["Oak Wood"],
            202: materials["Birch Wood"],
            203: materials["Painted Wood"],
            204: materials["Cherry Wood"],
            205: materials["Mahogany Wood"]
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Desk */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Desk.geometry}
                material={mapID(furniture[0])}
                position={[0.58, 0.94, 1.07]}
                rotation={[0, Math.PI / 2, 0]}
            />
            <group position={[0.61, 0.8, 1.7]} rotation={[0, Math.PI / 2, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube026.geometry}
                    material={mapID(furniture[0])}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube026_1.geometry}
                    material={materials.Handle}
                />
            </group>
            <group position={[0.56, 0.57, 1.7]} rotation={[0, Math.PI / 2, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010.geometry}
                    material={mapID(furniture[0])}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube010_1.geometry}
                    material={materials.Handle}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Table_Leg.geometry}
                material={mapID(furniture[0])}
                position={[0.58, 0.57, 0.26]}
                rotation={[0, Math.PI / 2, 0]}
            />
        </>
    )
}

export const Window = ({ furniture }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID) => {

        const IDs = {
            0: materials["Dark Wood"],
            201: materials["Oak Wood"],
            202: materials["Birch Wood"],
            203: materials["Painted Wood"],
            204: materials["Cherry Wood"],
            205: materials["Mahogany Wood"]
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Window */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Window_Frame.geometry}
                material={mapID(furniture[0])}
                position={[1.25, 1.79, 0.05]}
                rotation={[3.14, Math.PI / 2, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Window_Glass.geometry}
                material={materials.Metallic}
                position={[1, 1.8, 0.05]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[1, 1.61, 0.91]}
            />
        </>
    )
}

export const Bin = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Bin */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bin.geometry}
                material={materials["Bin Metallic"]}
                position={[0.48, 0.39, 0.54]}
                rotation={[0, Math.PI / 2, 0]}
            />
        </>
    )
}

export const Shelf = ({ furniture }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID) => {

        const IDs = {
            0: materials["Dark Wood"],
            201: materials["Oak Wood"],
            202: materials["Birch Wood"],
            203: materials["Painted Wood"],
            204: materials["Cherry Wood"],
            205: materials["Mahogany Wood"]
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Shelf */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Shelf.geometry}
                material={mapID(furniture[0])}
                position={[0.41, 1.86, 1.06]}
                rotation={[0, 0, -Math.PI / 2]}
            />
        </>
    )
}

export const WallFloor = ({ paint }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    const mapID = (ID) => {

        const IDs = {
            0: materials["Wall Material"],
            1: materials["Wall Material 1"],
            2: materials["Wall Material 2"],
            3: materials["Wall Material 3"],
            4: materials["Wall Material 4"],
            5: materials["Wall Material 5"],
            6: materials["Wall Material 6"],
            7: materials["Wall Material 7"],
            8: materials["Wall Material 8"],
            9: materials["Wall Material 9"],
            10: materials["Wall Material 10"],
        }

        return IDs[`${ID}`]
    }

    return (
        <>
            {/* Wall & Floor */}
            <group position={[1.57, 0.11, 1.53]} scale={[1.01, 1, 1]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003.geometry}
                    material={materials.Floor}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube003_1.geometry}
                    material={materials["Wall Outer"]}
                />
            </group>
            <group position={[1.45, 1.54, 0.12]} rotation={[1.57, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004.geometry}
                    material={mapID(paint[0])}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube004_1.geometry}
                    material={materials["Wall Outer"]}
                />
            </group>
            <group position={[0.12, 1.54, 1.63]} rotation={[0, 0, -Math.PI / 2]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={mapID(paint[1])}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005_1.geometry}
                    material={materials["Wall Outer"]}
                />
            </group>
        </>
    )
}

export const Carpet = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Carpet */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Carpet.geometry}
                material={materials.Carpet}
                position={[2.44, 0.23, 1.79]}
                scale={[1, 0.52, 1]}
            />
        </>
    )
}

export const Poster = () => {
    const { nodes, materials } = useGLTF("/studio.glb");
    return (
        <>
            {/* Poster */}
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Poster.geometry}
                material={materials.Poster}
                position={[0.23, 1.86, 2.46]}
                rotation={[0, 0, -Math.PI / 2]}
            />
        </>
    )
}

export const Furniture = ({ paint, furniture, bed }) => {
    return (
        <group>
            <WallFloor paint={paint} />

            <Window furniture={furniture} />
            <Curtains furniture={furniture} />

            <Bed furniture={furniture} bed={bed} />

            <Desk furniture={furniture} />
            <Whiteboard />
            <DeskLamp />
            <Laptop />
            <Bin />
            <Chair />

            <Bookshelf furniture={furniture} />

            <Shelf furniture={furniture} />

            <Carpet />
            <Poster />
        </group>
    )
}