const Pool = require('pg').Pool;
const fs = require('fs');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'LqVR99WE',
    port: 32768
})

const getUserTasks = (req, res) => {
    const id = parseInt(req.params.id);
    const query = `
        SELECT user_task.user, t.id, title, description, 
            created_date, creator, firstname,
            lastname, middlename
        FROM user_task
        LEFT JOIN tasks t ON user_task.task = t.id
        JOIN users ON t.creator = users.id
        WHERE user_task.user = ${id}`
    pool.query(query, (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const getTasks = (req, res) => {
    const query = `
        SELECT *
        FROM TASKS
    `
    pool.query(query, (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

/*const addTasks = (request, response) => {
    console.log(request.body)
    const {title, created_date, completed_date, description, creator} = request.body;
    pool.query(
        'INSERT INTO tasks(title, created_date, description, creator, completed_date) VALUES ($1, $2, $3, $4, $5)', [title, created_date, description, creator, completed_date]), (error, results) => {
        response.status(201).send('Task added');
    };
}*/

module.exports = {
    getUserTasks,
    getTasks
    //addTasks
}