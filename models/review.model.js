module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('review', {
        review: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return Review;
};