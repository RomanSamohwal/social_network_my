import React from 'react';
import s from "./Message.module.css";
import ImageAvatars from '../Material_ui/ImageAvatars';

const Messages = (props) => {
    return <div className={s.wrapper}>
        <div className={s.before}><ImageAvatars avatar = {props.avatar}/></div>
        <div className={s.cloud}>
            <div className={s.cloud}>
                <div className={s.name}>{props.name}</div>
                {props.text}
                {/*<div className={s.time}>
                    time
                </div>*/}
            </div>

        </div>
    </div>
}

export default Messages;