import React, {Suspense} from 'react';
import './App.css';
import {withRouter, HashRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import PersistentDrawerLeft from './Panel';
import {getNewMessagesCount} from './redux/dialogs-reducer';
const DialogsContainer = React.lazy(() => import('./components/Dialigs/DialogsContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props.newMessagesCount) {
            setInterval(() => this.props.getNewMessagesCount(), 60000)
        }
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <PersistentDrawerLeft newMessagesCount={this.props.newMessagesCount}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    newMessagesCount: state.dialogsPage.newMessagesCount
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp, getNewMessagesCount: getNewMessagesCount}))(App);

const MainApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
};

export default MainApp;