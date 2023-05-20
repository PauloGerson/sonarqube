const Auxiliar = require("../model/Auxiliar");

module.exports = {
  async create(req, res) {
    const { nome, cpf, data_nascimento } = req.body;

    try {
      const auxiliar = await Auxiliar.create({ nome, cpf, data_nascimento });
      return res.status(201).json(auxiliar);
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: "Não foi possível criar este auxiliar" });
    }
  },

  async getAll(req, res) {
    const auxiliar = await Auxiliar.findAll();
    return res.status(200).json(auxiliar);
  },

  async getOne(req, res) {
    const { id } = req.params;

    const auxiliar = await Auxiliar.findOne({ where: { id } });
    if (!auxiliar) {
      return res.status(404).json({ message: "Auxiliar não encotrado" });
    }

    return res.status(200).json(auxiliar);
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, cpf, data_nascimento } = req.body;

    const auxiliar = await Auxiliar.findOne({ where: { id } });
    if (!auxiliar) {
      return res.status(404).json({ message: "Auxiliar não encontrado" });
    }

    try {
      const result = await Auxiliar.update(
        { nome, cpf, data_nascimento },
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível editar este auxiliar'});
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const auxiliar = await Auxiliar.findOne({ where: { id } });
    if (!auxiliar) {
      return res.status(404).json({ message: "Auxiliar não encontrado" });
    } 
  
    try {
      await auxiliar.destroy({ where: { id } });
      return res.status(200).json({ message: "Auxiliar removido com sucesso" });
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível remover este auxiliar'});
    }
  },
};
