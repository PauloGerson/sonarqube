'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projetos',{
      id:{  
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
     },

     autor_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'autors', key: 'id'}, // cria uma chave estrangeira.
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
     },

     titulo: {
      type: Sequelize.STRING,
      allowNull: false,
     },

     area: {
      type: Sequelize.STRING,
      allowNull:false,
     },

     resumo:{
      type: Sequelize.STRING,
      allowNull:false,
     },

     status: {
      type: Sequelize.BOOLEAN,
      allowNull:false,
     },

     created_at:{
      type: Sequelize.DATE,
      allowNull: false,
     },
     updated_at:{
      type: Sequelize.DATE,
      allowNull: false,
     }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projetos');
  }
};
