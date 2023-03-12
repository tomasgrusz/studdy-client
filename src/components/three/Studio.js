import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useRef } from "react";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Lights } from "./Lights";
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useGLTF } from "@react-three/drei";
import { Furniture } from "./Furniture";
import { CMAreas } from "./CMAreas";
import { Shop } from "./Shop";
import './Studio.css';

const StudioComponent = (props) => {

    const [studio, setStudio] = useState(null);
    const [items, setItems] = useState(null)

    const getStudio = async () => {

        const response = await Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/studio`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.studio) {
            setStudio(response.data.studio)
            setItems(response.data.items)
        } else {
            alert(`Something went wrong!`);
        }
    }

    useEffect(() => {
        getStudio();
    }, [])

    return (
        <group {...props} dispose={null}>
            <Furniture paint={studio ? studio.paint : [0, 0]} furniture={studio ? studio.furniture : [0]} bed={studio ? studio.bed : [0]} />
            <CMAreas desk={studio ? studio.desk : []} small={studio ? studio.small : []} large={studio ? studio.large : []} />
            <Shop studio={studio} setStudio={setStudio} items={items || []} />
        </group>
    );
}

useGLTF.preload("/studio.glb");

const Studio = () => {

    const mode = localStorage.getItem('darkMode');

    const orbitControlsRef = useRef(null);

    const studioRef = useRef();

    useEffect(() => {
        document.title = "Studdy | Studio"
    }, [])

    return (
        <div className="studio-container">
            <div className="three-wrapper">
                <Canvas id="three-canvas-container" shadows>
                    <Suspense fallback={<></>}>
                        <StudioComponent ref={studioRef} scale={1.5} position={[-1, 0, -1]} />
                        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
                        <OrbitControls ref={orbitControlsRef} enablePan={false} minDistance={6.0} maxDistance={12} maxAzimuthAngle={Math.PI / 2} minAzimuthAngle={0} maxPolarAngle={Math.PI / 2.5} minPolarAngle={0.5} />
                        <Lights mode={mode} />
                    </Suspense>
                </Canvas >
            </div>
        </div>
    )
}

export default Studio;