import React from 'react';
import Form from './form-container';
import * as actions from "../actions/index";


export default class List extends React.Component {
   render (){ 
       const forms = [];
    for (let i=0; i<this.props.content.length; i++) {
        forms.push(<Form mode={this.props.content[i].mode} 
                        triggers = {this.props.content[i].triggers} 
                        thought = {this.props.content[i].thought} 
                        rethought = {this.props.content[i].rethought}
                        onClickEdit = {(event)=>{event.preventDefault(); this.props.onClickEdit(i);}}
                        onClickSave = {(event)=>{event.preventDefault(); this.props.onClickSave(i);}}
                        onChangeTriggers = {this.props.onChangeTriggers}
                        onChangeThought = {this.props.onChangeThought}
                        onChangeRethought = {this.props.onChangeRethought}/>);
    }
    return (
        <div className="list">
            {forms}
            <button onClick = {(event)=>{event.preventDefault(); this.props.onClickAdd();}} >Add thought</button>
        </div>
    );
}
}