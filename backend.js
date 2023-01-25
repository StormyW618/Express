const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }


app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    console.log("Delete" + id);
    let result = findUserById(id);
    console.log(result);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users['users_list'] = users['users_list'].filter( (user) => user['id'] !== id);
        res.send(id);
        res.status(204).end();
        // result = {users_list: result};
    }
});

function findUserById(id) {
    console.log("find: " + id);
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function createUserId(){
    return (Math.round(Math.random() * 100)).toString();
}

app.post('/users', (req, res) => {
    // const userToAdd = req.body;
    // req.body.id = createUserId();
    const userToAdd = req.body;
    userToAdd.id = createUserId();// userToAdd.id = createUserId();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function addUser(user){
    users['users_list'].push(user);
}