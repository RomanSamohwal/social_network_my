import React, {useCallback, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import style from './Friend.module.css'
import {useDispatch, useSelector} from 'react-redux';
import User from '../Users/User';
import {follow, getUserFriend, unfollow} from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';

const Friends = React.memo((props) => {

    useEffect(() => props.handleDrawerClose(), [])

    const dispatch = useDispatch();
    let usersFriend = useSelector(state => state.usersPage.usersFriend)
    let followingInProgress = useSelector(state => state.usersPage.followingInProgress)

    let unfollowHandler = useCallback((id) => {
        dispatch(unfollow(id))
    }, [dispatch])

    let followHandler = useCallback((id) => {
        dispatch(follow(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getUserFriend())
    }, [usersFriend])

    return <div className={style.friendsContainer}>
        <Container  maxWidth={'sm'} >
            <Paper style={{ backgroundColor: '#eaf1f6'}} >
                <>
                    <div className={style.myFriends}>
                        <h3>My Friends</h3>
                    </div>
                    {!!usersFriend ? usersFriend.map(u => {
                        return <User user={u}
                                     key = {u.id}
                                     followingInProgress={followingInProgress}
                                     unfollow={unfollowHandler}
                                     follow={followHandler}/>
                    }) : <Preloader/>}
                </>
            </Paper>
        </Container>
    </div>
});

export default Friends