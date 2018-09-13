module.exports = (sequelize, DataTypes) => {
    const Professor_Subareas = sequelize.define('professor_subareas', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        professor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        subarea_id: {
            type: DataTypes.INTEGER,
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
    });

    return Professor_Subareas;
}