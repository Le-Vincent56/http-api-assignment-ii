// Create an object in memory
const users = {};

const respondJSON = (request, response, status, object) => {
    const headers = {'Content-Type': 'application/json' };

    // Send the respones with the JSON object
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    const headers = { 'Content-Type': 'application/json' };

    // Send response without the object
    response.writeHead(status, headers);
    response.end();
};

const getUsers = (request, response) => {
    // Create the JSON object to send
    const responseJSON = {
        users
    };

    // Return with success
    return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
    // Return with success
    respondJSONMeta(request, response, 200);
};

const updateUser = (request, response) => {
    // Add a new user with new data
    const newUser = {
        createdAt: Date.now()
    };

    // Modify our object in memory, using the time as the key
    users[newUser.createdAt] = newUser;

    // Return with a changed status and the new user
    return respondJSON(request, response, 204, newUser);
};

const notFound = (request, response) => {
    // Create an error response
    const responseJSON = {
        message: 'The page you are looking for was not found',
        id: 'notFound'
    };

    // Return an error status with the message
    respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
    // Return a 404 status code
    respondJSONMeta(request, repsonse, 404);
};

// Exports
module.exports = {
    getUsers,
    getUsersMeta,
    updateUser,
    notFound,
    notFoundMeta
}