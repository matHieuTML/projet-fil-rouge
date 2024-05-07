/*import React from "react";


const Grid = () => {
    const Image1 = "https://www.cinematheque.fr/cache/media/01-films/au-hasard-balthazar-robert-bresson/cr,900,573-q,75-8aa4a7.jpg";
    const Image2 = "https://www.cinematheque.fr/cache/media/neytiri-home-cameron/cr,445,858-q,75-2f4ccd.jpg";
    const Image3 = "https://www.cinematheque.fr/cache/media/nuit-des-musees-2024/cr,440,249-q,75-b8f2f4.jpg";
    const Image4 = "https://www.cinematheque.fr/cache/media/01-films/ce-n-est-pas-un-peche-retro-mae-west/cr,440,249-q,75-af86a3.jpg";
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4">

      <div className="col-span-2 row-span-1 p-4 flex-col items-center justify-center  ">
        <img src={Image1} alt="Image 1" className="w-90 h-auto" />
        <h2 className="text-lg font-semibold">Titre 1</h2>
      </div>

      <div className="col-span-1 row-span-2 p-4 flex-col items-center justify-center ">
        <img src={Image2} alt="Image 2" className="w-auto h-100" />
        <h2 className="text-lg font-semibold">Titre 2</h2>
      </div>

      <div className="col-span-1 row-span-1 p-4 flex-col items-center justify-center">
        <img src={Image3} alt="Image 3" className="w-90 h-auto" />
        <h2 className="text-lg font-semibold">Titre 3</h2>
      </div>

      <div className="col-span-1 row-span-1  p-4 flex-col items-center justify-center">
        <img src={Image4} alt="Image 4" className="w-90 h-auto" />
        <h2 className="text-lg font-semibold">Titre 4</h2>
      </div>
    </div>
  );
};

export default Grid;
*/

import React from "react";

const Grid = () => {
    const Image1 = "https://www.cinematheque.fr/cache/media/01-films/au-hasard-balthazar-robert-bresson/cr,900,573-q,75-8aa4a7.jpg";
    const Image2 = "https://www.cinematheque.fr/cache/media/neytiri-home-cameron/cr,445,858-q,75-2f4ccd.jpg";
    const Image3 = "https://www.cinematheque.fr/cache/media/nuit-des-musees-2024/cr,440,249-q,75-b8f2f4.jpg";
    const Image4 = "https://www.cinematheque.fr/cache/media/01-films/ce-n-est-pas-un-peche-retro-mae-west/cr,440,249-q,75-af86a3.jpg";


    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-1 mt-15 h-50 ">
            {/* Premiere container */}
            <div className="col-span-2 row-span-1 p-4 flex-col items-center justify-center relative overflow-hidden">
                <img src={Image1} alt="Image 1" className="w-90 h-auto transition duration-300 transform hover:scale-105" />
                <h2 className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  transition duration-300 bg-white py-2 px-4 rounded-md shadow-lg hover:opacity-100" style={{ backgroundColor: '#535bf2' }}>
                            FILM SUIVI D'UNE DISCUSSION AVEC ANTOINE COMPAGNON
                            AU HASARD BALTHAZAR (ROBERT BRESSON, 1966)
                            Jeudi 2 mai, 19h30</h2>
            </div>
            {/* Deuxième container */}
            <div className="col-span-1 row-span-2 p-4 flex-col items-center justify-center relative overflow-hidden ">
                <img src={Image2} alt="Image 2" className="w-auto h-100 transition duration-300 transform hover:scale-105" />
                <h2 className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  transition duration-300 bg-white py-2 px-4 rounded-md shadow-lg hover:opacity-100" style={{ backgroundColor: '#535bf2' }}>L'art de James Cameron</h2>
            </div>
            {/* Troisième container */}
            <div className="col-span-1 row-span-1 p-4 flex-col items-center justify-center relative overflow-hidden">
                <img src={Image3} alt="Image 3" className="w-90 h-auto transition duration-300 transform hover:scale-105" />
                <h2 className="text-lg font-semibold absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2  transition duration-300 bg-white py-2 px-4 rounded-md shadow-lg hover:opacity-100" style={{ backgroundColor: '#535bf2' }}>MAE WEST
Du 2 au 10 mai 2024</h2>
            </div>
            {/* Quatrième container */}
            <div className="col-span-1 row-span-1  p-4 flex-col items-center justify-center relative overflow-hidden ">
                <img src={Image4} alt="Image 4" className="w-90 h-auto transition duration-300 transform hover:scale-105" />
                <h2 className="text-lg font-semibold absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2  transition duration-300 bg-white py-2 px-4 rounded-md shadow-lg hover:opacity-100" style={{ backgroundColor: '#535bf2' }}>Nuit des musées 2024</h2>
            </div>
        </div>
    );
};

export default Grid;
