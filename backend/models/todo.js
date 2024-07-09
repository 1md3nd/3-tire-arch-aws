const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2/promise');
const fs = require('fs').promises;

const sql_port = process.env.PORT;
const hostName = process.env.DB_HOSTNAME;
const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DATABASE;

const pool = mysql.createPool({
    host: hostName,
    port: sql_port,
    user: userName,
    password: password,
    database: database,
    connectionLimit: 10
});


async function checkAndCreateTodosTable() {
    try {
        // Check if the todos table already exists
        const [rows, fields] = await pool.query("SHOW TABLES LIKE 'todos'");
        if (rows.length === 0) {
            // If the table does not exist, read the SQL script from file and execute it
            const sqlScript = await fs.readFile('./models/create_todos_table.sql', 'utf-8');
            const connection = await pool.getConnection();
            await connection.query(sqlScript);
            connection.release();
            console.log('Todos table created successfully.');
        } else {
            console.log('Todos table already exists.');
        }
    } catch (error) {
        console.error('Error checking or creating todos table:', error);
    }
}

// Invoke the function when your backend server starts
checkAndCreateTodosTable();

const Todo = {
    getAllTodos: async () => {
        try {
            const [results, fields] = await pool.query('SELECT * FROM todos WHERE is_deleted = false');
            return results;
        } catch (error) {
            throw error;
        }
    },

    getTodoById: async (id) => {
        try {
            const [results, fields] = await pool.query('SELECT * FROM todos WHERE id = ? AND is_deleted = false', [id]);
            if (results.length === 0) {
                return null;
            }
            return results[0];
        } catch (error) {
            throw error;
        }
    },

    createTodo: async (todo) => {
        try {
            const [result, fields] = await pool.query('INSERT INTO todos SET ?', todo);
            const newTodo = { id: result.insertId, ...todo };
            return newTodo;
        } catch (error) {
            throw error;
        }
    },

    updateTodo: async (id, updatedTodo) => {
        try {
            const [result, fields] = await pool.query('UPDATE todos SET ? WHERE id = ?', [updatedTodo, id]);
            if (result.affectedRows === 0) {
                return null;
            }
            return updatedTodo;
        } catch (error) {
            throw error;
        }
    },

    deleteTodo: async (id) => {
        try {
            const [result, fields] = await pool.query('UPDATE todos SET is_deleted = true WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return null;
            }
            return { id };
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Todo;
