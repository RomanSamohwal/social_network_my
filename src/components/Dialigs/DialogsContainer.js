import React from 'react';
import {
    getDialogs,
    getMessages,
    setCurrentDialogSuccess,
    startDialog,
    init, updateDialog, sendMessage
} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {Dialogs} from './Dialogs';


export class DialogsContainer extends React.Component{

    componentDidMount() {
        this.props.init(this.props.userId)
        this.props.handleDrawerClose()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userId !== prevProps.userId) {
            this.props.updateDialog(this.props.userId)
        }
    }

    render() {
        return <>
            <Dialogs {...this.props} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        currentDialogId: state.dialogsPage.dialogs.id,
        newMessagesCount: state.dialogsPage.newMessagesCount,
        selectedDialogId: state.dialogsPage.selectedDialogId,
        currentDialogMessagesCount: state.dialogsPage.currentDialogMessagesCount,
        login: state.auth.login,
        fetching: state.dialogsPage.fetching
    }
};

export default compose(
    connect(mapStateToProps, {
        getDialogs,
        startDialog,
        getMessages,
        setCurrentDialogSuccess,
        init,
        updateDialog,
        sendMessage,
    }),
    withAuthRedirect
)
(DialogsContainer);
