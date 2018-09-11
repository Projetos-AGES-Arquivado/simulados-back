module.exports = (sequelize, DataTypes) => {
    const Professor = sequelize.define('professor', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true
    });

    return Professor;
}