'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('avaliacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parecer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      projeto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projetos',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      avaliador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'avaliadores',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('avaliacoes', ['projeto_id']);
    await queryInterface.addIndex('avaliacoes', ['avaliador_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('avaliacoes');
  },
};
