const CosmosClient = require("@azure/cosmos").CosmosClient;

const endpoint = "https://thefunkiestapi4.documents.azure.com:443/"
const key = "" // Cosmos DB key here

const client = new CosmosClient({ endpoint, key });

const databaseId = "ScoreDB";
const containerId = "Scores";

const database = client.database(databaseId);
const container = database.container(containerId);


module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    let scoreItem = {
        "name": req.query.name,
        "score": 0
    };

    const { resource: createdItem } = await container.items.create(scoreItem);
    const responseMessage = "Yay! You successfully inserted this item into the database!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}