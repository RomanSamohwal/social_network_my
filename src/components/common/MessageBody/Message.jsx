import React from 'react';
import s from "./Message.module.css";

const MessageWithoutIcon = (props) => {
    return <div className={s.wrapper}>
        <div className={s.cloud}>
            <div className={s.cloud}>
                <div className={s.name}>{props.name}</div>
                {props.text}
               {/* <div className={s.time}>
                    time
                </div>*/}
            </div>
        </div>
    </div>
}

export default MessageWithoutIcon;