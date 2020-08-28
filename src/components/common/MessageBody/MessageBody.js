import React from 'react';
import s from "./Message.module.css";

const MessageBody = (props) => {
    return <div className={s.wrapper}>
        <div className={s.cloud}>
            <div className={s.cloud}>
                <div className={s.name}>{props.name}</div>
                <div className={s.after}></div>
                {props.text}
                <div className={s.time}>
                    time
                </div>
            </div>
        </div>
    </div>
}

export default MessageBody;