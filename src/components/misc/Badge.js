import { BadgeIconResolver } from './BadgeIcons';
import { Portal } from './Portal';
import { usePopper } from 'react-popper'
import { useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';

const starPoints = (pointCount, inner, outer) => {
    const center = Math.max(inner, outer);
    const angle = Math.PI / pointCount;
    let points = [];

    for (let i = 0; i < pointCount * 2; i++) {
        let radius = i & 1 ? inner : outer;
        points.push(center + radius * Math.sin(i * angle));
        points.push(center - radius * Math.cos(i * angle));
    }

    return points;
}

const Badge = ({ stage, size, name, description, progress, id, milestones }) => {

    const IntelligemStyle = ['#F1A9F1', '#97D8D2', '#009586', '#00F9CC', '#E2FFF9']
    const GoldStyle = ['transparent', '#EDAC31', '#FFE34D', '#F1C166', '#FFF1D7']
    const SilverStyle = ['transparent', 'transparent', '#C4C4C4', '#A6A6A6', '#F6F6F6']
    const BronzeStyle = ['transparent', 'transparent', 'transparent', '#CD7A2F', '#FFEEDE']
    const NoStyle = ['transparent', 'transparent', 'transparent', '#7D7D7D', '#9F9F9F']
    const Styles = [NoStyle, BronzeStyle, SilverStyle, GoldStyle, IntelligemStyle]

    const BadgeStyle = stage ? Styles[stage] : Styles[0]

    const stageProgress = [
        ((progress / milestones.bronze) * 100),
        (((progress - milestones.bronze) / milestones.silver) * 100),
        (((progress - milestones.silver) / milestones.gold) * 100),
        (((progress - milestones.gold) / milestones.intelligem) * 100),
        100
    ]

    const stageMilestone = [
        milestones.bronze,
        milestones.silver,
        milestones.gold,
        milestones.intelligem
    ]

    const BadgeContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        height: `calc(${size} * 1.75)`,
        width: `calc(${size} * 1.5)`,
        filter: `drop-shadow(0px 0px ${stage ? stage * 2 : 0}px ${BadgeStyle[(stage ? 4 - stage : 0)]})`,
        cursor: 'pointer'
    }

    const BadgeInfoStyle = {
        marginTop: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
    }

    const BadgeDescriptionStyle = {
        padding: '1rem',
        background: 'var(--var-container-color)',
        borderRadius: '16px'
    }

    const [badgeDescription, setBadgeDescription] = useState(false)
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "bottom" });

    useEffect(() => {
        if (badgeDescription) {
            document.addEventListener('click', e => { if (e.path.filter(elem => elem.className === `badge-container-${id}`).length === 0) { setBadgeDescription(false) } }, true);
        } else {
            document.removeEventListener('click', e => { if (e.path.filter(elem => elem.className === `badge-container-${id}`).length === 0) { setBadgeDescription(false) } }, true);
        };
    }, [badgeDescription]);

    return (
        <div style={BadgeContainerStyle} ref={setReferenceElement} className={`badge-container-${id}`} onClick={e => setBadgeDescription(!badgeDescription)}>
            <svg viewBox={`0 0 200 200`} width={size} >
                <polygon points={starPoints(6, 60, 100)} fill={BadgeStyle[0]} transform="translate(64,-36) rotate(30 0 0)"></polygon>
                <polygon points={starPoints(6, 70, 100)} fill={BadgeStyle[1]} transform="translate(0,0)"></polygon>
                <polygon points={starPoints(18, 77, 85)} fill={BadgeStyle[2]} transform='translate(15,15)'></polygon>
                <circle cx="70" cy="70" r="70" strokeWidth="10" fill={BadgeStyle[4]} stroke={BadgeStyle[3]} transform="translate(30,30)" />
                <BadgeIconResolver id={id} stage={stage} />
            </svg>
            <div style={BadgeInfoStyle}>
                <label>{name}</label>
                <ProgressBar color={Styles[stage][4 - stage]} height={10} progress={stageProgress[stage] <= 100 ? stageProgress[stage] : 100} radius={50} />
                <label>{stage < 4 ? `${progress} / ${stageMilestone[stage]}` : progress}</label>
            </div>
            {badgeDescription ?
                <Portal>
                    <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                        <label style={BadgeDescriptionStyle} >{description}</label>
                    </div>
                </Portal> : ''}
        </div>
    )
}

export { Badge }