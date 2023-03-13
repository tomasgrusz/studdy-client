

export const Lights = () => {

    const mode = localStorage.getItem('darkMode');

    const darkModeLights = <>
        <ambientLight args={["#beb2ff", 0.25]} />
        <pointLight args={["#beb2ff", 1.25, 10, 1]} position={[1.5, 3, 1.5]} castShadow shadow-mapSize-height={4096} shadow-mapSize-width={4096} shadow-bias={-0.0005} />
    </>

    const lightModeLights = <>
        <ambientLight args={["#fff", 0.25]} />
        <pointLight args={["#fff", 1.25, 10, 1]} position={[1.5, 3, 1.5]} castShadow shadow-mapSize-height={4096} shadow-mapSize-width={4096} shadow-bias={-0.0005} />
    </>

    return (
        <>
            {mode === 'light' ? lightModeLights : darkModeLights}
        </>
    )
}