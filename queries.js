const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '503764',
    port: 5432
})

const getTasks = (req, res) => {
    pool.query('SELECT * FROM tasks', (err, result) => {
        if(err){
            throw err;
        }
        res.status(200).json(result.rows);
    })
}

const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM tasks WHERE id = $1', [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows)
    })
}

const createTask = (request, response) => {
    const { title, description, creator = 1 } = request.body
    const date = new Date();

    pool.query('INSERT INTO tasks (title, description, creator, date) VALUES ($1, $2, $3, $4)', [title, description, creator, date], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

module.exports = {
    getTasks,
    getTaskById,
    createTask
}