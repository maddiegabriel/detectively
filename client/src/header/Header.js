import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import logo from './logo.png';

export default class Header extends Component {
    render() {
        return(
            <div id="Header" className="header-overlay">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
                <div className="header-container">
                <center>
                    <div className="header-description">
                        <img id="home-logo" src={logo} alt="logo"/>
                        <p id="home-slogan">search detectively for salary data on public sector high earners across Canada.</p>
                        {/*<div className="header-search">
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <div className="header-page-search-btn">
                                        <button className="btn btn-info btn-sm">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </Grid>
                                <Grid item className="header-search-label">
                                    <TextField label="Search"/>
                                </Grid>
                            </Grid>
                        </div>*/}
                    </div>
                    </center>
                </div>
            </div>
        );
    }
}