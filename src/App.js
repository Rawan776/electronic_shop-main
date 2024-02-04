import React from 'react';
import './assets/style.css';
import NavbarOffer from './Components/Navbar_offer';
import Navbar from './Components/Navbar_main';
import HeroSection from './Components/heroSection';
import BrandLogos from './Components/brandLogos';
import NewArrival from './Components/newArrival';
import ShopCollection from './Components/shopCollection';
import BestSeller from './Components/bestSeller';
import BannerSection from './Components/bannerSection';
import ValueSection from './Components/valueSection';
import InstgramSection from './Components/instgramSection';
import Banner2Section from './Components/banner2Section';
import FooterSection from './Components/footerSection';




function App() {
  return (
    <React.Fragment>
      <NavbarOffer />
      <Navbar />
      <HeroSection />
      <BrandLogos />
      <NewArrival />
      <ShopCollection />
      <BestSeller />
      <BannerSection/>
      <ValueSection/>
      <InstgramSection/>
      <Banner2Section/>
      <FooterSection/>
    </React.Fragment>
  );
}

export default App;
