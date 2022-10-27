import React from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import { MdLibraryBooks, MdBedroomChild } from 'react-icons/md'
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5'

import './index.css'

const Menu = () => {

    return (
        <div className='sidebar-container'>
            <div className='sidebar-header'>

            </div>
            <nav className='sidebar'>
                <ul className='sidebar-list'>
                    <li className='sidebar-item'>
                        <a href='/'><BsFillHouseDoorFill className='icon' />Home</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/profile'><FaUserAlt className='icon' />Profile</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/studio'><MdBedroomChild className='icon' />Studio</a>
                    </li>
                    <li className='sidebar-item alt'>
                        <a href='/flashcards'><MdLibraryBooks className='icon' />Decks</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/settings'><IoSettingsSharp className='icon' />Settings</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/sign-out'><IoLogOut className='icon' />Sign Out</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { Menu };