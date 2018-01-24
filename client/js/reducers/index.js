import * as actions from "../actions/index";
import store from "../store";

const blankThought = {mode: "edit", triggers:"", thought: "", rethought: ""};
const initialState = {content: [blankThought], login:false};

export const thoughtReducer = (state=initialState, action) => {
    var thoughts = [];
    var thought = {};
    if(action.type==="CHANGE_MODE"){
        thoughts=[ ...state.content ];
        var OpenEdit=false;
                for (var i=0; i<state.content.length; i++)
        {
            if (state.content[i].mode==="edit"){
                alert("Please save the thought you are working on before starting work on another thought.")
                OpenEdit = true;
            }
        }
        if (state.content[action.index].mode === "edit"){
            thought = { ... thoughts[action.index]};
            thought.mode = "standard";
        }
        else if (!OpenEdit) {
            thought = { ... thoughts[action.index]};
            thought.mode = "edit";
        }
            thoughts[action.index] = thought;
        return {content: thoughts, login: state.login};
    }
     if(action.type==="NEW_THOUGHT"){
        return {content: [...state.content,[blankThought]], login: state.login};
    }
    if(action.type==="FETCH_THOUGHT_LIST"){
        return {content: action.content, login: true};
    }
     if(action.type==="UPDATE_THOUGHT"){
        thoughts=[ ...action.content ];
        thought = { ... thoughts[action.index]};
        thought.mode = "standard";
       thoughts[action.index] = thought;
        return {content: thoughts, login: state.login};
    }

    return state;
};