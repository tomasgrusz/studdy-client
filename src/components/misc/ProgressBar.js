import React from 'react'

const ProgressBar = ({ color, progress, height, text, radius }) => {

    const BarStyle = {
        height: height,
        width: '100%',
        backgroundColor: '#dbe4ee',
        borderRadius: radius
    }

    const ProgressStyle = {
        height: '100%',
        width: (text === '0/0') ? '0' : `${progress}%`,
        backgroundColor: color,
        borderRadius: radius,
        textAlign: 'left'
    }

    const TextStyle = {
        color: (progress === 0 || text === '0/0') ? '#120d31' : '#edf6f9',
        marginLeft: '0.5rem'
    }

    return (
        <div className='progress-bar bar' style={BarStyle}>
            <div className='progress-bar progress' style={ProgressStyle}>
                <span className='progress-bar text' style={TextStyle}>{(text === '0/0') ? 'N/A' : text}</span>
            </div>
        </div>
    )
}

export default ProgressBar;