module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
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
    }, {
        underscored: true
    })

    return Profile
}
