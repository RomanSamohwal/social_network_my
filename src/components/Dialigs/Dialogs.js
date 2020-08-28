import React, {useEffect, useState} from 'react';
import s from './Dialogs.module.css';
import Messages from '../common/MessageBody/Messages';
import Input from '@material-ui/core/Input';
import MessageWithoutIcon from '../common/MessageBody/Message';
import SelectedDialogs from '../common/Material_ui/SelectedDialogs';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonSend from '../common/Material_ui/ButtonSend';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            backgroundColor: '#eaf1f6'
        },
    },
}));

export const Dialogs = (props) =>{

    let history = useHistory();

    useEffect(() => {
            if (!!props.userId) {
                history.push('.')
            }}, [])

    const classes = useStyles();

    let [state, setState] = useState('');

    let sendMessage = () => {
        props.sendMessage(props.selectedDialogId, state)
        setState('')
    }

    let onTextareaHandler = (e) => {
       setState( e.currentTarget.value)
    }

    let message;
    return <div>
        <Container maxWidth='md' style={{padding: '10px'}}>
            <Paper className={classes.root}>
                <div
                    className={s.dialogs}>
                    <div className={s.ChooseDialogs}>
                        <div>
                            <SelectedDialogs dialogs={props.dialogsPage.dialogs}/>
                        </div>
                    </div>
                    {props.userId && <div>
                        <div className={s.messages}>
                            {props.dialogsPage.messages.map(m => {
                                {
                                    message = m.viewed ? s.MessageRecipient : s.MessageRecipient + " " + s.unread
                                }
                                if (m.senderName === props.login) {

                                    return <div key={m.id} className={message}>
                                        <MessageWithoutIcon name={m.senderName} text={m.body}/>
                                    </div>

                                } else {
                                    let user = props.dialogsPage.dialogs.find((d) => {
                                        if (d.id == props.userId) {
                                            return d
                                        }
                                    })
                                    return <div key={m.id} className={s.MessageSender}>
                                        <Messages name={m.senderName} text={m.body} avatar={user.photos.small||user.photos.large}/>
                                    </div>
                                }
                            })}
                        </div>
                        {props.selectedDialogId &&
                        <div className={s.enterMessage}>
                            <div>
                                <Input value={state} rows={3} onChange={(e) =>
                                    onTextareaHandler(e)} placeholder={'     Type of message...'}/>
                                <div className={s.button}>
                                    <ButtonSend sendMessage={sendMessage}/>
                                </div>
                            </div>
                        </div>}
                    </div>}
                </div>
            </Paper>
        </Container>
    </div>
}

