import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
//import css leaflet 
import 'leaflet/dist/leaflet.css';

const Events = () => {
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/les_salles_de_cinemas_en_ile-de-france/records?limit=20');
        // Filtering out cinemas without valid geo data
       // const validCinemas = response.data.records.filter(record => record.fields.geo && record.fields.geo.lat && record.fields.geo.lon);
        // setCinemas(validCinemas.map(record => record.fields));
        setCinemas(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des cinémas:', error);
      }
    };

    fetchData();
    console.log(cinemas);
  }, []);

  return (

    <div className=" min-h-screen">
        <Header />
        <MapContainer center={[48.853361, 2.34211]} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cinemas.map((cinema, index) => (
            <Marker
            key={index}
            position={[cinema.geo.lat, cinema.geo.lon]}
            >
            <Popup>
                <strong>{cinema.nom}</strong><br />
                {cinema.adresse}<br />
                Ecrans: {cinema.ecrans}, Fauteuils: {cinema.fauteuils}<br />
                Entrées 2020: {cinema.entrees_2020}
            </Popup>
            </Marker>
        ))}
        </MapContainer>
        <Footer />
    </div>

  );
};

export default Events;
