const graphql = require("graphql");
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Directors.findById(parent.directorId)
            }
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({directorId: parent.id});
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, {id}) {
                return Movies.findById(id)
            }
        },
        director: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, {id}) {
                return Directors.findById(id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Directors.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parrent, {name, age}) {
                const director = new Directors({
                    name,
                    age
                });

                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLID },
                watched: { type: GraphQLBoolean },
                rate: { type: GraphQLString }
            },
            resolve(parrent, {name, genre, directorId, watched, rate}) {
                const movie = new Movies({
                    name,
                    genre,
                    directorId,
                    watched,
                    rate
                });

                return movie.save();
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, {id}) {
                return Directors.findByIdAndRemove(id)
            }
        },
        deleteMovie: {
            type: MovieType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, {id}) {
                return Movies.findByIdAndRemove(id)
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parrent, {id, name, age}) {
                return Directors.findByIdAndUpdate(
                    id,
                    {$set: {name, age}},
                    {new: true}
                )
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLID },
                watched: { type: GraphQLBoolean },
                rate: { type: GraphQLString }
            },
            resolve(parrent, {id, name, genre, directorId, watched, rate}) {
                return Movies.findByIdAndUpdate(
                    id,
                    { $set: {name, genre, directorId, watched, rate }},
                    { new: true }
                )
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});