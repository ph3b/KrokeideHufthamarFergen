var sequelize = new Sequelize('messageDb', 'bf0a2c303edb39', 'bcb4eeca', {
  host: 'eu-cdbr-azure-west-d.cloudapp.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
module.exports = sequelize;
