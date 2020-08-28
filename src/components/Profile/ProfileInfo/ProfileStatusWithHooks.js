import React, {useEffect, useState} from 'react';


const ProfileStatusWithHooks =(props)=> {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status)
    },[props.status]);


    let activateMode = () => {
        setEditMode(true)
    };

  let  deactivateMode = () => {
       setEditMode(false)
       props.updateStatus(status)
    };

   let  onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'center', width: '100%', alignItems: 'center'
        }}>
            <div>
                {!editMode &&
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '5px' }}>
                    <span  onDoubleClick={activateMode} >{ <span><h2> {props.status} </h2></span> || '----------'}</span>
                </div>
                }
            </div>
            <div>
                {editMode &&
                <div>
                    <input  onChange={onStatusChange} autoFocus={true} onBlur={deactivateMode}
                            value={status}/>
                </div>
                }
            </div>
        </div>
    );
}

export default ProfileStatusWithHooks;
