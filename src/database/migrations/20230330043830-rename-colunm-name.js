'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('autors', 'name', 'nome');
    await queryInterface.addColumn('autors', 'data_nascimento', {
      type: DataTypes.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('autors', 'nome', 'name');
    await queryInterface.removeColumn('autors', 'data_nascimento')
  }
};
