import React, { useEffect, useContext } from 'react';
import Axios from 'axios';
import { CircularProgressBar } from "../misc/ProgressBar";

export const UserContext = React.createContext({
    user: {},
    setUser: () => { },
});

const UserInfo = () => {

    const { user, setUser } = useContext(UserContext);

    const xp = (user.xp ? user.xp : 0);
    const level = ~~(Math.pow(xp, 1 / 3) * 0.4);
    const levelProgress = Math.round((Math.pow(xp, 1 / 3) * 0.4 - level) * 100)

    const getUser = async () => {

        try {
            //get logged user
            const response = await Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/loggedUser`, {
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

    return (
        <>
            <CircularProgressBar progress={levelProgress} size={'80px'} progressColor={'var(--palette-color-3)'} progressColor2={'#4D54EB'} progressColor3={'#D270F4'} outerColor={'rgba(119,79,209,0.25)'} innerColor1={'var(--palette-color-2)'} textColor={'var(--main-text-color)'} customText={level} fontSize={'32px'} />
            <label className='user-name'>{user.username}</label>
        </>
    )
}

export { UserInfo }