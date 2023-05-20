const {Model, DataTypes} = require('sequelize')
const Autor = require('./Autor')

class Projeto extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      area: DataTypes.STRING,
      resumo: DataTypes.STRING,
      data_envio: DataTypes.DATE,
      autor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Autor,
          key: 'id'
        }
      },
    },{
      sequelize,
      tableName: 'projetos',
    })
  }
  
  static associate(models) {
    this.belongsTo(models.Autor, {foreignKey: 'autor_id'})
    this.hasMany(models.Avaliacao, {
      foreignKey: 'projeto_id', 
      as: 'avaliacoes'
    })
    this.belongsToMany(models.Avaliador, { 
      through: models.Avaliacao, 
      foreignKey: 'avaliador_id'
    })
    this.hasMany(models.Premio, {
      foreignKey: 'projeto_id', 
      as: 'premios'
    })
    this.belongsToMany(models.Evento, { 
      through: models.Premio,
      foreignKeyConstraint: 'evento_id',
      as: 'eventos',
    })
  }
}


module.exports = Projeto