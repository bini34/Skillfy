import React, { useState, useEffect } from 'react';
import Hero from '../Component/Home/Hero'
import Categories from '../Component/Home/Categories'
import Courses from '../Component/Home/Course'
import Footer from '../Component/Footer/Footer'
import authService from '../Services/authService';
import AuthHero from '../Component/Home/AuthHero'
import Header from '../Component/Header/Header'

export default function HomePage() {
const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
    {!isAuthenticated ? (
      <>
      <Hero/>
      <Categories/>
      <Courses/>
      </>
    ):(
      <>
      <AuthHero/>
      <Courses/>
      <Categories/>
      </>
    )}
      <Footer/>
    </>
  )
}
