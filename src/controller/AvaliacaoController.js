const { Op } = require("sequelize");
const Avaliacao = require("../model/Avaliacao");
const Avaliador = require("../model/Avaliador");
const Projeto = require("../model/Projeto");

module.exports = {
  async create(req, res) {
    const { nota, parecer, data, projeto_id, avaliador_id } = req.body;

    try {
      await Projeto.findByPk(projeto_id);
      await Avaliador.findByPk(avaliador_id);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Informe um projeto_id e um avaliador_id válido" });
    }

    try {
      const avaliacao = await Avaliacao.create({
        nota,
        parecer,
        data,
        projeto_id,
        avaliador_id,
      });
      return res.status(201).json(avaliacao);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Não foi possível criar este avaliacao" });
    }
  },

  async getAll(req, res) {
    const avaliacao = await Avaliacao.findAll();

    if (avaliacao.length == 0) {
      return res
        .status(401)
        .json({ message: "Não há avaliações cadastrados." });
    } else {
      return res.status(200).json(avaliacao);
    }
  },

  async getOne(req, res) {
    const { id } = req.params;

    const avaliacao = await Avaliacao.findOne({ where: { id } });
    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliação não encotrado" });
    }

    return res.status(200).json(avaliacao);
  },

  async update(req, res) {
    const { id } = req.params;
    const { nota, parecer, data, projeto_id, avaliador_id } = req.body;

    const avaliacao = await Avaliacao.findOne({ where: { id } });
    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliação não encontrado" });
    }

    try {
      await Projeto.findByPk(projeto_id);
      await Avaliador.findByPk(avaliador_id);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Informe um projeto_id e um avaliador_id válido" });
    }

    try {
      const result = await Avaliacao.update(
        { nota, parecer, data, projeto_id, avaliador_id },
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível editar esta avaliação" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const avaliacao = await Avaliacao.findOne({ where: { id } });
    if (!avaliacao) {
      return res.status(404).json({ message: "Avaliação não encontrada" });
    }

    try {
      await avaliacao.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: "Avaliação removida com sucesso" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível remover esta Avaliação" });
    }
  },
};
