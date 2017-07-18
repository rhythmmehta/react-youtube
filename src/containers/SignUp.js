import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Header from '../components/Header';

import * as signUpActions from "../store/SignUp/actions";
import * as toasterActions from '../store/Toaster/actions';

export class SignUp extends React.Component{
    static propTypes = {
        signUpActions: PropTypes.object.isRequired,
        toasterActions: PropTypes.object.isRequired
    };
    constructor(props){
        super(props);
        this.state = {
            email: null,
            pass: null,
            confirmPass: null,
            errors: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate=this.validate.bind(this);
    }
        handleChange(evt) {
            let { name, value } = evt.target;

            this.setState({
                [name]: value
            });
        }
    async handleSubmit() {
        let errors = this.state.errors;
        this.validate();
        if(errors!==null) {
            this.props.toasterActions.show(this.state.errors);
    }
    else{
        await this.props.signUpActions.signUp(this.state.email,this.state.pass,this.state.confirmPass);
    }
}
    validate(){
        let errors=this.state.errors;
        if(this.state.email===null)
           errors = 'E-mail is required'
         else if(this.state.pass===null)
           errors = 'Password is required';
         else if(this.state.confirmPass ===null)
           errors ='Please Re-enter Password';

        if( errors===null ) {
            
            errors = this.state.pass.length<=6? null : 'Password must be greater than 6 characters.';
        }
if(errors===null && this.state.pass!== this.state.confirmPass){
    errors='Passwords donot match';
}

        this.setState({
            'errors': errors
        });
    }

    render(){
        let errors = this.state.errors;
        return(<div id="container--SignUp"><Header/>
        <div id="signUpForm">
                <h3>Sign Up with E-mail and Password</h3>
            <label htmlFor="email" >E-mail ID</label>
            <input type="text" name="email" onChange={this.handleChange}/><br/>
            <label htmlFor="pass" >Password</label>
            <input type="password" name="pass" onChange={this.handleChange}/><br/>
            <label htmlFor="confirmPass" > Confirm Password</label>
            <input type="password" name="confirmPass" onChange={this.handleChange}/><br/>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
            <Link to='/'>Login</Link>
            </div>)
        }
    }
    export default connect(
        state=>({

        }),
        dispatch => ({
            toasterActions: bindActionCreators(toasterActions, dispatch),
            signUpActions:  bindActionCreators(signUpActions, dispatch)

        })
    )(SignUp);
