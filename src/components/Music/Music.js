import React, {useEffect} from 'react';

const Music = (props) => {
    useEffect(() => props.handleDrawerClose(), [])
    return (
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}} >
            <h2>in developing...</h2>
        </div>
    );
};

export default Music;
