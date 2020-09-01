import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function BasicPagination(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination count={Math.ceil(props.totalItemCount / 10)} color="primary"
                        onChange={(e, value) => props.onPageChanged(value)}/>
        </div>
    );
}