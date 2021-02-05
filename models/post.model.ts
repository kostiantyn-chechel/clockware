export interface PostAttributes {
    id?: number
    date: string
    post: string
    photoURL?: string
}

module.exports = (sequelize: any, Sequelize: any): PostAttributes => {
    const Post = sequelize.define('post', {
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        post: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        photoURL: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });

    return Post;
};