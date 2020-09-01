import React from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControl/FormsControls";
import SendIcon from '@material-ui/icons/Send';

const MyPosts = React.memo(props => {

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    };

    let avatar = props.photo ? props.photo.photos.small : ''

    let postsElement = props.posts.map(p =>
        <Post key={p.id} message={p.message} likeCount={p.likesCount} profile={props.profile} avatar={avatar}/>);

    return (
        <div className={s.postsBlock}>
            <PostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    );
});

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.postContainer}>
                <div>
                    <Field component={Textarea} name='newPostText'
                           placeholder='enter your post'/>
                </div>
                <div>
                    <button className={s.button}><SendIcon color={'primary'}/></button>
                </div>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddPostForm);


export default MyPosts;
