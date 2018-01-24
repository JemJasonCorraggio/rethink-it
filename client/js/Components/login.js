import React from 'react';
import * as actions from "../actions/index";


export default class Login extends React.Component {
   render (){ 

    return (
        <div className="login">
        <form>
        <input type="text" placeholder = "Username" value={this.props.username} onChange = {this.props.onChangeUsername} />
        <input type="password"  placeholder = "Password" value={this.props.password} onChange = {this.props.onChangePassword}/>
         </form> 
        </div>
    );
}
}