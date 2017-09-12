const pg = require('pg'); 
const conString = "tcp://tannaka:tannaka@localhost:5432/tannaka";

const client = new pg.Client(conString);

const userName = process.argv[2];
const insertQuery = `insert into users (name) values ('${userName}')`;
const selectQuery = 'SELECT * FROM users';

client.connect((err) => {
    
    await client.query(insertQuery);
    const result = await client.query(selectQuery);
    result.rows.forEach((row) => {
        console.log(row.name);
    });
    client.end();

    // ver Promise
    // client.query(insertQuery) // insert
    //     .then(() => {
    //         return client.query(selectQuery); // select
    //     })
    //     .then((result) => {
    //         // result.rows.forEach((row) => {
    //         //     console.log(row.name);
    //         // });
    //         // client.end();
    //     });

    // // ver コールバック
    // client.query(insertQuery, (result) => { // insert
    //     client.query(selectQuery, (err, result) => { // select
    //         result.rows.forEach((row) => {
    //             console.log(row.name);
    //         });
    //     });
    // });    
});
