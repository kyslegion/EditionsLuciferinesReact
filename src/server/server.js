const { Livres, Auteurs, LivresAuteurs} = require('../database/schema.js');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 4000;
app.use(cors());

app.use(express.static('public'));


app.get('/livres', (req, res) => {
  Livres.findAll()
    .then(livres => {
      const livresObjets = livres.map(livre => livre.toJSON());
      res.json(livresObjets);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});
app.get('/livres/:id', (req, res) => {
  const id = req.params.id;

  Livres.findByPk(id)
    .then(livre => {
      if (!livre) {
        return res.status(404).json({ message: 'Livre non trouvé.' });
      }

      res.json(livre.toJSON());
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});
app.get('/auteurs', (req, res) => {
  Auteurs.findAll()
    .then(auteurs => {
      const auteursObjets = auteurs.map(auteur => auteur.toJSON());
      res.json(auteursObjets);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});

app.get('/auteurs/:id', (req, res) => {
  const id = req.params.id;
  Auteurs.findByPk(id)
    .then(auteur => {
      if (!auteur) {
        return res.status(404).json({ message: 'Auteur non trouvé.' });
      }
      res.json(auteur);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});

app.get('/jointure', (req, res) => {
  LivresAuteurs.findAll()
    .then(LivresAuteurs => {
      const livresObjets = LivresAuteurs.map(livre => livre.toJSON());
      res.json(livresObjets);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});
app.get('/jointure/:id', (req, res) => {
  const id = req.params.id;
  LivresAuteurs.findAll({
    where: {
      LivreID: id
    }
  })
    .then(livresAuteurs => {
      const livresAuteursObjets = livresAuteurs.map(livreAuteur => livreAuteur.toJSON());
      res.json(livresAuteursObjets);
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
