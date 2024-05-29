import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import { Link} from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";

import 'bootstrap/dist/js/bootstrap.bundle';


function Header() {
    return(
              <nav className="navbar navbar-expand-md header">
                <Link to="/">
                  <img className="header__logo" src= {process.env.PUBLIC_URL+ "/images/logo1.png"} alt="background-img" width={144} height={81} />
                </Link>
  
                <div className="header__search"> 
                  <input className="header__searchInput" placeholder="Search.." name="term" type="text" />

                    <button className="search-button" type="submit">
                    <SearchIcon className="header__searchIcon"/>
                    </button>
                </div>
                <div className="header__nav">
                  <div className="header__option">
                  <Link to = "/dashboard" style={{textDecoration: 'none'}}>
                  <button className="btn btn-warning abcd">
                    <div className="header__option">
                      <span className="header__optionLineOne">Dashboard</span>
                    </div>
                    </button>
                  </Link>
                  </div>
                  <div className="header__option">
                  <Link to = "/" style={{textDecoration: 'none'}}>
                  <button className="btn btn-warning abcd">
                    <div className="header__option">
                      <span className="header__optionLineOne">Home</span>
                    </div>
                    </button>
                  </Link>
                  </div>
                </div>
    
 
                
                
            </nav>
    );
}
  
  export default Header;