import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(80),
        },
    },
}));

export default function PaperMessages(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper />
        </div>
    );
}