module.exports = (sequelize, DataTypes) => {
    const Subarea = sequelize.define('subarea', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
    }, {
        underscored: true
    })

    return Subarea
}