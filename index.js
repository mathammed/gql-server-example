const { ApolloServer } = require("apollo-server")
const { rows } = require('./pg')

const schema = `
	type Notion {
		id: Int!
		content: String!
	}

	type Query {
		notions: [Notion!]!
	}

	type Mutation {
		createNotion(content: String!): Notion
	}
`

const SQL_CREATE = `
	insert into notions(content) values ($1)
	returning *
`

const resolvers = {
	Notion: {
		id: (notion) => notion.notion_id,
	},
	Query: {
		notions: async () => await rows('select * from notions'),
	},
	Mutation: {
		createNotion: async (_, args) => {
			const [newNotion] = await rows(SQL_CREATE, args.content)
			return newNotion
		}
	}
}

const server = new ApolloServer({ typeDefs: schema, resolvers})

;(async () => {

	await server.listen(process.env.PORT || 4005)

	console.log('ready')

})()