'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Modificações de Autor
    await queryInterface.changeColumn('autors', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('autors', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('autors', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.changeColumn('autors', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    // Modificações de Projeto
    await queryInterface.removeColumn('projetos', 'status');
    await queryInterface.addColumn('projetos', 'data_envio', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Criação de Avaliador
    await queryInterface.createTable('avaliadores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
    await queryInterface.addColumn('projetos', 'avaliador_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'avaliadores', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Criação de Evento
    await queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cronograma: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    // Criação de Premio
    await queryInterface.createTable('premios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      projeto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projetos',
          key: 'id'
        }
      },
      evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'eventos',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('premios', {
      type: 'foreign key',
      name: 'premio_projetos_fk',
      fields: ['projeto_id'],
      references: {
        table: 'projetos',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('premios', {
      type: 'foreign key',
      name: 'premio_eventos_fk',
      fields: ['evento_id'],
      references: {
        table: 'eventos',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Criação de Auxiliar
    await queryInterface.createTable('auxiliares', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('autors', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('autors', 'cpf', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('autors', 'created_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('autors', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('projetos', 'status', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
    await queryInterface.removeColumn('projetos', 'avaliador_id');
    await queryInterface.removeColumn('projetos', 'data_envio');

    await queryInterface.removeConstraint('avaliadores', 'avaliador_projetos_fk');
    await queryInterface.dropTable('avaliadores');

    await queryInterface.removeConstraint('premios', 'premio_projetos_fk');
    await queryInterface.removeConstraint('premios', 'premio_eventos_fk');
    await queryInterface.dropTable('premios');
    
    await queryInterface.dropTable('eventos');
    
    await queryInterface.dropTable('auxiliares');
  }
};
