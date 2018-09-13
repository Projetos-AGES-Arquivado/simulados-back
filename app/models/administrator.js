module.exports = (sequelize, DataTypes) => {
    const Administrator = sequelize.define('administrator', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        name: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true
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
    },
    {
        underscored: true
    });

    return Administrator;
}
