import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout=this.logout.bind(this);
        this.oAuth=this.oAuth.bind(this);
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
render(){
    let status= this.props.auth.status;
    let authRes;
    if(status=='AUTH_ANONYMOUS')
    {
        authRes=(<div>
            <div id="loginForm">
                <h3>Login with E-mail and Password</h3>
            <label htmlFor="email" >E-mail ID</label>
            <input type="text" name="email" onChange={this.handleChange}/>
            <label htmlFor="pass" >Password</label>
            <input type="text" name="pass" onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
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
