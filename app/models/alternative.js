module.exports = (sequelize, DataTypes) => {
    const Alternative = sequelize.define('alternative', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        professor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            notEmpty: true
        },
        correct: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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

    return Alternative
}