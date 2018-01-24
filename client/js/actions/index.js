//change mode
//new thought
//fetch thought list
//update thought

/*global localStorage*/
import "isomorphic-fetch";

export const signUp = (username, password, triggers, thought, rethought) => dispatch => {
    const url = `https://learncoding-jemcorraggio.c9users.io/sign-up`;
    return fetch(url, {method: "POST", body: JSON.stringify({username, password, triggers, thought, rethought}), headers: {"Content-Type": "application/json"}})
    .then(res=>res.json())
    .then(res => {
        if(res.message){
            alert(res.message);
        }
        else {
            localStorage.setItem("token", res.token);
            dispatch(fetchThoughtList(res.user.thoughts));
        }
    });
};
export const login = (username, password) => dispatch => {
    const url = `https://learncoding-jemcorraggio.c9users.io/login`;
    return fetch(url, {method: "POST", 
                        body: JSON.stringify({username, password}), 
                        credentials: "same-origin",
                        headers: {"Content-Type": "application/json"
                        }})
    .then(res=>res.json())
    .then(res => {
        if(res.message){
            alert(res.message);
        }
        else {
            localStorage.setItem("token", res.token);
            dispatch(fetchThoughtList(res.data));
        }
    });
};
export const update = (username, triggers, thought, rethought, index) => dispatch => {
    const url = `https://learncoding-jemcorraggio.c9users.io/update`;
    var token = localStorage.getItem("token");
    return fetch(url, {method: "PUT", 
                        body: JSON.stringify({username, triggers, thought, rethought, index}), 
                        credentials: "same-origin",
                        headers: {"Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                        }})
    .then(res=>res.json())
    .then(res => {
        if(res.message){
            alert(res.message);
        }
        else {
            dispatch(updateThought(res.data, index));
        }
    });
};
export const CHANGE_MODE = "CHANGE_MODE";
export const changeMode = (index) => ({
    type: CHANGE_MODE,
    index
});
export const NEW_THOUGHT = "NEW_THOUGHT";
export const newThought = () => ({
    type: NEW_THOUGHT
});
export const FETCH_THOUGHT_LIST = "FETCH_THOUGHT_LIST";
export const fetchThoughtList = (content) => ({
    type: FETCH_THOUGHT_LIST,
    content
});
export const UPDATE_THOUGHT = "UPDATE_THOUGHT";
export const updateThought = (content, index) => ({
    type: UPDATE_THOUGHT,
    content
});

