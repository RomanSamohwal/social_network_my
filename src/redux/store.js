import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";


let store = {
    _state: {

        profilePage: {
            posts: [
                {id: 1, message: "How are you?", likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 2},
                {id: 3, message: "Fuck", likesCount: 56}
            ],

            newPostText: " "
        },
        dialogsPage: {
            messages: [
                {id: 1, message: "Hello"},
                {id: 2, message: "I'm glad to see you"},
                {id: 3, message: "What's up?"}
            ],
            dialogs: [
                {id: 1, name: "Roman"},
                {id: 2, name: "Veronica"},
                {id: 3, name: "Kate"}
            ],

            newMessageBody: ""
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state')
    },
    subscribe(observer) {
        this._callSubscriber = observer;//pattern observer
    },
    dispatch(action) {
      this._state.profilePage =  profileReducer(this._state.profilePage, action);
      this._state.dialogsPage =  dialogsReducer(this._state.dialogsPage, action);
      this._callSubscriber(this._state);
    }
};



window.store = store;
export default store;