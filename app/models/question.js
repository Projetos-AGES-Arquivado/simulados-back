module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        professor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coordinator_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subarea_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        statement: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            notEmpty: true
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        studyMaterials: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        },
        comment: {
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
    });

    return Question;
}