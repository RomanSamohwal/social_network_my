import React from 'react';
import s from './Post.module.css'
import ImageAvatars from '../../../common/Material_ui/ImageAvatars';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Post = (props) => {
    return (
        <div className={s.item}>
            <ImageAvatars avatar={props.avatar}/>
            <div style={{color: '#1e2464'}}>{props.message}</div>
            <div>
            <span>
                <FavoriteIcon color={'primary'}/>{props.likeCount}</span>
            </div>
        </div>
    );
};

export default Post;
