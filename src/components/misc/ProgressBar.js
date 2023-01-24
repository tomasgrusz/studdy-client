import React, { useEffect, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';

const ProgressBar = ({ color, progress, height, text, radius, completed }) => {

    const [currentProgress, setCurrentProgress] = useState(0)

    //smooth animation with satisfying snapping
    useEffect(() => {
        async function progressAnimation() {
            const offset = Math.abs(Math.round(progress) - Math.round(currentProgress))
            if (currentProgress < progress) {
                await new Promise(res => setTimeout(res, 250 / offset / 10));
                setCurrentProgress(currentProgress + 0.2)
            }
        }
        progressAnimation()
    }, [progress, currentProgress])

    useEffect(() => {
        setCurrentProgress(progress)
    }, [])

    const BarStyle = {
        height: height,
        width: '100%',
        backgroundColor: 'var(--palette-color-6)',
        borderRadius: radius
    }

    const ProgressStyle = {
        height: '100%',
        width: (text === '0/0') ? '0' : `${currentProgress}%`,
        backgroundColor: color,
        borderRadius: radius,
        textAlign: 'left'
    }

    const ProgressStyleCompleted = {
        height: '100%',
        width: '100%',
        backgroundColor: '#f6aa1c',
        borderRadius: radius,
        textAlign: 'center',
    }

    const TextStyle = {
        color: (currentProgress === 0 || text === '0/0') ? '#120d31' : '#edf6f9',
        marginLeft: '0.5rem'
    }

    return (
        <div className='progress-bar bar' style={BarStyle}>
            <div className='progress-bar progress' style={completed ? ProgressStyleCompleted : ProgressStyle}>
                <span className='progress-bar text' style={TextStyle}>{completed ? '' : ((text === '0/0') ? 'N/A' : text)}</span>
            </div>
        </div>
    )
}

const CircularProgressBar = ({ progress, size, progressColor, progressColor2, progressColor3, outerColor, innerColor1, innerColor2, textColor, customText, fontSize, ratio, golden }) => {

    const roundCheck = (number, round) => (isNaN(number) ? 0 : (round ? Math.round(number) : number));

    const [currentProgress, setCurrentProgress] = useState(0)

    //smooth animation with satisfying snapping
    useEffect(() => {
        async function progressAnimation() {
            const offset = Math.abs(Math.round(progress) - Math.round(currentProgress))
            if (currentProgress < progress) {
                await new Promise(res => setTimeout(res, 250 / offset / 10));
                setCurrentProgress(currentProgress + 0.1)
            }
        }
        progressAnimation()
    }, [progress, currentProgress])

    useEffect(() => {
        setCurrentProgress(progress)
    }, [])

    const CircularProgressBarStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${size}`,
        width: `${size}`,
        borderRadius: '50%',
        background: `conic-gradient(${progressColor} 0deg, ${progressColor3 && (roundCheck(currentProgress, false) >= 50) ? `${progressColor3} ${360 * roundCheck(currentProgress, false) / 200}deg,` : ''} ${progressColor2 ? progressColor2 : progressColor} ${360 * roundCheck(currentProgress, false) / 100}deg, ${outerColor} 0deg)`,
        color: textColor,
        fontSize: fontSize,
    }

    const GoldenStyle = {
        background: `conic-gradient(var(--star-color) ${360 * roundCheck(currentProgress, false) / 100}deg, ${outerColor} 0deg)`
    }

    const GoldenStar = {
        fontSize: '48px',
        color: 'var(--star-color)'
    }

    const InnerCircleStyle = {
        position: 'relative',
        height: `calc(${size} * ${ratio ? ratio : 0.75})`,
        width: `calc(${size} * ${ratio ? ratio : 0.75})`,
        borderRadius: '50%',
        backgroundColor: innerColor1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const InnerCircleLayerStyle = {
        position: 'relative',
        height: `calc(${size} * ${ratio ? ratio : 0.75})`,
        width: `calc(${size} * ${ratio ? ratio : 0.75})`,
        borderRadius: '50%',
        backgroundColor: innerColor2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
        border: `${golden ? '1px solid var(--star-color)' : ''}`,
        filter: `${golden ? 'drop-shadow(0px 0px 4px var(--star-color))' : ''}`
    }

    return (
        <div className='circular-progress-bar' style={{ ...CircularProgressBarStyle, ...(golden ? GoldenStyle : {}) }}>
            <span className='inner-circle var-1' style={InnerCircleStyle}>
                <span className='inner-circle var-2' style={InnerCircleLayerStyle}>{golden ? <BsStarFill style={GoldenStar} /> : customText ? customText : `${roundCheck(currentProgress, true)}%`}
                </span>
            </span>
        </div>
    )
}

export { ProgressBar, CircularProgressBar };