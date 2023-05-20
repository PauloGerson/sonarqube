const Evento = require("../model/Evento");
const Projeto = require("../model/Projeto");
const Premio = require("../model/Premio");
const Avaliacao = require("../model/Avaliacao");

module.exports = {
  async create(req, res) {
    const { nome, descricao, cronograma, data_inicio, data_fim } = req.body;

    try {
      const evento = await Evento.create({ nome, descricao, cronograma, data_inicio, data_fim });
      return res.status(201).json(evento);
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: "Não foi possível criar este evento" });
    }
  },

  async getAll(req, res) {
    const evento = await Evento.findAll();
    return res.status(200).json(evento);
  },

  async getOne(req, res) {
    const { id } = req.params;

    const evento = await Evento.findOne({ where: { id } });
    if (!evento) {
      return res.status(404).json({ message: "Evento não encotrado" });
    }

    return res.status(200).json(evento);
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, descricao, cronograma, data_inicio, data_fim } = req.body;

    const evento = await Evento.findOne({ where: { id } });
    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    try {
      const result = await Evento.update(
        { nome, descricao, cronograma, data_inicio, data_fim },
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível editar este evento'});
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const evento = await Evento.findOne({ where: { id } });
    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    } 
  
    try {
      await evento.destroy({ where: { id } });
      return res.status(200).json({ message: "Evento removido com sucesso" });
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível remover este evento'});
    }
  },

  async getProjetosVencedores(req, res) {
    const eventos = await Evento.findAll({
      include: { 
        model: Projeto,
        as: 'projetos',
        include: {
          model: Avaliacao,
          as: 'avaliacoes',
        },
      }  
    });
    return res.status(200).json(eventos);
  }
};
