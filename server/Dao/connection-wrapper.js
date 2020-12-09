let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const mysql = require("mysql2");


// Connection = קו תקשורת למסד הנתונים
const dbConfig = {
    host: "us-cdbr-east-02.cleardb.com", // Computer
    user: "b9af95df61006a", // Username
    password: "24865d83", // Password
    database: "heroku_6ab77aa20d18202" // Database name
};

// const dbConfig = {
//     host: "localhost", // Computer
//     user: "root", // Username
//     password: "motisql2020", // Password
//     database: "toursTag" // Database name

// }
// Connect to the database: 
// connection.connect(err => {
//     if (err) {
//        console.log("Failed to create connection + " + err);
//        return;
//    }
//    console.log("We're connected to MySQL");
// });

var connection;
function handleDisconnect() {
connection = mysql.createConnection(dbConfig);  // Recreate the connection, since the old one cannot be reused.
connection.connect(function onConnect(err) {   // The server is either down
    if (err) {                                  // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 10000);    // We introduce a delay before attempting to reconnect,
    }                                           // to avoid a hot loop, and to allow our node script to
});                                             // process asynchronous requests in the meantime.
// If you're also serving http, display a 503 error.
connection.on('error', function onError(err) {
    console.log('db error', err);
    if (err.code == 'PROTOCOL_CONNECTION_LOST') {   // Connection to the MySQL server is usually
        console.log("connection lost")
        handleDisconnect();
    } else {                                        // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
});
}
handleDisconnect();

// Connect to the database: 
connection.connect(err => {
    if (err) {
        console.log("Failed to create connection + " + err);
        return;
    }
    console.log("We're connected to MySQL");
});


// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                // console.log("Error " + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if (err) {
                //console.log("Error " + err);
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};