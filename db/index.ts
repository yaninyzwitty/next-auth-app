import { DataAPIClient } from "@datastax/astra-db-ts";

if(!process.env.ASTRA_API_TOKEN || !process.env.ASTRA_API_ENDPOINT) {
    throw new Error("ASTRA_API_TOKEN and ASTRA_API_ENDPOINT environment variables must be set");

}



// Initialize the client and get a "Db" object

const client = new DataAPIClient(process.env.ASTRA_API_TOKEN, {
    httpOptions: {
        client: 'fetch'
    }
});

export const db = client.db(process.env.ASTRA_API_ENDPOINT, { namespace: "default_keyspace"});