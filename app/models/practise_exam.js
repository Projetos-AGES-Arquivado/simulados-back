module.exports = (sequelize, DataTypes) => {
    const Practise_Exam = sequelize.define('practise_exam', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        aob_exam: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        aob_exam_year: {
            type: DataTypes.INTEGER
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

    return Practise_Exam;
}