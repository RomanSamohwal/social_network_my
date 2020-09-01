import React, {useEffect} from 'react';

const News = (props) => {
    useEffect(() => props.handleDrawerClose(), [])
    return (
        <div>
            <h2>in developing</h2>
        </div>
    );
};

export default News;
