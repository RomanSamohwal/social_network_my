import React from 'react';
import Profile from "../Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {



    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('./login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    };

    componentDidMount() {
        this.refreshProfile()
        this.props.handleDrawerClose()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId != prevProps.match.params.userId)
            this.refreshProfile()
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}
                         isOwner = {!this.props.match.params.userId}
                         status = {this.props.status} updateStatus = {this.props.updateStatus}
                         savePhoto = {this.props.savePhoto}
                />

            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

export default compose(connect(
    mapStateToProps,
    {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter)
(ProfileContainer);

