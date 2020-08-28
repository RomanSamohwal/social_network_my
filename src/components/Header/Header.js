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
                    : <div > <NavLink to={'/login'} className={s.login}>Login</NavLink></div>  }
            </div>
        </header>
    );
}

export default Header;
