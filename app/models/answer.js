module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('answer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        participation_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alternative_id: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        time_to_answer: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        underscored: true
    })

    return Answer
}