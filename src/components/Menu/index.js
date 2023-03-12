import React from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { MdLibraryBooks, MdBedroomChild, MdOutlineDarkMode, MdDarkMode, MdMusicNote, MdMusicOff } from 'react-icons/md'
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5'

import { UserInfo } from '../account/UserInfo';
import './index.css'
import { Link } from 'react-router-dom';

const Menu = ({ setMode, setSound, sound, mode, login }) => {

    return (
        <div className='sidebar-container'>
            {login ? <div className='sidebar-header'>
                <UserInfo />
            </div> : <div></div>}
            {login ? <nav className='sidebar'>
                <ul className='sidebar-list'>
                    <li className={`sidebar-item ${window.location.pathname === '/' ? 'active' : ''}`}>
                        <Link to='/' ><BsFillHouseDoorFill className='icon' />Home</Link>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/profile' ? 'active' : ''}`}>
                        <Link to='/profile'><FaUserAlt className='icon' />Profile</Link>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/studio' ? 'active' : ''}`}>
                        <Link to='/studio'><MdBedroomChild className='icon' />Studio</Link>
                    </li>
                    <li className={`sidebar-item alt ${window.location.pathname === '/decks' ? 'active' : ''}`}>
                        <Link to='/decks'><MdLibraryBooks className='icon' />Decks</Link>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/settings' ? 'active' : ''}`}>
                        <Link to='/settings'><IoSettingsSharp className='icon' />Settings</Link>
                    </li>
                    <li className={`sidebar-item ${window.location.pathname === '/sign-out' ? 'active' : ''}`}>
                        <Link to='/sign-out'><IoLogOut className='icon' />Log Out</Link>
                    </li>
                </ul>
            </nav> : <div></div>}
            <div className='sidebar-footer'>
                <div className='dark-mode-option'>
                    {(mode === 'light'
                        ? <MdOutlineDarkMode className='icon' onClick={e => setMode('dark')} />
                        : <MdDarkMode className='icon' onClick={e => setMode('light')} />)}
                </div>
                <div className='sound-option'>
                    {(sound === true
                        ? <MdMusicNote className='icon' onClick={e => setSound(false)} />
                        : <MdMusicOff className='icon' onClick={e => setSound(true)} />)}
                </div>
            </div>
        </div>
    )
}

export { Menu };