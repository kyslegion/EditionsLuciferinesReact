import React, { useEffect, useState } from 'react';

export default function GetAuthors() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/livres');
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []); // ne s'exécute qu'une fois après le rendu initial

  return (
    <section id="Auteurs">
    <ul>
      {data.map((element) => (
        <li key={element.id || element.Nom} >
          <h3 className='title'>{element.Nom}</h3>
          <img id="Section1" src={"assets/Auteurs/"+ element.Couverture} alt="" />
       </li> 
      ))}
    </ul>
    </section>
  );
}
