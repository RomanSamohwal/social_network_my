import React from 'react';
import User from "./User";
import BasicPagination from '../common/Material_ui/BasicPaginator';
import style from './users.module.css'


const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, followingInProgress, unfollow,follow, ...props}) => {
    return (
        <div className={style.userContainer}>
            <div>
                <BasicPagination totalItemCount={totalUsersCount} onPageChanged={onPageChanged}/>
            </div>
            <div className={style.userContainer}>
                {users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                                      unfollow={unfollow} follow={follow}/>)}
            </div>
        </div>)
}

export default Users;