import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


import PrintResults  from '../components/PrintResults'
import * as searchActions from '../store/Search/actions';
import * as toasterActions from '../store/Toaster/actions';

export class VideoSearch extends React.Component{
    static propTypes = {
    toasterActions: PropTypes.object.isRequired,
    searchActions: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};
constructor(){
    super();
    this.state = {
        title: null,
        errors: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
        if(errors == null) {
            await this.props.searchActions.getSearchResults(this.state.title);

            if(this.props.search.message) {
                this.props.toasterActions.show('Sorry no details found ' + this.props.search.message.text);
            }
            else{
                this.props.toasterActions.show('');
            }
        }
    }


validate() {
        let { errors, title, search } = this.state;

        errors = title || search ? null :'Title is required';

        if( !errors ) {
            errors = !/[^a-zA-Z0-9 .-?]/.test(title)? null : 'Please enter a valid title.'
        }

        this.setState({
            'errors': errors
        });
    }

render(){
    let errors = this.state.errors;

    return(<div id="container--VideoSearch">
        <div className="form">
            <pre>
            <label htmlFor="title">Enter the title: </label>
            <input type="text" name="title" onChange={this.handleChange}/>
            <button type="submit" disabled={ this.props.search.isFetching } onClick={this.handleSubmit.bind(this)}> SEARCH</button>

            </pre></div>
        { errors ? <div className="errors">{errors}</div> : null}






{ this.props.search.results ? (<PrintResults results={this.props.search.results}></PrintResults>) : null }
    </div>

    )
}
}
export default connect(
    state=>({
         search: state.search
    }),
    dispatch => ({
        toasterActions: bindActionCreators(toasterActions, dispatch),
        searchActions:  bindActionCreators(searchActions, dispatch)

    })
)(VideoSearch);
