import React from "react";
import Triggers from "./triggers";
import Thought from "./thought";
import Rethought from "./rethought";
import * as actions from "../actions/index";

export default class Form extends React.Component {
   render (){
    if( this.props.mode === "edit") {return (
        <div className="form">
        <Triggers mode="edit" triggers={this.props.triggers} onChange = {this.props.onChangeTriggers} />
        <Thought mode="edit" thought={this.props.thought} onChange = {this.props.onChangeThought} />
        <p>You can use these stategies to help:</p>
        <p>1. Change "shoulds" to "it would be good/nice if" </p>
        <p>2. Remove all-or-nothing thinking by changing words like "always" and "never"</p>
        <p>3. Dial down any catastrophizing</p>
        <p>4. Remind yourself that you don't know for certain what others are thinking</p>
        <p>5. Remind yourself that you also can't know for certain what will happen</p>
        <Rethought mode="edit" rethought={this.props.rethought} onChange = {this.props.onChangeRethought} />
        <button onClick = {this.props.onClickSave} >Save</button>
        </div>
    )}
    else {return (
        <div className="form">
        <Triggers mode="standard" triggers={this.props.triggers} />
        <Thought mode="standard" thought={this.props.thought} />
        <Rethought mode="standard" rethought={this.props.rethought} />
        <button onClick = {this.props.onClickEdit} >Edit</button>
        </div>
    )}
}
}