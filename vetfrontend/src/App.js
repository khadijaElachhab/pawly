import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Si vous avez un fichier CSS personnalisé

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddOwner from "./pages/AddOwner";
import EditOwner from "./pages/EditOwner";
import SearchOwner from "./pages/SearchOwner";
import AddAnimal from "./pages/AddAnimal";
import AddVisit from "./pages/AddVisit";
import Veterinarians from "./pages/Veterinarians";
import OwnerDetails from "./pages/OwnerDetails";
import EditAnimal from "./pages/EditAnimal";
import VeterinariansList from "./components/VeterinariansList";

function App() {
  return (
    <Router>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-owner" element={<AddOwner />} />
            <Route path="/edit-owner/:ownerId" element={<EditOwner />} />
            <Route path="/search-owner" element={<SearchOwner />} />
            <Route path="/add-animal/:ownerId" element={<AddAnimal />} />
            <Route path="/add-visit/:animalId" element={<AddVisit />} />
            <Route path="/veterinarians" element={<Veterinarians />} />
            <Route path="/ownerdetails/:ownerId" element={<OwnerDetails />} />
            <Route path="/edit-animal/:animalId" element={<EditAnimal />} />
            <Route path="/veterinarians-list" element={<VeterinariansList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

