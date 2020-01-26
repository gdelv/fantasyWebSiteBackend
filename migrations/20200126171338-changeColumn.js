'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 
  'password_digest', 'imgLink');
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'imgLink', 'password_digest');
 }
};
