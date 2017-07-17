import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Header from '../components/Header';


import * as toasterActions from '../store/Toaster/actions';

export class Favorites extends Component {
    static propTypes = {
        toasterActions: PropTypes.object.isRequired
    };

    render() {
        let favorites = this.props.search.favorites;
        let details;
        if(favorites){
             details = favorites.map((item,index)=>{
            return (<div key={index} className="Favs">
            <p><b>Title:</b>{item.snippet.title}</p>
       <p><b>Channel Name:</b>{item.snippet.channelTitle}</p>
       <p><b>Thumbnail:</b><img src={item.snippet.thumbnails.high.url} height="100" width="120"/></p>
       </div>) });
   }
        return(
            <div id="container--Favorites">
                <Header/>
                <Link to='/'>Back</Link>
                { favorites.length> 0 ? (<div className="favs"><h2>Favorites</h2></div>) : <div className="search">No favorites found. Add some to view them here.</div>}
{details}
            </div>
        )
    }

}

export default connect(
    state => ({
        search: state.search
    }),
    dispatch => ({
        toasterActions: bindActionCreators(toasterActions, dispatch),
    })
)(Favorites);
