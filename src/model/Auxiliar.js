const {Model, DataTypes} = require('sequelize')

class Auxiliar extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf: DataTypes.INTEGER,
      data_nascimento: DataTypes.DATE
    },{
      sequelize,
      tableName: 'auxiliares',
    })
  }
}

module.exports = Auxiliar