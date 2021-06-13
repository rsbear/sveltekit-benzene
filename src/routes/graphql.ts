import { makeExecutableSchema } from '@graphql-tools/schema';
import { Benzene, makeHandler, parseGraphQLBody } from '@benzene/http';

const books = [
	{ id: 1, title: 'Introduction to GraphQL', votes: 2 },
	{ id: 2, title: 'Welcome to Meteor', votes: 3 },
	{ id: 3, title: 'Advanced GraphQL', votes: 1 },
	{ id: 4, title: 'Launchpad is Cool', votes: 7 }
];

const typeDefs = `
  type Book {
    id: Int!
    title: String
    votes: Int
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
	Query: {
		books: () => books
	}
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

const GQL = new Benzene({ schema });

const graphqlHTTP = makeHandler(GQL);

const api = async (req, res) => {
	try {
		const result = await graphqlHTTP({
			method: req.method,
			headers: req.headers,
			body: parseGraphQLBody(req.rawBody, req.headers['content-type'])
		});

		return {
			status: result.status,
			body: result.payload,
			headers: result.headers
		};
	} catch (err) {
		console.log('err:', err);
	}
};

export const head = api;
export const get = api;
export const post = api;
export const put = api;
