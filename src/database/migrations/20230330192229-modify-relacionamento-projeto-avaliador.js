'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('projetos', 'avaliador_id')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createColumn('projetos', 'avaliador_id', {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Avaliador,
        key: 'id'
      }
    })
  }
};
