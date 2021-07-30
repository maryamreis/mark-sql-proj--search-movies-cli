import { question } from "readline-sync";
import { Client } from "pg";
let readlineSync = require('readline-sync')

//As your database is on your local machine, with default port,
//and default username and password,
//we only need to specify the (non-default) database name.
const client = new Client({ database: 'omdb' });
console.log("Welcome to search-movies-cli!");
execute();

async function allow1Query(client: Client){
    
    let userQuery = readlineSync.question("Search for what movie? (or 'q' to quit): ")
    if (userQuery !== 'q'){ 
        const results = await client.query(`SELECT id, name, date, runtime, budget, vote_average, votes_count FROM movies WHERE name LIKE '%${userQuery}%'`)
        console.table(results.rows)
    }
    
    return (userQuery === 'q')

}

async function execute() {
    try {
        await client.connect()
        console.log("Connected successfully.")
        let userChoseQuit: boolean = false
        while (!userChoseQuit) {
            userChoseQuit = await allow1Query(client)
        }
        
    }

    catch(ex) {
        console.log(`Something wrong happened ${ex}`)
    }

    finally {
        await client.end()
        console.log("Client disconnected successfully.")
    }
    

};