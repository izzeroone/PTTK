import Sequelize from 'sequelize';
import Meteor from 'meteor/meteor'
// create the connection
const db = new Sequelize('QLCL', "zerotwo", "002", {
    host: 'localhost',
    dialect: 'mysql'
});

// define the model
const PostModel = db.define('post', {
    content: { type: Sequelize.STRING },
    views: {type: Sequelize.INTEGER}
}, {
    timestamps: false
});

// create the table if it doesn't exist yet

db.sync();

// export Post
const Post = db.models.post;
export {db, Post };
