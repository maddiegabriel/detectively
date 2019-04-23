import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from '../header/Header';
import Search from '../search/Search';
import About from '../about/About';

function NavBar() {
    return (
        <Router>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>

            <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
                <a className="navbar-brand" href="/">
                    <i class="fas fa-search-dollar"></i>
                    detectively
                </a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/search'}>Search</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/about'}>About</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path='/' component={Header} />
                <Route path='/search' component={Search} />
                <Route path='/about' component={About} />
            </Switch>
        </Router>
    );
}

export default NavBar;