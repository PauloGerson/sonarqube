const {Model, DataTypes} = require('sequelize')

class Evento extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      cronograma: DataTypes.STRING,
      data_inicio: DataTypes.DATE,
      data_fim: DataTypes.DATE,
    },{
      sequelize,
      tableName: 'eventos',
    })
  }
  static associate(models) {
    this.belongsToMany(models.Projeto, { 
      through: models.Premio,
      foreignKeyConstraint: 'projeto_id',
      as: 'projetos'
    })
    this.hasMany(models.Premio, {
      foreignKey: 'evento_id', 
      as: 'premios'
    })
  }
}

module.exports = Evento