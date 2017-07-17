import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PrintResults  from '../containers/PrintResults'
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
        errors: null,
        search: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

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
            await this.props.searchActions.getSearchResults(this.state.title || this.state.search);

            if(this.props.search.message) {
                this.props.toasterActions.show('Sorry no details found ' + this.props.search.message.text);
            }
            else{
                this.props.toasterActions.show('');
            }
        }
    }

     handleNext(){
             let nextToken= this.props.search.results.nextPageToken;
            this.props.searchActions.goToPage(this.state.title || this.state.search,nextToken)
         }
handlePrev(){
    let prevToken=this.props.search.results.prevPageToken;
    this.props.searchActions.goToPage(this.state.title || this.state.search,prevToken)
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
    let alreadySearched;
    let hasSearches=this.props.search.searches.length > 0;
    if(hasSearches) {
        let recentSearches=this.props.search.searches;

                alreadySearched = recentSearches.map((search,index) => {
                return(<option  key ={index} value={search}>{search}</option>)
            });
    }
    let errors = this.state.errors;

    return(<div id="container--VideoSearch">
    <Link to='/favorites'>Go to favorites</Link>
        <div className="form">
            <pre>
            <label htmlFor="title">Enter the title: </label>
            <input type="text" name="title" onChange={this.handleChange}/></pre>
{ hasSearches > 0 ?
        (<div className="dropdown">
            <label htmlFor="search">Recent Searches</label>
            <select name="search" onChange={this.handleChange}>
                <option></option>
                {alreadySearched}
            </select>
        </div>) : null }
<button type="submit" disabled={ this.props.search.isFetching } onClick={this.handleSubmit}> SEARCH</button>
            </div>
        { errors ? <div className="errors">{errors}</div> : null}
<div>
{ this.props.search.results ? (<PrintResults results={this.props.search.results}></PrintResults>) : null }
</div>  <div id="page changes">
{ this.props.search.results && this.props.search.results.prevPageToken ? (<button onClick={this.handlePrev} >Prev Page</button>) : null }
{ this.props.search.results ? (<button onClick={this.handleNext} >Next Page</button>) : null }

</div>
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
