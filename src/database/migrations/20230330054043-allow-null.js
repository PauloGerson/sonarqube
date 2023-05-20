'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn('projetos', 'avaliador_id', {
      allowNull: true,
      type: DataTypes.INTEGER,
    });
  },

  async down (queryInterface) {
    await queryInterface.changeColumn('projetos', 'avaliador_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  }
};
