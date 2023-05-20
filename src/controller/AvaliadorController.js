const Avaliador = require("../model/Avaliador");

module.exports = {
  async create(req, res) {
    const { nome, cpf, data_nascimento } = req.body;

    try {
      const avaliador = await Avaliador.create({ nome, cpf, data_nascimento });
      return res.status(201).json(avaliador);
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: "Não foi possível criar este avaliador" });
    }
  },

  async getAll(req, res) {
    const avaliador = await Avaliador.findAll();
    return res.status(200).json(avaliador);
  },

  async getOne(req, res) {
    const { id } = req.params;

    const avaliador = await Avaliador.findOne({ where: { id } });
    if (!avaliador) {
      return res.status(404).json({ message: "Avaliador não encotrado" });
    }

    return res.status(200).json(avaliador);
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, data_nascimento } = req.body;

    const avaliador = await Avaliador.findOne({ where: { id } });
    if (!avaliador) {
      return res.status(404).json({ message: "Avaliador não encontrado" });
    }

    try {
      const result = await Avaliador.update(
        { nome, cpf, data_nascimento },
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível editar este avaliador'});
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const avaliador = await Avaliador.findOne({ where: { id } });
    if (!avaliador) {
      return res.status(404).json({ message: "Avaliador não encontrado" });
    } 
  
    try {
      await avaliador.destroy({ where: { id } });
      return res.status(200).json({ message: "Avaliador removido com sucesso" });
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível remover este avaliador'});
    }
  },
};
