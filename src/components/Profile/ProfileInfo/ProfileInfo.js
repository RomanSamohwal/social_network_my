import React, {useState} from 'react';
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataReduxForm from "./ProfileDataForm";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WebIcon from '@material-ui/icons/Web';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const ProfileInfo = ({profile,status,updateStatus, isOwner,savePhoto,saveProfile}) => {
    const classes = useStyles();
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    };
    const onSubmit = (formData) => {
        saveProfile(formData)
        setEditMode(false)
    };

    return (
                <div>
                    <div className={s.content}>
                    </div>
                    <div className={s.descriptionBlock}>
                        <Container maxWidth='md' style={{padding: '10px'}}>
                            <Paper style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#eaf1f6'
                            }}>
                                <img src={profile.photos.large || ""} className={s.mainPhoto}/>
                                {isOwner && <div>
                                    <div className={classes.root}>
                                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={onMainPhotoSelected}/>
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>

                                </div>}
                            </Paper>
                        </Container>
                       <Container maxWidth='md' style={{padding: '10px'}}>
                           <Paper style={{backgroundColor: '#eaf1f6',   color: '#1e2464'}}>
                               <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                           </Paper>
                       </Container>


                        <Container maxWidth= 'md' style={{padding: '10px'}}>
                            <Paper style={{padding: '5px',  display: 'flex',backgroundColor: '#eaf1f6' }}>
                                {editMode
                                    ? <ProfileDataReduxForm profile={profile} onSubmit={onSubmit} initialValues={profile}/>
                                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/>}
                            </Paper>
                        </Container>
                    </div>
                </div>
        );
    };


const Contact = ({contactTitle, contactValue}) => {
    debugger
    if (contactValue !== '') {
        if (contactTitle === 'facebook') {
            contactTitle = <FacebookIcon color={'primary'}/>
        } else if (contactTitle === 'twitter') {
            contactTitle = <TwitterIcon color={'primary'}/>
        } else if (contactTitle === 'website') {
            contactTitle = <WebIcon color={'primary'}/>
        } else if (contactTitle === 'instagram') {
            contactTitle = <InstagramIcon color={'primary'}/>
        } else if (contactTitle === 'youtube') {
            contactTitle = <YouTubeIcon color={'primary'}/>
        } else if (contactTitle === 'github') {
            contactTitle = <GitHubIcon color={'primary'}/>
        } else if (contactTitle === 'vk' || contactTitle === 'mainLink') {
            contactTitle = ''
            contactValue = ''
        }
    }

    return <div className={s.contact}>
        <a href = {`${contactValue}`}>
            {contactValue !== '' && contactTitle}
        </a>
    </div>
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (<div className={s.ProfileInfoContainer}>
        <div className={s.aboutMe}>
            <h2>
                About me
            </h2>
        </div>
        <div className={s.allInformation}>
            <div className={s.generalInformation}>
                <div className={s.capContainer}>
                    <div className={s.cap}>
                        <b>General Information :</b>
                    </div>
                </div>

                <div>
                    <b> FullName : </b> {profile.fullName}</div>
                <div><b>About me : </b>
                    {profile.aboutMe}</div>
                <div><b>Looking for job : </b> {profile.lookingForAJob ? "Yes" : "No"}</div>
                {profile.lookingForAJob && <div>
                    <b>Looking for job a description : </b> {profile.lookingForAJobDescription}</div>}
            </div>
            <div className={s.contactInformation}>
                <div>
                    <div className={s.capContainer}>
                        <div className={s.cap}><b>Contacts : </b>
                        </div>
                    </div>

                    {Object.keys(profile.contacts)
                        .map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>)}
                </div>
            </div>
        </div>
        <div className={s.editButton}>
           <span>
            {isOwner &&
            <div><Fab color="primary" aria-label="edit" onClick={goToEditMode} size="small">
                <EditIcon/>
            </Fab></div>}
        </span>
        </div>
    </div>)
};

export default ProfileInfo;
