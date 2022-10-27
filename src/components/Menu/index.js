import React from 'react';

import './index.css'

const Menu = () => {

    return (
        <div className='sidebar-container'>
            <nav className='sidebar'>
                <ul className='sidebar-list'>
                    <li className='sidebar-item'>
                        <a href='/'>Home</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/profile'>Profile</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/studio'>Studio</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/flashcards'>Flashcards</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/settings'>Settings</a>
                    </li>
                    <li className='sidebar-item'>
                        <a href='/sign-out'>Sign Out</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export { Menu };