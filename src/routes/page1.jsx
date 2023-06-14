import './page1.css'
import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import GetBook from '../component/getBook';
import BookDetails from '../component/BookDetails';
import GestionnaireJson from '../component/gestionnaireJson';



function Page1() {
  const [visible,setVisible]=useState(true);
  const [selectedData, setselectedData] = useState(null); 
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const panierData = localStorage.getItem('panier');
    if (panierData) {
      // setPanier(JSON.parse(panierData));
    }
  }, []);

  let changeState = (selectedData) => {
    setselectedData(selectedData);
    setVisible((prevVisible) => !prevVisible);
  };
  let changeState2 = (selectedData) => {
    setselectedData(null);
    setVisible((prevVisible) => !prevVisible);
  };
  const addToCart = (selectedData) => {
    localStorage.setItem('panier', JSON.stringify(selectedData));
  };
  
  return (
    <Layout changeState2={changeState2}>
      {visible && <GetBook changeState={changeState} />}
      {selectedData && (
        <>
          {<BookDetails Data={selectedData} addToCart={addToCart} changeState={changeState}  />}
          <GestionnaireJson Data={selectedData}  />
        </>
      )}
    </Layout>
    
   
  );
}
export default Page1;