const faunadb = require('faunadb'),
      q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const { name, response, timestamp } = data;
  try {
    const result = await client.query(
      q.Create(q.Collection('responses'), { data: { name, response, timestamp } })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify(error) };
  }
};
