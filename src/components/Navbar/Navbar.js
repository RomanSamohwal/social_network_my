import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import SettingsIcon from '@material-ui/icons/Settings';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PeopleIcon from '@material-ui/icons/People';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.active}>
                    <ListItem button>
                    <ListItemIcon><PersonIcon/></ListItemIcon>
                    <ListItemText primary={"Profile"}/>
                    </ListItem>
                </NavLink>
            </div>
            <div  className={s.item}>
                <NavLink to= "/dialogs" activeClassName={s.active}>
                    <ListItem button>
                        <ListItemIcon><MailOutlineIcon/></ListItemIcon>
                        <ListItemText primary={"Messages"}/>
                    </ListItem>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to = "/news" activeClassName={s.active}>
                    <ListItem button>
                        <ListItemIcon><AnnouncementIcon/></ListItemIcon>
                        <ListItemText primary={"News"}/>
                    </ListItem>
                </NavLink>
            </div>
            <div  className={s.item}>
                <NavLink to = "/music" activeClassName={s.active}>
                    <ListItem button>
                        <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                        <ListItemText primary={"Music"}/>
                    </ListItem>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to = "/settings" activeClassName={s.active}>
                    <ListItem button>
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText primary={"Settings"}/>
                    </ListItem>
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to = "/users" activeClassName={s.active}>
                    <ListItem button>
                        <ListItemIcon><PeopleIcon/></ListItemIcon>
                        <ListItemText primary={"Users"}/>
                    </ListItem>
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
