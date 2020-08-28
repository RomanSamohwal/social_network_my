import React from 'react';
import styles from "./users.module.css";
import {NavLink} from "react-router-dom";
import Button from '@material-ui/core/Button';
import style from './users.module.css'
import ImageAvatars from '../common/Material_ui/ImageAvatars';
import Avatar from '@material-ui/core/Avatar';

const User = ({user,followingInProgress,unfollow,follow }) => {
        return (
            <div className={style.userContainer}>
          <span>
              <div className={style.userContainer}>
                 <NavLink to={'./profile/' + user.id}>
                     <ImageAvatars avatar = {user.photos.small}/>
                 </NavLink>
              </div>
         <div>
              <div className={style.userContainer}>
                  <div>{user.name}</div><div>{user.status}</div>
              </div>
           <div className={style.userContainer}>
             {user.followed ?
                 <Button variant={'contained'} color={'primary'}
                         disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                     unfollow(user.id);
                 }}>Unfollow</Button> :
                 <Button variant={'contained'} color={'primary'}
                         disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                     follow(user.id);
                 }}>Follow</Button>}
           </div>

             <div className={style.userContainer}>
                     <NavLink to={'./dialogs/' + user.id} style={{textDecoration: 'none'}}>send message</NavLink>
                 </div>
         </div>
          </span>
            </div>)
}


export default User;