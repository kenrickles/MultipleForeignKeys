import pg from 'pg';

const { Client } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: process.env.USER, // this will make the user the user of the local computer
  host: 'localhost',
  database: 'museum',
  port: 5432, // Postgres server always runs on this port
};

// create the var we'll use
const client = new Client(pgConnectionConfigs);
// make the connection to the server
client.connect();

let sqlQuery = '';
let values = '';

const mode = process.argv[2];
const GET_ARTISTS = 'get-artists';
const NEW_PAINTING = 'new-painting';
let clientEndCounter = 0;

// create the query done callback
const whenQueryDone = (error, collectionArtistTableResults) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log('error', error);
  } else if (mode === GET_ARTISTS) {
    // rows key has the data
    const firstQueryResult = collectionArtistTableResults.rows;
    firstQueryResult.forEach((element, index) => {
      const targetArtistId = collectionArtistTableResults.rows[index].artist_id;
      sqlQuery = `SELECT * FROM artist where artist.id = ${targetArtistId}`;
      client.query(sqlQuery, (err, artistData) => {
        if (err) {
          throw err;
        } else {
          console.log(`${index + 1}. ${artistData.rows[0].name}`);
          clientEndCounter += 1;
        }
        if (clientEndCounter === firstQueryResult.length) {
          // close the connection
          client.end();
        }
      });
    });
  }
};

// run the SQL query
// client.query(sqlQuery, whenQueryDone);

if (mode === GET_ARTISTS) {
  sqlQuery = `SELECT collections.name, collections.id, paintings.artist_id, paintings.collection_id
  FROM collections
  INNER JOIN paintings
  ON collections.id = paintings.collection_id
  WHERE collections.name = '${process.argv[3]}'`;
  client.query(sqlQuery, whenQueryDone);
} else if (mode === NEW_PAINTING) {
  sqlQuery = `
  INSERT INTO paintings (name, artist_id, collection_id) VALUES ($1, $2, $3)`;
  values = [process.argv[3], process.argv[4], process.argv[5]];
  client.query(sqlQuery, values, whenQueryDone);
}
