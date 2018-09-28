module.exports = (sequelize, DataTypes) => {
    const PractiseExam_Questions = sequelize.define('practiseexam_questions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        practise_exam_id: {
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
    },
    {
        underscored: true
    })

    return PractiseExam_Questions
}