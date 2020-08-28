import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button';

const Header = (props) => {
    return (
        <header className={s.header}>

            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div> <Button variant="text" color="inherit" onClick={props.Logout}>Log out</Button> </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;

/*{props.login}-*/