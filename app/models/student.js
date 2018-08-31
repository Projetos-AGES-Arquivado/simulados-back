module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define('student', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profile_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        }
    }, 
    {
        underscored: true
    });

    return Student;
}
