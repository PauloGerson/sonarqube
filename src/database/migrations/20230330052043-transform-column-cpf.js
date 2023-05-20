'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('avaliadores', 'cpf', {
      type: DataTypes.STRING
    });
    await queryInterface.changeColumn('auxiliares', 'cpf', {
      type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('avaliadores', 'cpf', {
      type: DataTypes.INTEGER
    });
    await queryInterface.changeColumn('auxiliares', 'cpf', {
      type: DataTypes.INTEGER
    });
  }
};
