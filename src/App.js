import React, {Suspense} from 'react';
import './App.css';
import {Route, withRouter, Switch, Redirect, HashRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPages from "./components/login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import PersistentDrawerLeft from './Panel';
import {getNewMessagesCount} from './redux/dialogs-reducer';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
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
         {/*       <div className='app-wrapper-content'>
          <Switch>
              <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
              <Route path='/dialogs/:userId?' render={(props) => <Suspense fallback={<Preloader/>}>
                  <DialogsContainer userId={props.match.params.userId}/>
              </Suspense>}/>
              <Route path='/news' render={() => <News/>}/>
              <Route path='/music' render={() => <Music/>}/>
              <Route path='/users' render={() => <UsersContainer/>}/>
              <Route path='/login' render={() => <LoginPages/>}/>
              <Redirect exact path ={'/'} to={'./profile'} render = {()=><ProfileContainer/>}/>
          </Switch>
                </div>*/}
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