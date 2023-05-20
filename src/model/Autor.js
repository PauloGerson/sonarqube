const {Model, DataTypes} = require('sequelize')

class Autor extends Model{
  static init(sequelize){
    super.init({
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
      data_nascimento: DataTypes.DATE
    },{
      sequelize,
      tableName: 'autors',
    })
  }
  static associate(models) {
    this.hasMany(models.Projeto, {
      foreignKey: 'autor_id', 
      as: 'projetos'}
    )
  }
}

module.exports = Autor