'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {


        return await queryInterface.addColumn('Jobs', "selectedApplicationId", {
            allowNull: true,
            type: Sequelize.INTEGER,
            references: {
                model: "Applications",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        })
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface('Jobs', "selectedApplicationId", {})
    }
};