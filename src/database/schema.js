
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: '../database/database.db'
});

const Livres = sequelize.define('Livres', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom: {
    type: DataTypes.STRING
  },
  NomSansEspaces: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Presentation: {
    type: DataTypes.STRING(10000),
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING
  },
  Couverture: {
    type: DataTypes.STRING
  },
  Prix: {
    type: DataTypes.FLOAT
  },
  Genre: {
    type: DataTypes.STRING
  },
  Accroche: {
    type: DataTypes.STRING
  },
  Lien: {
    type: DataTypes.STRING
  },
  Auteur: {
    type: DataTypes.STRING
  },
  Edition: {
    type: DataTypes.STRING
  },
  Quantite: {
    type: DataTypes.INTEGER
  },
  Annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NbPages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Ventes: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Arriere: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Dos: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Livres',
  timestamps: false
});
const Auteurs = sequelize.define('Auteurs', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PrenomNom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Presentation: {
    type: DataTypes.STRING(10000),
    allowNull: true,
  },
  Participations: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Reseaux: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  LivresFavoris: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'Auteurs', 
  timestamps: false, 
});
const LivresAuteurs = sequelize.define('LivresAuteurs', {
  LivreID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Livres',
      key: 'ID'
    }
  },
  AuteurID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Auteurs',
      key: 'ID'
    }
  }
}, {
  tableName: 'LivresAuteurs',
  timestamps: false
});

module.exports = {Livres,Auteurs,LivresAuteurs};

