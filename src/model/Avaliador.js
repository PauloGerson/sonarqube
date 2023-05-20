const {Model, DataTypes} = require('sequelize')

class Avaliador extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING,
      cpf: DataTypes.INTEGER,
      data_nascimento: DataTypes.DATE
    },{
      sequelize,
      tableName: 'avaliadores',
    })
  }
  static associate(models) {
    this.belongsToMany(models.Projeto, { 
      through: models.Avaliacao, 
      foreignKey: 'projeto_id' 
    })
  }
}

module.exports = Avaliador