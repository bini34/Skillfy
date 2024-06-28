import React from 'react';
import './NotFoundPage.css';
import image from '../assets/image/404.svg';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import { Navigate } from 'react-router-dom';

export default function NotFoundPage() {
    function sendtohome() {
        Navigate("/");
    }
  return (
    <>
    <Header color={"black"}/>
    <div className="container">
      <div className="grid">
        <img src={image} className="mobileImage" alt="Not Found" />
        <div>
          <h1 className="title">Something is not right...</h1>
          <p className="text">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </p>
          <button className="control" onClick={sendtohome}>Get back to home page</button>
        </div>
        <img src={image} className="desktopImage" alt="Not Found" />
      </div>
    </div>
    <Footer />
    </>
  );
}
