
import {db, Post } from './connectors';
import { pubsub } from './subscriptions';
// create the resolve functions for the available GraphQL queries
export default resolvers = {

    Query: {
        posts(_, args){
            return Post.findAll({where: args});
        },
    },

    Mutation: {
        createPost(_, args){
            let createPost = Post.create({content: args.input.content, views: args.input.views }).then((instance) => {
                pubsub.publish("postChanged", {postChanged: Post.findAll()});
                return instance});
            return  createPost;
        },
        deletePost(_, args){
            let deletePost = Post.destroy({where: {id: args.id}}).then((instance) => {
                pubsub.publish("postChanged", {postChanged: Post.findAll()});
            });
            return deletePost;
        }
    },

    Subscription:{
        postAdded:{
            subscribe: () => pubsub.asyncIterator("postAdded")
        },
        postChanged:{
            subscribe: () => pubsub.asyncIterator("postChanged")
        }
    }
};
