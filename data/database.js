let sequelize = require('sequelize');
let sequelizeInstance = new sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/dev-api.sqlite'
});

let database = {};
//needed for hooks
//todo: refactor to get rid of circular ref
sequelizeInstance.database = database;

database.tasks = sequelizeInstance.import(__dirname + '/models/task.js');


//a task can have multiple subtasks on it
database.tasks.hasMany(database.tasks, { as: 'parentTask'});

database.sequelize = sequelize;
database.sequelizeInstance = sequelizeInstance;

module.exports = database;
