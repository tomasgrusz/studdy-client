import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { AlarmClock, BookStack, Camera, Candle, CoffeeMug, DrinkCan, Geode, Globe, MakeUp, Microscope, PencilContainer, RubikCube, SmallPlant } from "./Customizations";

const TemplateAreas = ({ type, position }) => {
    const { nodes, materials } = useGLTF("/studio.glb");

    if (type === 'desk') {
        return (
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube007.geometry}
                material={nodes.Cube007.material}
                position={position}
                rotation={[0, Math.PI / 2, 0]}
            />
        )
    } else if (type === 'small') {
        return (
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube011.geometry}
                material={nodes.Cube011.material}
                position={position}
                rotation={[0, -Math.PI / 2, 0]}
            />
        )
    } else if (type === 'large') {
        return (
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube018.geometry}
                material={nodes.Cube018.material}
                position={position}
                rotation={[0, -Math.PI / 2, 0]}
            />
        )
    }
}

const DeskAreas = ({ desk1, desk2 }) => {

    const mapID = (ID, position) => {

        const IDs = {
            101: <MakeUp position={[position[0], position[1] - 0.03, position[2]]} />,
            102: <Candle position={[position[0], position[1] + 0.01, position[2]]} />,
            103: <DrinkCan position={[position[0], position[1], position[2]]} />,
            104: <CoffeeMug position={[position[0], position[1], position[2]]} />,
            105: <PencilContainer position={[position[0], position[1] - 0.04, position[2]]} />,
            106: <AlarmClock position={[position[0], position[1] + 0.025, position[2]]} />
        }

        return IDs[`${ID}`]
    }

    return (
        <group>
            {desk1 ? mapID(desk1, [0.91, 1, 0.43]) : <TemplateAreas type={'desk'} position={[0.91, 1.02, 0.43]} />}
            {desk2 ? mapID(desk2, [0.46, 1, 1.71]) : <TemplateAreas type={'desk'} position={[0.46, 1.03, 1.71]} />}
        </group>
    )
}

const SmallAreas = ({ small1, small2, small3 }) => {

    const mapID = (ID, position) => {

        const IDs = {
            301: <SmallPlant position={[position[0], position[1] - 0.01, position[2]]} />,
            302: <RubikCube position={[position[0], position[1] - 0.07, position[2]]} />,
            303: <Camera position={[position[0], position[1] - 0.07, position[2]]} />
        }

        return IDs[`${ID}`]
    }

    return (
        <group>
            {small1 ? mapID(small1, [2.57, 1.935, 0.45]) : <TemplateAreas type={'small'} position={[2.57, 1.93, 0.45]} />}
            {small2 ? mapID(small2, [2.86, 1.935, 0.46]) : <TemplateAreas type={'small'} position={[2.86, 1.93, 0.46]} />}
            {small3 ? mapID(small3, [0.38, 2, 1.73]) : <TemplateAreas type={'small'} position={[0.38, 1.98, 1.73]} />}
        </group>
    )
}

const LargeAreas = ({ large1, large2, large3 }) => {

    const mapID = (ID, position) => {

        const IDs = {
            501: <Globe position={[position[0], position[1] - 0.105, position[2]]} />,
            502: <BookStack position={[position[0], position[1] + 0.03, position[2]]} />,
            503: <Microscope position={[position[0], position[1] - 0.095, position[2]]} />,
            504: <Geode position={[position[0] - 0.1, position[1] - 0.27, position[2]]} />
        }

        return IDs[`${ID}`]
    }

    return (
        <group>
            {large1 ? mapID(large1, [0.38, 2, 0.62]) : <TemplateAreas type={'large'} position={[0.38, 2.07, 0.62]} />}
            {large2 ? mapID(large2, [0.38, 2, 1.24]) : <TemplateAreas type={'large'} position={[0.38, 2.07, 1.24]} />}
            {large3 ? mapID(large3, [2.19, 1.935, 0.43]) : <TemplateAreas type={'large'} position={[2.19, 2.01, 0.43]} />}
        </group>
    )
}

export const CMAreas = ({ desk, small, large }) => {
    return (
        <group>
            <DeskAreas desk1={desk ? desk[0] : null} desk2={desk ? desk[1] : null} />
            <SmallAreas small1={small ? small[0] : null} small2={small ? small[1] : null} small3={small ? small[2] : null} />
            <LargeAreas large1={large ? large[0] : null} large2={large ? large[1] : null} large3={large ? large[2] : null} />
        </group>
    )
}