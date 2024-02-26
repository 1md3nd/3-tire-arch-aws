const mysql = require('mysql');

const sql_port = process.env.PORT;
const hostName = process.env.HOST;
const userName = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const pool = mysql.createPool({
    host: hostName,
    port: sql_port,
    user: userName,
    password: password,
    database: database,
    connectionLimit: 10 
});

const Todo = {
    getAllTodos: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM todos WHERE is_deleted = false', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getTodoById: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM todos WHERE id = ? AND is_deleted = false', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null); // No todo found with the given id
                } else {
                    resolve(results[0]);
                }
            });
        });
    },

    createTodo: (todo) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO todos SET ?', todo, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const newTodo = { id: result.insertId, ...todo };
                    resolve(newTodo);
                }
            });
        });
    },

    updateTodo: (id, updatedTodo) => {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE todos SET ? WHERE id = ?', [updatedTodo, id], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.affectedRows === 0) {
                    resolve(null); // No todo found with the given id
                } else {
                    resolve(updatedTodo);
                }
            });
        });
    },

    deleteTodo: (id) => {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE todos SET is_deleted = true WHERE id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.affectedRows === 0) {
                    resolve(null); // No todo found with the given id
                } else {
                    resolve({ id });
                }
            });
        });
    }
};

module.exports = Todo;
