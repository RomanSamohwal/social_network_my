import React, {useEffect} from 'react';

const News = (props) => {
    useEffect(() => props.handleDrawerClose(), [])
    return (
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}} >
            <h2>in developing...</h2>
        </div>
    );
};

export default News;
