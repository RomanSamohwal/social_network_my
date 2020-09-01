import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
/*import React from "react";*/

let state = {
    posts: [
        {id: 1, message: "How are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 2},
        {id: 3, message: "Fuck", likesCount: 56},
        {id: 4, message: "Posssst", likesCount: 56}
    ]
};
test('length of post should be incremented', () => {

    //1 test data
    let action = addPostActionCreator("it-kamasutra.com");
    //2 action
    let newState = profileReducer(state,action);
    //3 expectation
    expect(newState.posts.length).toBe(5)
});

 test('after deleting length of message should be decrement', () => {
   //1 test data
     let action = deletePost(1);
    //2 action
    let newState = profileReducer(state,action);
     //3 expectation
    expect(newState.posts.length).toBe(3)});
