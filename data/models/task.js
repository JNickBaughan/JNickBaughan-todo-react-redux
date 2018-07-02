module.exports = function( Sequelize, dataTypes ) {
    return Sequelize.define('task', {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER, 
            autoIncrement: true 
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 200]
            }
        },
        details: {
            type: dataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 1000]
            }
        },
        complete: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
}
