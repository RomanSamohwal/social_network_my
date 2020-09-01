import React, {Suspense} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Navbar from './components/Navbar/Navbar';
import HeaderContainer from './components/Header/HeaderContainer';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import {Redirect, Route, Switch} from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileInfo/ProfileContainer';
import Preloader from './components/common/Preloader/Preloader';
import News from './components/News/News';
import Music from './components/Music/Music';
import UsersContainer from './components/Users/UsersContainer';
import LoginPages from './components/login/Login';
import Settings from './components/Settings/Settings';

const DialogsContainer = React.lazy(() => import('./components/Dialigs/DialogsContainer'));
const Friends = React.lazy(() => import('./components/Friends/Friends'))

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <div style={{
                        display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-between', width: '100%', alignItems: 'center'
                    }}>
                        <div>
                            <Badge badgeContent={props.newMessagesCount} color="secondary">
                                <MailIcon/>
                            </Badge>
                        </div>
                        <div>
                            <HeaderContainer/>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Navbar/>
                </List>
                <Divider/>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                <div className='app-wrapper-content'>
                    <div paragraph='true' style={{width: '100%' , padding: '10px'}}>
                        <Switch>
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer handleDrawerClose={handleDrawerClose}/>}/>
                            <Route path='/dialogs/:userId?' render={(props) => <Suspense fallback={<Preloader/>}>
                                <DialogsContainer userId={props.match.params.userId}
                                                  handleDrawerClose={handleDrawerClose}/>
                            </Suspense>}/>
                            <Route path='/news' render={() => <News handleDrawerClose={handleDrawerClose}/>}/>
                            <Route path='/music' render={() => <Music handleDrawerClose={handleDrawerClose}/>}/>
                            <Route path='/settings' render={() => <Settings handleDrawerClose={handleDrawerClose}/>}/>
                            <Route path='/users' render={() => <UsersContainer handleDrawerClose={handleDrawerClose}/>}/>
                            <Route path='/friends' render={() => <Suspense fallback={<Preloader/>}>
                                <Friends handleDrawerClose={handleDrawerClose}/></Suspense>}/>
                            <Route path='/login' render={() => <LoginPages/>}/>
                            <Redirect exact path={'/'} to={'./profile'}
                                      render={() => <ProfileContainer handleDrawerClose={handleDrawerClose}/>}/>
                        </Switch>
                    </div>
                </div>
            </main>
        </div>
    );
}