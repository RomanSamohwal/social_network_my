import React, {useEffect} from 'react';

const News = (props) => {
    useEffect(() => props.handleDrawerClose(), [])
    return (
        <div >
           News
        </div>
    );
};

export default News;
