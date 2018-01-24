import React from "react";
import * as actions from "../actions/index";

export default class Thought extends React.Component {
   render (){
    if( this.props.mode === "edit") {return (
        <div className="thought">
        <p> Thought: </p>
        <textarea rows="4" cols="50" placeholder="Record the negative thought you are experiencing here." onChange={this.props.onChange}>
        {this.props.thought}
        </textarea>
        </div>
    )}
    else {return (
        <div className="thought">
        <p> Thought: 
        {this.props.thought}
        </p>
        </div>
    )}
}
}