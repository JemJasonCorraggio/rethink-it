import React from "react";
import * as actions from "../actions/index";

export default class Rethought extends React.Component {
   render (){
    if( this.props.mode === "edit") {return (
        <div className="rethought">
        <p> Rethought: </p>
        <textarea rows="4" cols="50" placeholder="Use this space to try the stategies above to dial down or change your thought to make it more helpful.
                                                    Don't worry about the new thought being perfect, you can return to this at any time."
                                                    onChange={this.props.onChange}>
        {this.props.rethought}
        </textarea>
        </div>
    )}
    else {return (
        <div className="rethought">
        <p> Rethought: 
        {this.props.rethought}
        </p>
        </div>
    )}
}
}