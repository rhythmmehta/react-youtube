import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


export default class PrintResults extends React.Component{
    static propTypes = {
    results: PropTypes.object.isRequired
};
    constructor(){
        super();


    }


render(){
    let results=this.props.results.items;
    let details;
       if(results) {
           details = results.map((item,index)=>{
             return (<div key={index} className="SearchResults">    <p><b>Title:</b>{item.snippet.title}</p>
   <p><b>Channel Name:</b>{item.snippet.channelTitle}</p>
   <p><b>Thumbnail:</b><img src={item.snippet.thumbnails.high.url} height="100" width="120"/></p>

   </div>) });        }
        return(<div>
            {details}
            </div>
        )
    }
}
