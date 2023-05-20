'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn('premios', 'projeto_id', {
      allowNull: true,
      type: DataTypes.INTEGER,
    });

  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('premios', 'projeto_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  }
};
