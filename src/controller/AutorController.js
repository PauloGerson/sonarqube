const Autor = require("../model/Autor");
const Projeto = require("../model/Projeto");

module.exports = {
  async create(req, res) {
    const { nome, cpf, data_nascimento } = req.body;

    try {
      const autor = await Autor.create({ nome, cpf, data_nascimento });
      return res.status(201).json(autor);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível criar este autor" });
    }
  },

  async getAll(req, res) {
    const autor = await Autor.findAll({
      include: { model: Projeto, as: Projeto.tableName },
    });
    return res.status(200).json(autor);
  },

  async getOne(req, res) {
    const { id } = req.params;

    const autor = await Autor.findOne({
      where: { id },
      include: { model: Projeto, as: Projeto.tableName },
    });
    if (!autor) {
      return res.status(404).json({ message: "Autor não encotrado" });
    }

    return res.status(200).json(autor);
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, data_nascimento } = req.body;

    const autor = await Autor.findOne({ where: { id } });
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    try {
      const result = await Autor.update(
        { nome, cpf, data_nascimento },
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível editar este autor" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const autor = await Autor.findOne({ where: { id } });
    if (!autor) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    try {
      await autor.destroy({ where: { id } });
      return res.status(200).json({ message: "Autor removido com sucesso" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível remover este autor" });
    }
  },
};
