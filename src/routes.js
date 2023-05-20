const express = require('express')
const AutorController = require('./controller/AutorController')
const AvaliadorController = require('./controller/AvaliadorController')
const AuxiliarController = require('./controller/AuxiliarController')
const ProjetoController = require('./controller/ProjetoController')
const EventoController = require('./controller/EventoController')
const PremioController = require('./controller/PremioController')
const AvaliacaoController = require('./controller/AvaliacaoController')

const routes = express.Router()

// rotas do autor
routes.post('/autor', AutorController.create)
routes.get('/autores', AutorController.getAll)
routes.get('/autor/:id', AutorController.getOne)
routes.put('/autor/:id', AutorController.update)
routes.delete('/autor/:id', AutorController.delete)

// rotas de avaliador
routes.post('/avaliador', AvaliadorController.create)
routes.get('/avaliadores', AvaliadorController.getAll)
routes.get('/avaliador/:id', AvaliadorController.getOne)
routes.put('/avaliador/:id', AvaliadorController.update)
routes.delete('/avaliador/:id', AvaliadorController.delete)

// rotas de auxiliar
routes.post('/auxiliar', AuxiliarController.create)
routes.get('/auxiliares', AuxiliarController.getAll)
routes.get('/auxiliar/:id', AuxiliarController.getOne)
routes.put('/auxiliar/:id', AuxiliarController.update)
routes.delete('/auxiliar/:id', AuxiliarController.delete)

// rotas do projeto
routes.post('/projeto', ProjetoController.create)
routes.get('/projetos', ProjetoController.getAll)
routes.get('/projeto/:id', ProjetoController.getOne)
routes.put('/projeto/:id', ProjetoController.update)
routes.delete('/projeto/:id', ProjetoController.delete)

routes.get('/projetos-avaliados', ProjetoController.getAllAvaliados)
routes.get('/projetos-nao-avaliados', ProjetoController.getAllNaoAvaliados)

// rotas do evento
routes.post('/evento', EventoController.create)
routes.get('/eventos', EventoController.getAll)
routes.get('/evento/:id', EventoController.getOne)
routes.put('/evento/:id', EventoController.update)
routes.delete('/evento/:id', EventoController.delete)
routes.get('/projetos-vencedores', EventoController.getProjetosVencedores)

// rotas do premio
routes.post('/premio', PremioController.create)
routes.get('/premios', PremioController.getAll)
routes.get('/premio/:id', PremioController.getOne)
routes.put('/premio/:id', PremioController.update)
routes.delete('/premio/:id', PremioController.delete)

// rotas do avaliacao
routes.post('/avaliacao', AvaliacaoController.create)
routes.get('/avaliacoes', AvaliacaoController.getAll)
routes.get('/avaliacao/:id', AvaliacaoController.getOne)
routes.put('/avaliacao/:id', AvaliacaoController.update)
routes.delete('/avaliacao/:id', AvaliacaoController.delete)

module.exports = routes;
