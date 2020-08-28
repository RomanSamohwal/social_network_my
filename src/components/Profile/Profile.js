import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import style from './Profile.module.css'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const Profile = (props) => {
    return (
        <div>
            <div className={style.profile}>
                <div>
                    <ProfileInfo savePhoto={props.savePhoto}
                                 isOwner={props.isOwner}
                                 profile={props.profile}
                                 status={props.status}
                                 updateStatus={props.updateStatus}
                                 saveProfile={props.saveProfile}/>
                </div>
                <div>
                    <Container maxWidth='md' style={{padding: '10px'}} >
                        <Paper style={{backgroundColor: '#eaf1f6'}}><MyPostsContainer/></Paper>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Profile;
