import React from "react";
import { User } from "../model/Model";
import { Link } from 'react-router-dom'

export class Navbar extends React.Component<{
    user: User | undefined
}> {

    render() {

        return (
            <div className='navbar'>
                <Link data-testid='home-link' to='/'> Home</Link>
                <Link data-testid='profile-link' to='/profile'> Profile</Link>
                <Link data-testid='spaces-link' to='/spaces'> Spaces</Link>
                <Link to='/reservations'> Reservations</Link>
            </div>
        )
    }
}