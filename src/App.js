import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import VideoSearch from './containers/VideoSearch';
import Auth from './containers/Auth';
import Toaster from './components/Toaster';
import Header from './components/Header';
class App extends Component {
    render(){
        let toaster;

        if ( this.props.toaster.visible ) {
            toaster = <Toaster message={ this.props.toaster.message }/>
        }
        return (
            <div className="App">
                <Auth/>
                <Header/>
                { toaster }

                <VideoSearch />
            </div>
        );

        }
    }

    export default connect(
        state => ( {
            'toaster': state.toaster
        } )
    )( App );
