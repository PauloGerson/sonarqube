const Autor = require("../model/Autor");
const Projeto = require("../model/Projeto");
const Avaliacao = require("../model/Avaliacao");
const Avaliador = require("../model/Avaliador");

module.exports = {
  async create(req, res) {
    const { titulo, area, resumo, data_envio, autor_id, avaliador_id } =
      req.body;

    try {
      await Autor.findByPk(autor_id);
    } catch (error) {
      return res.status(400).json({ message: "Informe um autor_id válido" });
    }

    try {
      const projeto = await Projeto.create({
        titulo,
        area,
        resumo,
        data_envio,
        autor_id,
        avaliador_id,
      });
      return res.status(201).json(projeto);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Não foi possível criar este projeto" });
    }
  },

  async getAll(req, res) {
    const projeto = await Projeto.findAll();
    
    if(!projeto){
      return res.status(401).json({message: 'Não há projetos cadastrados.'})
    }else{
      return res.status(200).json(projeto);
    }
  },

  async getOne(req, res) {
    const { id } = req.params;

    const projeto = await Projeto.findOne({ where: { id } });
    if (!projeto) {
      return res.status(404).json({ message: "Projeto não encotrado" });
    }

    return res.status(200).json(projeto);
  },

  async update(req, res) {
    const { id } = req.params;
    const { titulo, area, resumo, data_envio, autor_id, avaliador_id } =
      req.body;

    const projeto = await Projeto.findOne({ where: { id } });
    if (!projeto) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    try {
      await Autor.findByPk(autor_id);
    } catch (error) {
      return res.status(400).json({ message: "Informe um autor_id válido" });
    }

    try {
      const result = await Projeto.update(
        { titulo, area, resumo, data_envio, autor_id, avaliador_id },
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível editar este projeto" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const projeto = await Projeto.findOne({ where: { id } });
    if (!projeto) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }

    try {
      await projeto.destroy({ where: { id } });
      return res.status(200).json({ message: "Projeto removido com sucesso" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível remover este projeto" });
    }
  },

  async getAllAvaliados(req, res) {
    const projetos = await Projeto.findAll({
      include: { model: Avaliacao, as: 'avaliacoes' },
    });
    return res.status(200).json(
      projetos.filter(projeto => projeto.avaliacoes.length > 0)
    );
  },

  async getAllNaoAvaliados(req, res) {
    const projetos = await Projeto.findAll({
      include: [
        { model: Avaliacao, as: 'avaliacoes' }, 
        { model: Autor }
      ],
    });
    return res.status(200).json(
      projetos.filter(projeto => projeto.avaliacoes.length == 0)
    );
  },
};
