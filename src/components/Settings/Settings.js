import React, {useEffect} from 'react';

const Settings = (props) => {
    useEffect(() => props.handleDrawerClose(), [])
    return (
        <div >
        Settings
        </div>
    );
};

export default Settings;
