import React from "react";
import {connect} from "react-redux";
import Login from "./login";
import List from "./list";
import Triggers from "./triggers";
import Thought from "./thought";
import Rethought from "./rethought";
import * as actions from "../actions/index";

export class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            triggers: "",
            thought: "",
            rethought: ""
        };
      this.signUp = this.signUp.bind(this);
      this.login = this.login.bind(this);
      this.changeMode=this.changeMode.bind(this);
      this.update=this.update.bind(this);
      this.add = this.add.bind(this);
    }
    signUp(username, password, triggers, thought, rethought){
        this.props.dispatch(actions.signUp(username, password, triggers, thought, rethought));
    }
    login(username, password){
        this.props.dispatch(actions.login(username, password));
    }
    changeMode(index){
        this.props.dispatch(actions.changeMode(index));
    }
    update (index)
    {
        this.props.dispatch(actions.update(this.state.username, this.state.triggers, this.state.thought, this.state.rethought, index));
    }
    add()
    {
        this.props.dispatch(actions.newThought());
    }
   render (){
       if (!this.props.login){
           return (
        <div className="list-container">
        <p>Log in to retrieve your past work</p>
        <Login username={this.state.username} password={this.state.password} 
        onChangeUsername = {(event)=>{event.preventDefault(); this.setState({username:event.target.value});}}
        onChangePassword = {(event)=>{event.preventDefault(); this.setState({password:event.target.value});}}/>
        <button onClick = {(event)=>{event.preventDefault(); this.login(this.state.username, this.state.password);}}>Login</button>
        <p>Or sign up and start your work with your first thought:
        </p>
        
        <Triggers mode="edit" triggers={this.props.triggers} onChange = {(event)=>{event.preventDefault(); this.setState({triggers: event.target.value});}}/>
        <Thought mode="edit" thought={this.props.thought} onChange = {(event)=>{event.preventDefault(); this.setState({thought: event.target.value});}}/>
        <p>You can use these stategies to help:</p>
        <p>1. Change "shoulds" to "it would be good/nice if" </p>
        <p>2. Remove all-or-nothing thinking by changing words like "always" and "never"</p>
        <p>3. Dial down any catastrophizing</p>
        <p>4. Remind yourself that you don't know for certain what others are thinking</p>
        <p>5. Remind yourself that you also can't know for certain what will happen</p>
        <Rethought mode="edit" rethought={this.props.rethought} onChange = {(event)=>{event.preventDefault(); this.setState({rethought: event.target.value});}}/>
        <p> Choose a username and password. </p>
        <Login username={this.state.username} password={this.state.password} 
        onChangeUsername = {(event)=>{event.preventDefault(); this.setState({username:event.target.value});}}
        onChangePassword = {(event)=>{event.preventDefault(); this.setState({password:event.target.value});}}/>
        <button onClick = {(event)=>{event.preventDefault(); this.signUp(this.state.username, this.state.password, this.state.triggers, this.state.thought, this.state.rethought);}}>Sign Up</button>
        </div>
    );
       }
    else {return (
        <div className="list-container">
        <List content={this.props.content} 
            onClickEdit = {this.changeMode}
            onChangeTriggers = {(event)=>{event.preventDefault(); this.setState({triggers: event.target.value});}}
            onChangeThought = {(event)=>{event.preventDefault(); this.setState({thought: event.target.value});}}
            onChangeRethought = {(event)=>{event.preventDefault(); this.setState({rethought: event.target.value});}}
            onClickSave = {this.update} 
            onClickAdd = {this.add} />
        </div>
    );
    }
}
}
const mapStateToProps = (state, props) => ({
    content: state.content,
    login: state.login
});

export default connect(mapStateToProps)(ListContainer);