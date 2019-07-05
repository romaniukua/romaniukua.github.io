import React from 'react';
import logo from '../../img/hotdog.svg';

const Banner = () => {
    return (
        <section className="banner">
            <div className="container">
                <div className="banner__content">
                    <img src={logo} alt="hotdog" className="banner__logo"/>
                    <h1 className="banner__title">Dirty Dogs serves all-beef, vegan and vegatagian hot dogs.</h1>
                    <button type="button" className="banner__button button">More Dogs‘n Make Em Hot</button>
                </div>
            </div>
        </section>
    );
}

export default Banner;