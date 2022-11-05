import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Notfound from './pages/notfound/notfound';
import BuyNft from './pages/Buy NFT/BuyNft';
import Home from './pages/Home/Home';
import Error from './shared/components/error/error';
import Header from './pages/partials/Header';
import Listing from './pages/Listing/listing';
import Favorites from './pages/Favorites/favourites';
import Following from './pages/Following/Following';
import Payouts from './pages/Payouts/payout';
import HoverSidebar from './pages/partials/HoverSidebar';
import { DataContext, DataProvider } from './store/dataContext';
import AuctionDetails from './pages/AuctionDetail/AuctionDetails';
import SalesDetails from './pages/SalesDetail/sales';
import ShowAll from './pages/showAll/showAll';
import Profile from './pages/Profile/Profile';
import React, { useContext, useEffect, useState } from "react";
function App() {



  return (
    <BrowserRouter>
      <DataProvider>
        <Error></Error>




        <Header />
        
            <HoverSidebar />
     
        <Routes>

          <Route path="/"  element={<Home />}></Route>
          <Route path="/showAll/:id" element={<ShowAll />}></Route>
          <Route path="/buy-nft" element={<BuyNft />}></Route>
          <Route path='/listing' element={<Listing></Listing>}></Route>
          <Route path='/favourites' element={<Favorites></Favorites>}></Route>
          <Route path='/following' element={<Following></Following>}></Route>
          <Route path='/payouts' element={<Payouts></Payouts>}></Route>
          <Route path='/auction/:id' element={<AuctionDetails></AuctionDetails>}></Route>
          <Route path='/sales/:id' element={<SalesDetails></SalesDetails>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/collection/:id' element={<Profile></Profile>}></Route>
          <Route path='*' element={<Notfound></Notfound>}></Route>
        </Routes>
      </DataProvider>

    </BrowserRouter>
  )
}

export default App;
