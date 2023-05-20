const {Model, DataTypes} = require('sequelize')
const Projeto = require('./Projeto')
const Avaliador = require('./Avaliador')

class Avaliacao extends Model {
  static init(sequelize) {
    super.init({
      nota: DataTypes.INTEGER,
      parecer: DataTypes.STRING,
      data: DataTypes.DATE,
      projeto_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Projeto,
          key: 'id',
        }
      },
      avaliador_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Avaliador,
          key: 'id'
        }
      }
    },{
      sequelize,
      tableName: 'avaliacoes',
    })
  }
  static associate(models) {
    this.belongsTo(models.Projeto, {foreignKey: 'projeto_id'})
    this.belongsTo(models.Avaliador, {foreignKey: 'avaliador_id'})
  }
}

module.exports = Avaliacao