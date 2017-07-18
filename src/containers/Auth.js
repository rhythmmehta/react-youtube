import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as authActions from "../store/Auth/actions";

export class Auth extends React.Component{
    static propTypes = {
        auth: PropTypes.object.isRequired,
        authActions: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            email: null,
            pass: null,
            emailRes:null,
            forgot: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout=this.logout.bind(this);
        this.oAuth=this.oAuth.bind(this);
        this.forgotPass=this.forgotPass.bind(this);
    }
    handleChange(evt) {
        let { name, value } = evt.target;

        this.setState({
            [name]: value
        });
    }
handleSubmit() {
    this.props.authActions.login(this.state.email,this.state.pass);
}
logout(){
    this.props.authActions.logoutUser();
}
oAuth(){
    this.props.authActions.googleAuth();
}
forgotPass(){
    if(this.state.emailRes){
    this.props.authActions.getPasswordReset(this.state.emailRes);
}

}
render(){
    let status= this.props.auth.status;
    let forgotPass=this.state.forgot;
    let passReset;
    if(!this.state.forgot){
     passReset=(<div><button name="forgot" value="true" onClick={this.handleChange}>Forgot Password?</button></div>)
    }
    else{
        passReset=(<div id="forgotPass">
        <label htmlFor="emailRes">Enter the email address</label>
        <input type="text" name="emailRes" onChange={this.handleChange}/>
        <button onClick={this.forgotPass}>Send Password Reset</button>
        </div>)
    }
    let reset=this.props.auth.forgot;
    if(reset){
passReset=(<div><button name="forgot" value="true" onClick={this.handleChange}>Forgot Password?</button></div>)
    }
    let authRes;
    if(status=='AUTH_ANONYMOUS')
    {
        authRes=(<div>
            <div id="loginForm">
                <h3>Login with E-mail and Password</h3>
            <label htmlFor="email" >E-mail ID</label>
            <input type="text" name="email" onChange={this.handleChange}/>
            <label htmlFor="pass" >Password</label>
            <input type="password" name="pass" onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div><br/><br/>
        <div id="newUser"><Link to='/signUp'>New User? Sign Up here!</Link></div>
        <br/>
         {passReset}
         <button onClick={this.oAuth}>Log in with Google</button>
     </div>);
 }else if(status=='AUTH_LOGGED_IN'){
        authRes=(<div>
            <span>Logged in as {this.props.auth.username}.</span>
            {" "}<button onClick={this.logout}>Log out</button>
          </div>
        );
    }
    else if(status='AUTH_AWAITING_RESPONSE'){
        authRes=(<div>
            <button disabled>authenticating...</button>
          </div>
        );
    }
    else {
        authRes=(<div>
         <button onClick={this.opAuth}>Log in </button>
     </div>);
    }

    return(<div id="Auth">
    {authRes}

    </div>

    )
}
}

export default connect(
    state=>({
        auth: state.auth
    }),
    dispatch => ({
        authActions:  bindActionCreators(authActions, dispatch)

    })
)(Auth);
