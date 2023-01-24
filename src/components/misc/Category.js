import { useEffect } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { ProgressBar } from './ProgressBar';

const Category = ({ category, size }) => {

    const categoryColors = ['#6666', '#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FFBD', '#33EEFF', '#3388FF', '#4433FF', '#7C33FF', '#E233FF']

    const CategoryStyle = {
        height: size,
        width: size,
        backgroundColor: categoryColors[category],
        borderRadius: '50%',
        display: 'inline-block',
        cursor: 'pointer'
    }

    return (
        <span className="category-circle" style={CategoryStyle} ></span>
    )
}

const StarCategory = ({ stage, size, color }) => {

    const stars = () => {
        switch (stage) {
            case 1:
                return <><BsStarFill className='stage-star' style={{ fontSize: size }} /></>
            case 2:
                return <><BsStarFill className='stage-star' style={{ fontSize: size }} /><BsStarFill className='stage-star' style={{ fontSize: size }} /></>
            case 3:
                return <><BsStarFill className='stage-star' style={{ fontSize: size }} /><BsStarFill className='stage-star' style={{ fontSize: size }} /><BsStarFill className='stage-star' style={{ fontSize: size }} /></>
            case 4:
                return <><BsStarFill className='stage-star' style={{ fontSize: size }} /><BsStarFill className='stage-star' style={{ fontSize: size }} /><BsStarFill className='stage-star' style={{ fontSize: size }} /></>
            default:
                return <></>
        }
    }

    const CategoryStyle = {
        height: `calc(${size} + 0.8rem)`,
        width: `calc(${size} * 3 + 1rem)`,
        backgroundColor: `${color ? color : 'var(--palette-color-5)'}`,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: `${stage === 4 ? '1px solid var(--star-color)' : '1px solid transparent'}`,
        filter: `${stage === 4 ? 'drop-shadow(0px 0px 4px var(--star-color))' : ''}`
    }

    return (
        <span className={`category-circle ${stage === 4 ? 'golden' : ''}`} style={CategoryStyle}>
            {stars()}
        </span>
    )
}

const FlashcardStarStats = ({ flashcardStats }) => {

    const StageStatsContainerStyle = {

        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        justifyContent: 'space-around',
        rowGap: 'calc(24px / 6)'

    }

    const StageStatStyle = {
        display: 'flex',
        margin: 0,
        justifyContent: 'space-between',
        columnGap: '0.5rem',
        alignItems: 'center'
    }

    const StageStatStarsStyle = (i) => {
        return {
            display: 'flex',
            width: 'calc(12px * 10)',
            border: `${i === 4 ? '1px solid var(--star-color)' : '1px solid transparent'}`,
            justifyContent: 'center',
            borderRadius: '6px',
            fontSize: '12px'
        }
    }

    const stars = (i) => {
        switch (i) {
            case 1:
                return <span><BsStarFill className="stage-star-deck stage-star" /></span>
            case 2:
                return <span><BsStarFill className="stage-star" /><BsStarFill className="stage-star-deck stage-star" /></span>
            case 3:
            case 4:
                return <span><BsStarFill className="stage-star-deck stage-star" /><BsStarFill className="stage-star-deck stage-star" /><BsStarFill className="stage-star-deck stage-star" /></span>
            default:
                return <></>
        }
    }

    return (
        <div className='stage-stats-container' style={StageStatsContainerStyle}>
            {Array.from({ length: 5 }, (_, i) =>
            (i !== 0
                ? <div className='stage-stat' style={StageStatStyle}>
                    <div className='stage-stat-stars' style={StageStatStarsStyle(i)}>
                        {stars(i)}
                    </div>
                    <ProgressBar progress={Math.round(100 * flashcardStats.slice(i, flashcardStats.length).reduce((y, x) => y = y + x, 0) / flashcardStats.reduce((y, x) => y = y + x + 0.00001))} height={'12px'} color={'var(--star-color)'} radius={'20px'} />
                    <label>{flashcardStats.slice(i, flashcardStats.length).reduce((y, x) => y = y + x, 0)}</label>
                </div>
                : <></>)

            )}
        </div>
    )
}

export { Category, StarCategory, FlashcardStarStats }