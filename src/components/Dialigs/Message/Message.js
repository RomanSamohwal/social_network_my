import React from 'react';
import s from './../Dialogs.module.css';

let postElement = React.createRef();

const Message = (props) => {
    return <div className={s.message}>{props.message}
        <div><textarea rows={3}/>
            <div>
                <button>Send</button>
            </div>
        </div>
    </div>
};


export default Message;
