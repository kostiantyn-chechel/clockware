export interface ReviewAttributes {
    id?: number
    review: string
    rating: number
}

module.exports = (sequelize: any, Sequelize: any): ReviewAttributes => {
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