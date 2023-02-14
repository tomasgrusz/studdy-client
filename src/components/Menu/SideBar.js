import { useState, useEffect, useContext, useRef } from 'react';
import { useCountUp } from 'react-countup';
import './SideBar.css'
import { UserContext } from '../account/UserInfo';

const SideBar = () => {

    const { user } = useContext(UserContext);

    const [userCurrency, setUserCurrency] = useState(0)
    const countUpRef = useRef(null);
    const { start, update } = useCountUp({
        ref: countUpRef,
        start: userCurrency,
        end: user.currency,
        delay: 0,
        duration: 2,
        startOnMount: true,
        onUpdate: () => start(),
        onEnd: () => setUserCurrency(user.currency),
    });

    const [userLevel, setUserLevel] = useState(-1)
    const [lvlUpPopup, setLvlUpPopup] = useState(false)

    const LevelUpPopup = () => {

        useEffect(() => {
            const f1 = async () => {
                await new Promise(res => setTimeout(res, 10000));
                await setLvlUpPopup(false)
            }
            f1(setLvlUpPopup)
        }, [])

        return (<label className='level-up-label'>Level Up!</label>)
    }

    const [sidebarPopups, setSidebarPopups] = useState([{
        total: 0,
        new: 0
    }]);

    useEffect(() => {
        setSidebarPopups([...sidebarPopups, {
            totalXP: user.xp,
            newXP: user.xp - (sidebarPopups[sidebarPopups.length - 1]).totalXP,
            totalCurrency: (user.currency) ? user.currency : 0,
            newCurrency: (user.currency) ? user.currency - (sidebarPopups[sidebarPopups.length - 1]).totalCurrency : 0
        }])
        const xp = (user.xp ? user.xp : 0);
        const level = ~~(Math.pow(xp, 1 / 3) * 0.4);
        if (level > userLevel) {
            if (userLevel > 0) {
                setLvlUpPopup(true)
            }
            setUserLevel(level)
        }
    }, [user.xp, user.currency])

    useEffect(() => {
        update(user.currency)
    }, [user.currency])

    return (
        <div className="sidebar-alt-container">
            <div className="currency-container" >
                <span className='currency-icon'></span>
                <div ref={countUpRef} />
            </div>
            <></>
            <div className="activity-container">
                {lvlUpPopup ? <LevelUpPopup setLvlUpPopup={setLvlUpPopup} /> : <></>}
                {sidebarPopups.map((value, i) => {
                    return (sidebarPopups.length - 16 < i && i > 2 && (value.newXP > 0 || value.newCurrency > 0)) ?
                        <div className='sidebar-popup container'>
                            {value.newXP > 0 ? <label className='sidebar-popup' >+{value.newXP} XP</label> : ''}
                            {value.newCurrency > 0 ? <div className='currency-container'>
                                <span className='currency-icon'></span>
                                <label>{value.newCurrency}</label>
                            </div> : ''}
                        </div> : <></>
                })}
            </div>
        </div>
    )
}

export default SideBar;