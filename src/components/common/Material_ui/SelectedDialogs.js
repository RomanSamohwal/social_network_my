import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import {NavLink} from 'react-router-dom';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ListItemText from '@material-ui/core/ListItemText';

function SimpleDialog(props) {

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
            <List>
                {props.dialogs.map(d => (
                    <NavLink key = {d.id} style={{textDecoration: 'none'}} to={`/dialogs/${d.id}`}>
                        <ListItem button onClick={() => handleListItemClick(d.id)} key={d.key}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar src={d.photos.small}>
                                        <PersonIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={d.userName}/>
                            </ListItem>
                            {d.hasNewMessages && <AnnouncementIcon color={'secondary'}/>}
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Dialog>
    );
}

export default function SimpleDialogDemo(props) {


    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(props.dialogs);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <br/>
            <Button variant={'contained'} color="primary" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} dialogs={props.dialogs}/>
        </div>
    );
}