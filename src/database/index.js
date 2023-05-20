const Sequelize  = require('sequelize')
const dbconfig =  require('../config/database')

const connection = new Sequelize(dbconfig)

const Autor = require('../model/Autor')
const Avaliador = require('../model/Avaliador')
const Projeto = require('../model/Projeto')
const Evento = require('../model/Evento')
const Premio = require('../model/Premio')
const Auxiliar = require('../model/Auxiliar')
const Avaliacao = require('../model/Avaliacao')

Avaliador.init(connection)
Autor.init(connection)
Projeto.init(connection)
Evento.init(connection)
Premio.init(connection)
Auxiliar.init(connection)
Avaliacao.init(connection)

Avaliador.associate(connection.models)
Autor.associate(connection.models)
Projeto.associate(connection.models)
Evento.associate(connection.models)
Premio.associate(connection.models)
Avaliacao.associate(connection.models)

connection.authenticate()
  .catch((error) => { console.error('Unable to connect to the database:', error) })

module.exports = connection;