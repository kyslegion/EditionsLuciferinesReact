import React, { useEffect, useState } from 'react';

export default function GetBook({changeState}) {
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
  }, []); 

 let changeStateReverse=(element)=>{
  changeState(element)
 }
 
  return (
    <section id="Livres">
      <ul>
        {data.map((element) => (
          <li key={element.id || element.Nom}>
            <img id="Section1" src={"assets/Livres/Face/" + element.Couverture} alt="" onClick={() => changeStateReverse(element)}/>
          </li>
        ))}
      </ul>
    </section>
  );
}
