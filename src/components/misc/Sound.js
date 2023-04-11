import pageFlip1 from '../../assets/sounds/page_flip_1.wav'
import pageFlip2 from '../../assets/sounds/page_flip_2.wav'
import pageFlip3 from '../../assets/sounds/page_flip_3.wav'
import levelUp from '../../assets/sounds/level_up.wav'
import correct from '../../assets/sounds/correct.wav'
import intelligem from '../../assets/sounds/intelligem.mp3'

import ambientRain from '../../assets/sounds/ambient_rain.wav';
import ambientBeach from '../../assets/sounds/ambient_beach.mp3';
import ambientForest from '../../assets/sounds/ambient_forest.mp3';
import ambientCampfire from '../../assets/sounds/ambient_campfire.mp3';
import ambientGuitar from '../../assets/sounds/ambient_guitar.mp3';
import ambientIndie from '../../assets/sounds/ambient_indie.mp3';

import { useEffect, useState, useRef } from 'react'
import { BsFillPlayCircleFill, BsPauseCircleFill, BsFillCloudRainFill } from 'react-icons/bs'
import { FaGuitar, FaTree, FaUmbrellaBeach } from 'react-icons/fa'
import { GiCampfire, GiCoffeeCup } from 'react-icons/gi'

const playSFX = (sound) => {

    const soundMode = localStorage.getItem('sound') ? localStorage.getItem('sound') === "true" : true;

    if (!soundMode) {
        return
    }

    switch (sound) {
        case 'levelUp':
            new Audio(levelUp).play()
            break;
        case 'correct':
            new Audio(correct).play()
            break;
        case 'intelligem':
            new Audio(intelligem).play()
            break;
        case 'pageFlip':
            const random = (Math.random() * 3)
            if (random >= 2) {
                new Audio(pageFlip1).play()
            } else if (random >= 1) {
                new Audio(pageFlip2).play()
            } else {
                new Audio(pageFlip3).play()
            }
        default:

    }

}

const WaveAnimation = ({ size, animate }) => {

    const line = (pos, begin) => {
        return (
            <line x1={pos} y1="30" x2={pos} y2="70" strokeWidth={12} strokeLinecap="round" stroke='var(--main-text-color)'>
                {animate ? <animate attributeName="y1" values="10;30;10" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.7 0.03 0.33 0.99; 0.7 0.03 0.33 0.99" keyTimes="0;0.5;1" begin={begin ? begin : '0s'} fill="freeze" /> : ''}
                {animate ? <animate attributeName="y2" values="90;70;90" dur="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.7 0.03 0.33 0.99; 0.7 0.03 0.33 0.99" keyTimes="0;0.5;1" begin={begin ? begin : '0s'} /> : ''}
            </line>
        )
    }

    return (
        <svg viewBox="0 0 200 100" width={`${size * 2}px`} height={`${size}px`} xmlns="http://www.w3.org/2000/svg">
            {line("10")}
            {line("40", "0.5s")}
            {line("70")}
            {line("100", "0.5s")}
            {line("130")}
            {line("160", "0.5s")}
            {line("190")}
        </svg>
    )
}

const AmbientSound = ({ sound }) => {

    const [ambientPlay, setAmbientPlay] = useState(false)
    const [ambientTrack, setAmbientTrack] = useState(0)
    const ambience = [ambientRain, ambientBeach, ambientCampfire, ambientForest, ambientGuitar, ambientIndie]
    const ambienceIcon = [
        <BsFillCloudRainFill className='icon' style={{ cursor: "pointer" }} onClick={e => updateAmbientTrack()} />,
        <FaUmbrellaBeach className='icon' style={{ cursor: "pointer" }} onClick={e => updateAmbientTrack()} />,
        <GiCampfire className='icon' style={{ cursor: "pointer" }} onClick={e => updateAmbientTrack()} />,
        <FaTree className='icon' style={{ cursor: "pointer" }} onClick={e => updateAmbientTrack()} />,
        <FaGuitar className='icon' style={{ cursor: "pointer" }} onClick={e => updateAmbientTrack()} />,
        <GiCoffeeCup className='icon' style={{ cursor: "pointer" }} onClick={e => updateAmbientTrack()} />,
    ]

    const updateAmbientTrack = () => {
        if (ambientTrack === ambience.length - 1) {
            setAmbientTrack(0)
        } else {
            setAmbientTrack(ambientTrack + 1)
        }
    }

    const ambientRef = useRef()

    const AmbientSoundContainerStyle = {
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: 'var(--main-text-color)',
    }

    useEffect(() => {
        if (ambientPlay && sound) {
            ambientRef.current.play()
        } else if (sound) {
            ambientRef.current.pause()
        }
    }, [ambientPlay, sound, ambientTrack])



    if (sound) {
        return (
            <div className='ambient-sound-container' style={AmbientSoundContainerStyle}>
                {ambientPlay
                    ? <BsPauseCircleFill className='icon' style={{ cursor: "pointer" }} onClick={e => setAmbientPlay(false)} />
                    : <BsFillPlayCircleFill className='icon' style={{ cursor: "pointer" }} onClick={e => setAmbientPlay(true)} />
                }
                <WaveAnimation size={24} animate={ambientPlay} />
                {ambienceIcon[ambientTrack]}
                <audio src={ambience[ambientTrack]} loop ref={ambientRef}></audio>
            </div>
        )
    } else {
        return
    }
}

export { playSFX, AmbientSound }