import React, { useState, useEffect, useRef } from 'react';

export default function GestionnaireJson({ Data }) {
    const [auteurs, setAuteurs] = useState([]);
    const [auteurSelected, setAuteurSelected] = useState(null);
    const detailsRef = useRef(null);
    
    useEffect(() => {
        let fetchData = async () => {
            try {
                let response = await fetch(`http://localhost:4000/jointure/${Data.ID}`);
                let jointure = await response.json();
                console.log(jointure);
                
                let auteursPromises = jointure.map(async ({ AuteurID }) => {
                    let response = await fetch(`http://localhost:4000/auteurs/${AuteurID}`);
                    let auteur = await response.json();
                    return auteur;
                });
                
                let auteurs = await Promise.all(auteursPromises);
                auteurs.sort((a, b) => a.PrenomNom.localeCompare(b.PrenomNom));
                setAuteurs(auteurs);
                
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
        fetchData();
    }, [Data.ID]);

    function showAuteursDetails(auteur) {
        setAuteurSelected(auteur);
        detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <ul id='auteurs'>
                {auteurs.map((auteur, index) => (
                    <li key={index} className='auteur'>
                        <div>{auteur.PrenomNom}</div> 
                        <img src={"assets/Auteurs/"+ auteur.Photo} id='photo' onClick={() => showAuteursDetails(auteur)}></img> 
                    </li>
                ))}
            </ul>
            {auteurSelected && 
                <div ref={detailsRef} id="auteursDetails">
                    <ul id='auteurHeader'>
                        <li><img id='photo' src={"assets/Auteurs/"+ auteurSelected.Photo} /></li>
                        <li><h2>{auteurSelected.PrenomNom}</h2> </li>
                    </ul >
                     
                     
                    <div id="auteurBody" >{auteurSelected.Presentation}</div> 
                </div>
            }
        </>
    );
}
