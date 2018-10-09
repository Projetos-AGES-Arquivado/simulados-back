module.exports = (sequelize, DataTypes) => {
    const Participation = sequelize.define('participation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        practise_exam_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        participation_date: {
            type: DataTypes.DATE            
        },        
        time_of_conclusion: {
            type: DataTypes.TIME
        },
        numberOfQuestions: {
            type: DataTypes.INTEGER
        },
        numberOfCorrectAnswers: {
            type: DataTypes.INTEGER
        },
        numberOfWrongAnswers: {
            type: DataTypes.INTEGER
        },
        hitRatio: {
            type: DataTypes.DECIMAL
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

    return Participation
}