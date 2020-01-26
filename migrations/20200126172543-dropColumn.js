"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        "Users", 
        "imgLink", 
        {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "Users", //table name
        "imgLink", //column name
        Sequelize.JSONB

        // {
        //   type: Sequelize.STRING
        // }
      )
    ]);
  }
};
