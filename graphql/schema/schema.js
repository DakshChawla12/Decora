const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
} = require("graphql");

const { Discount, Country } = require("../../models/associations");

// Define Discount Type
const DiscountType = new GraphQLObjectType({
    name: "Discount",
    fields: () => ({
        id: { type: GraphQLID },
        code: { type: GraphQLString },
        percentage: { type: GraphQLFloat },
    }),
});

// Define Country Type
const CountryType = new GraphQLObjectType({
    name: "Country",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Existing queries...
        discounts: {
            type: new GraphQLList(DiscountType),
            resolve() {
                return Discount.findAll();
            },
        },
        discount: {
            type: DiscountType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Discount.findByPk(args.id);
            },
        },
        // New query to validate coupon code
        validateCoupon: {
            type: DiscountType,
            args: { code: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                return Discount.findOne({ where: { code: args.code } });
            },
        },
        // Other queries...
        countries: {
            type: new GraphQLList(CountryType),
            resolve() {
                return Country.findAll();
            },
        },
        country: {
            type: CountryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Country.findByPk(args.id);
            },
        },
    },
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Discount Mutations
        addDiscount: {
            type: new GraphQLList(DiscountType),
            args: {
                code: { type: new GraphQLNonNull(GraphQLString) },
                percentage: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            async resolve(_, args) {
                await Discount.create({
                    code: args.code,
                    percentage: args.percentage,
                });
                return Discount.findAll();
            },
        },
        updateDiscount: {
            type: new GraphQLList(DiscountType),
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                code: { type: GraphQLString },
                percentage: { type: GraphQLFloat },
            },
            async resolve(_, args) {
                await Discount.update(
                    { code: args.code, percentage: args.percentage },
                    { where: { id: args.id } }
                );
                return Discount.findAll();
            },
        },
        deleteDiscount: {
            type: new GraphQLList(DiscountType),
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(_, args) {
                await Discount.destroy({ where: { id: args.id } });
                return Discount.findAll();
            },
        },
        // Country Mutations
        addCountry: {
            type: new GraphQLList(CountryType),
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(_, args) {
                await Country.create({ name: args.name });
                return Country.findAll();
            },
        },
        updateCountry: {
            type: new GraphQLList(CountryType),
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
            },
            async resolve(_, args) {
                await Country.update({ name: args.name }, { where: { id: args.id } });
                return Country.findAll();
            },
        },
        deleteCountry: {
            type: new GraphQLList(CountryType),
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(_, args) {
                await Country.destroy({ where: { id: args.id } });
                return Country.findAll();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});