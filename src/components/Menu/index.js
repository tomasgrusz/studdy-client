import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaUserAlt } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { MdLibraryBooks, MdBedroomChild, MdOutlineDarkMode, MdDarkMode, MdMusicNote, MdMusicOff } from 'react-icons/md'
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5'

import './index.css'
import { CircularProgressBar } from '../misc/ProgressBar';

const Menu = ({ setMode, mode }) => {

    const [user, setUser] = useState(null);
    const username = (user ? user.username : '');
    const xp = (user ? user.xp : 0);
    const level = (user ? ~~(Math.pow(xp, 1 / 3) * 0.4) : 0);
    const levelProgress = (user ? Math.round((Math.pow(xp, 1 / 3) * 0.4 - level) * 100) : 0)

    const getUser = async () => {
        try {
            //get logged user
            const response = await Axios.get('http://localhost:3001/loggedUser', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains user and no error message
            if (response && response.data.user && response.data.message !== 'Unauthorized') {
                //return the user if we have it
                setUser(response.data.user)
            } else {
                //otherwise return undefined
                return undefined
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const sound = true;

    return (
        <div className='sidebar-container'>
            <div className='sidebar-header'>
                <CircularProgressBar progress={levelProgress} size={'80px'} progressColor={'var(--palette-color-3)'} progressColor2={'#4D54EB'} progressColor3={'#D270F4'} outerColor={'rgba(119,79,209,0.25)'} innerColor1={'var(--palette-color-2)'} textColor={'var(--main-text-color)'} customText={level} fontSize={'32px'} />
                <label className='user-name'>{username}</label>
            </div>
            <nav className='sidebar'>
                <ul className='sidebar-list'>
                    <li className={`sidebar-item ${window.location.pathname === '/' ? 'active' : ''}`}>
                        <a href='/' ><BsFillHouseDoorFill className='icon' />Home</a>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/profile' ? 'active' : ''}`}>
                        <a href='/profile'><FaUserAlt className='icon' />Profile</a>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/studio' ? 'active' : ''}`}>
                        <a href='/studio'><MdBedroomChild className='icon' />Studio</a>
                    </li>
                    <li className={`sidebar-item alt ${window.location.pathname === '/flashcards' ? 'active' : ''}`}>
                        <a href='/flashcards'><MdLibraryBooks className='icon' />Decks</a>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/settings' ? 'active' : ''}`}>
                        <a href='/settings'><IoSettingsSharp className='icon' />Settings</a>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/sign-out' ? 'active' : ''}`}>
                        <a href='/sign-out'><IoLogOut className='icon' />Log Out</a>
                    </li>
                </ul>
            </nav>
            <div className='sidebar-footer'>
                <div className='dark-mode-option'>
                    {(mode === 'light'
                        ? <MdOutlineDarkMode className='icon' onClick={e => setMode('dark')} />
                        : <MdDarkMode className='icon' onClick={e => setMode('light')} />)}
                </div>
                <div className='sound-option'>
                    {(sound === true
                        ? <MdMusicNote className='icon' />
                        : <MdMusicOff className='icon' />)}
                </div>
            </div>
        </div>
    )
}

export { Menu };