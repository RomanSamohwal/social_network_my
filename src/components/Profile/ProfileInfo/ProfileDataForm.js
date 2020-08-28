import React from 'react';
import {createField, InputType, Textarea} from "../../common/FormsControl/FormsControls";
import {reduxForm} from "redux-form";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControl/FormsControls.module.css";
import SaveIcon from '@material-ui/icons/Save';

const ProfileDataForm = ({handleSubmit, profile,error})=>{
    return (<div className={s.aboutMe}>
        <div>
            <form onSubmit={handleSubmit}>
                {error && <div className={style.formSummaryError}>{error}</div>}
                <div className={s.descriptionBlock}>
                    <b> FullName :</b> {createField("Full Name", "fullName", InputType, [])}
                </div>
                <div className={s.descriptionBlock}><b>Looking for job :</b>
                    {createField("", "lookingForAJob", InputType, [], {type: "checkbox"})}  </div>
                <div>
                  <div className={s.descriptionBlock}><b>My professional skills :</b></div>
                    {createField("My professional skills", "lookingForAJobDescription", Textarea, [])}
                </div>
                <div>
                 <div className={s.descriptionBlock}> <b>About me :</b></div>
                    {createField("About me", "aboutMe", Textarea, [])}
                </div>
                <div className={s.descriptionBlock}>
                    <b> Contacts : </b>{Object.keys(profile.contacts)
                    .map(key => {
                        return <div key={key} className={s.contact}><b>{key}</b>
                            {createField(key, "contacts." + key, InputType, [])}</div>
                    })}
                    <div className={s.descriptionBlock}>
                        <button className={s.button}><SaveIcon color={'primary'}/></button>
                    </div>
                </div>
            </form>
        </div>
    </div>)
};

const ProfileDataReduxForm = reduxForm({form: "redux-form"})(ProfileDataForm);

export default ProfileDataReduxForm;

