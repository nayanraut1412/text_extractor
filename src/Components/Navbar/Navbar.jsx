import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src={logo} alt="logo" className="img-fluid" />
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Career Opportunities</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Resume Builder</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Find Mentors</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Interview Tips</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Resources
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Career Guides</a></li>
                  <li><a className="dropdown-item" href="#">Skill Development</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Networking</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
