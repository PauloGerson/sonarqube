const Premio = require('../model/Premio') 
const Projeto = require('../model/Projeto') 
const Evento = require('../model/Evento');

module.exports =  {
  async create(req,res){
    const {nome, descricao, data, projeto_id, evento_id} = req.body;

    try {
      await Projeto.findByPk(projeto_id);
      await Evento.findByPk(evento_id);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Informe um projeto_id e um evento_id válidos" });
    }
    
    try {
      const premio = await Premio.create({nome, descricao, data, projeto_id, evento_id});
      return res.status(201).json(premio);
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ message: "Não foi possível criar este premio" });
    }
  },

  async getAll(req, res) {
    const premio = await Premio.findAll();
    return res.status(200).json(premio);
  },

  async getOne(req, res) {
    const { id } = req.params;

    const premio = await Premio.findOne({ where: { id } });
    if (!premio) {
      return res.status(404).json({ message: "Premio não encotrado" });
    }

    return res.status(200).json(premio);
  },

  async update(req, res) {
    const { id } = req.params;
    const {nome, descricao, data, projeto_id, evento_id} = req.body;

    const premio = await Premio.findOne({ where: { id } });
    if (!premio) {
      return res.status(404).json({ message: "Premio não encontrado" });
    }

    try {
      await Projeto.findByPk(projeto_id);
      await Evento.findByPk(evento_id);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Informe um projeto_id e um evento_id válidos" });
    }

    try {
      const result = await Premio.update(
        {nome, descricao, data, projeto_id, evento_id},
        { where: { id } }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível editar este premio'});
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    const premio = await Premio.findOne({ where: { id } });
    if (!premio) {
      return res.status(404).json({ message: "Premio não encontrado" });
    } 
  
    try {
      await premio.destroy({ where: { id } });
      return res.status(200).json({ message: "Premio removido com sucesso" });
    } catch (error) {
      return res.status(400).json({message: 'Não foi possível remover este premio'});
    }
  },
}

