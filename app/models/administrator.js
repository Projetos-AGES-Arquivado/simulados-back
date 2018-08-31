module.exports = (sequelize, Sequelize) => {
    const Administrator = sequelize.define('administrator', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        }
    }, 
    {
        underscored: true
    });

    return Administrator;
}
