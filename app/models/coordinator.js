module.exports = (sequelize, DataTypes) => {
    const Coordinator = sequelize.define('coordinator', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        area_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
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
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        }
    }, {
        underscored: true
    });

    return Coordinator;
}