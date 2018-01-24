import React from "react";
import * as actions from "../actions/index";

export default class Triggers extends React.Component {
   render (){
    if( this.props.mode === "edit") {return (
        <div className="triggers">
        <p> Triggers: </p>
        <textarea rows="4" cols="50" placeholder="Use this space to list anything that you think may have triggered the negative thought" onChange={this.props.onChange}>
        {this.props.triggers}
        </textarea>
        </div>
    )}
    else {return (
        <div className="triggers">
        <p> Triggers: 
        {this.props.triggers}
        </p>
        </div>
    )}
}
}
