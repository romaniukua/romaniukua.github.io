import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    
    return (<header className="header">
                <div className="img-banner">
                    <div className="img-banner__container">
                        <a href="#" className="img-banner__link">#hotdogs</a>
                    </div>
                </div>
                <div className="container">
                    <a href="#" className="burger-nav burger-nav_dark" onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('.menu').classList.toggle('active');
                        }}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14 burger-nav__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                    </a>
                    <nav className="nav">
                        <ul className="menu">
                            <li className="menu__item"><Link to="/" className="menu__link">Menu</Link></li>
                            <li className="menu__item"><Link to="/" className="menu__link">Catering</Link></li>
                            <li className="menu__item"><Link to="/" className="menu__link">About us</Link></li>
                            <li className="menu__item"><Link to="/contact" className="menu__link">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            );
}

export default Header;