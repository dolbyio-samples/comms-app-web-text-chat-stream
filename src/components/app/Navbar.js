import React, { Component } from 'react';
import dolbyioLogo from '../../assets/dolby.io-logo.svg';
import './App.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark py-0">
          <a className="navbar-brand py-0" href="https://dolby.io">
            <img
              src={dolbyioLogo}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="dolby.io"
            />
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
