import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow, toggleFollowingProgress, requestUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
        this.props.handleDrawerClose()
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize)
    };

    render = () => {
        return <>
            {this.props.isFetching ? <Preloader/> : ""}
            <Container maxWidth={'sm'}>
                <Paper style={{backgroundColor: '#eaf1f6'}}>
                    <Users totalUsersCount={this.props.totalUsersCount}
                           pageSize={this.props.pageSize}
                           currentPage={this.props.currentPage}
                           users={this.props.users}
                           onPageChanged={this.onPageChanged}
                           unfollow={this.props.unfollow}
                           follow={this.props.follow}
                           followingInProgress={this.props.followingInProgress}
                    />
                </Paper>
            </Container>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(connect(mapStateToProps,
    {
        toggleFollowingProgress,
        follow,
        unfollow,
        setCurrentPage,
        requestUsers,
    })
)(UsersContainer)