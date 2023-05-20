const {Model, DataTypes} = require('sequelize')
const Projeto = require('./Projeto')
const Evento = require('./Evento')

class Premio extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      data: DataTypes.DATE,
      projeto_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Projeto,
          key: 'id'
        }
      },
      evento_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Evento,
          key: 'id'
        }
      }
    },{
      sequelize,
      tableName: 'premios',
    })
  }
  static associate(models) {
    this.belongsTo(models.Projeto, {foreignKey: 'projeto_id'})
    this.belongsTo(models.Evento, {foreignKey: 'evento_id'})
  }
}

module.exports = Premio