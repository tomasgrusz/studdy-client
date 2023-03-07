

const ToggleSwitch = ({ toggle, toggleFunction }) => {

    const ToggleStyle = {
        display: 'inline-block',
        backgroundColor: `${toggle ? 'var(--palette-color-3)' : 'var(--var-container-color)'}`,
        width: '48px',
        height: '24px',
        borderRadius: '20px',
        cursor: 'pointer',
        margin: '0 6px',
        transition: 'all 0.25s ease-in-out'
    }

    const ToggleCircleStyle = {
        display: 'inline-block',
        margin: '2px',
        backgroundColor: `${toggle ? 'var(--palette-color-1)' : 'var(--var-text-color)'}`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        transition: 'transform 0.25s ease-in-out',
        transform: `${toggle ? 'translateX(24px)' : ''}`
    }

    return (
        <span onClick={e => toggleFunction(!toggle)}>
            <span style={ToggleStyle}>
                <span style={ToggleCircleStyle}></span>
            </span>
        </span>
    )
}

export default ToggleSwitch;