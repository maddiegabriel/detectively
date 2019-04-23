// Requires
const express = require('express');
const json2csv = require('json2csv').Parser;
const path = require('path');
const mysql = require('mysql');

// Consts
const PORT = 5000;
const SALARY_COLS = [
    'id',
    'last_name',
    'first_name',
    'sector',
    'salary',
    'employer',
    'job_title',
    'location',
    'year'
];
const AVG_SALARY_COLS = [
    'id',
    'sector',
    'salary',
    'location',
    'year'
];
const QUERY_OPTS = [
    'min_id',
    'max_id',
    'min_salary',
    'max_salary',
    'min_year',
    'max_year'
];
const FORMAT_OPT = 'format';

// Create express application
let app = express();

// Create mysql connection pool
let pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b9862a9c1a06cf',
    password : '39a2a216',
    database : 'heroku_86689139c7d993f'
});

// Serve React production build files
app.use(express.static(path.resolve('client', 'build')));

// Homepage GET route
app.get('/', (req, res) => res.status(200).sendFile(path.resolve('client', 'build', 'index.html')));
app.get('/search', (req, res) => res.status(200).sendFile(path.resolve('client', 'build', 'index.html')));
app.get('/visual-representation', (req, res) => res.status(200).sendFile(path.resolve('client', 'build', 'index.html')));

/**
 * Salary endpoint
 *
 * Queries the salary_data table using the query string from
 * the HTTP request and returns the results in the specified format.
 */
app.get('/salary', (req, res) => {
    let keys = Object.keys(req.query);
    let format = req.query.format instanceof Array ? req.query.format[0] : req.query.format;

    // Compose WHERE clause of select statement
    let where = '';
    for(i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = req.query[key] instanceof Array ? req.query[key][0] : req.query[key];

        // Skip format key
        if(key === FORMAT_OPT) continue;

        // Keys must be valid
        if(!SALARY_COLS.includes(key) && !QUERY_OPTS.includes(key)) {
            res.status(400).end();
            return;
        }

        // Allow multiple values for a key to be comma-separated
        let valueList = value.split(',').filter(value => value !== '');
        if(valueList.length === 0) {
            res.status(400).end();
            return;
        }

        // Build MySQL condition for each key's set of values
        where += '(';
        for(j = 0; j < valueList.length; j++) {
            switch(key) {
                // Exact match
                case 'id':
                case 'salary':
                case 'year':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `${mysql.escapeId(key)} = ${mysql.escape(valueList[j])}`;
                    break;

                // Fuzzy match
                case 'last_name':
                case 'first_name':
                case 'sector':
                case 'employer':
                case 'job_title':
                case 'location':
                    where += `${mysql.escapeId(key)} LIKE ${mysql.escape('%'+valueList[j]+'%')}`;
                    break;

                // Range from min/max specified to min/max in DB
                case 'min_id':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `id >= ${mysql.escape(valueList[j])}`;
                    break;
                case 'max_id':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `id <= ${mysql.escape(valueList[j])}`;
                    break;

                // Range from min/max specified to min/max in DB
                case 'min_salary':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `salary >= ${mysql.escape(valueList[j])}`;
                    break;
                case 'max_salary':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `salary <= ${mysql.escape(valueList[j])}`;
                    break;

                // Range from min/max specified to min/max in DB
                case 'min_year':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `year >= ${mysql.escape(valueList[j])}`;
                    break;
                case 'max_year':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `year <= ${mysql.escape(valueList[j])}`;
                    break;
            }
            if(j+1 < valueList.length) where += ' OR '; // Join multiple values for a key with OR
        }
        where += ')';

        if(i+1 < keys.length && keys[i+1] !== FORMAT_OPT) where += ' AND '; // Join separate keys with AND
    }

    // Call database
    if(where) {
        let queryString = `SELECT * FROM salary_data WHERE ${where}`;
        performDatabaseQuery(queryString).then(result => serveResult(res, result, format));
    } else {
        res.status(400).end();
    }
});

/**
 * Average Salary endpoint
 *
 * Queries average_salary_data table using the query string from
 * the HTTP request and returns the results in the specified format.
 */
app.get('/average_salary', (req, res) => {
    let keys = Object.keys(req.query);
    let format = req.query.format instanceof Array ? req.query.format[0] : req.query.format;

    // Compose WHERE clause of select statement
    let where = '';
    for(i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = req.query[key] instanceof Array ? req.query[key][0] : req.query[key];

        // Skip format key
        if(key === FORMAT_OPT) continue;

        // Keys must be valid
        if(!AVG_SALARY_COLS.includes(key) && !QUERY_OPTS.includes(key)) {
            res.status(400).end();
            return;
        }

        // Allow multiple values for a key to be comma-separated
        let valueList = value.split(',').filter(value => value !== '');
        if(valueList.length === 0) {
            res.status(400).end();
            return;
        }

        // Build MySQL condition for each key's set of values
        where += '(';
        for(j = 0; j < valueList.length; j++) {
            switch(key) {
                // Exact match
                case 'id':
                case 'salary':
                case 'year':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `${mysql.escapeId(key)} = ${mysql.escape(valueList[j])}`;
                    break;

                // Fuzzy match
                case 'sector':
                case 'location':
                    where += `${mysql.escapeId(key)} LIKE ${mysql.escape('%'+valueList[j]+'%')}`;
                    break;

                // Range from min/max specified to min/max in DB
                case 'min_id':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `id >= ${mysql.escape(valueList[j])}`;
                    break;
                case 'max_id':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `id <= ${mysql.escape(valueList[j])}`;
                    break;

                // Range from min/max specified to min/max in DB
                case 'min_salary':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `salary >= ${mysql.escape(valueList[j])}`;
                    break;
                case 'max_salary':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `salary <= ${mysql.escape(valueList[j])}`;
                    break;

                // Range from min/max specified to min/max in DB
                case 'min_year':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `year >= ${mysql.escape(valueList[j])}`;
                    break;
                case 'max_year':
                    if(!valueList[j].match(/^[0-9]+$/)) {
                        res.status(400).end();
                        return;
                    }
                    where += `year <= ${mysql.escape(valueList[j])}`;
                    break;
            }
            if(j+1 < valueList.length) where += ' OR '; // Join multiple values for a key with OR
        }
        where += ')';

        if(i+1 < keys.length && keys[i+1] !== FORMAT_OPT) where += ' AND '; // Join separate keys with AND
    }

    // Call database
    if(where) {
        let queryString = `SELECT * FROM average_salary_data WHERE ${where}`;
        performDatabaseQuery(queryString).then(result => serveResult(res, result, format));
    } else {
        res.status(400).end();
    }
});

/**
 * Fuzzy Search Implementation
 */
app.get('/fuzzy', (req, res) => {
    let format = req.query.format instanceof Array ? req.query.format[0] : req.query.format;

    if(!req.query.q) {
        res.status(400).end();
        return;
    }

    // Compose WHERE clause of select statement
    let where = '';
    let value = req.query.q;
    //Separate into alpha and numeric
    for(j=0; j< SALARY_COLS.length; j++) {
        where += `${mysql.escapeId(SALARY_COLS[j])} like ${mysql.escape('%'+value+'%')}`;
        if(j+1 < SALARY_COLS.length) where += ' OR ';
    }

    // Call database
    if(where) {
        let queryString = `SELECT * FROM salary_data WHERE ${where}`;
        performDatabaseQuery(queryString).then(result => serveResult(res, result, format));
    } else {
        res.status(400).end();
    }
});

// Start server on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

/**
 * Performs a database query using the query string.
 *
 * @param {String} queryString Query string to use when querying database
 * @returns {Promise} A promise containing the result of the query
 */
function performDatabaseQuery(queryString) {
    return new Promise(resolve => {
        // Get connection from pool
        pool.getConnection((err, connection) => {
            if (err) throw err;

            // Query database
            connection.query(queryString, (err, result) => {
                connection.release(); // Release connection back to pool

                if (err) throw err;
                resolve({ results: result, count: result.length });
            });
        });
    });
}

/**
 * Serves a result from a database query in the specified format.
 *
 * @param {Object}      res             The Express response object
 * @param {Object[]}    result          Array of objects returned by database
 * @param {String}      [format=json]   File format to serve, one of json or csv
 */
function serveResult(res, result, format) {
    switch(format) {
        case 'csv':
            let fields = SALARY_COLS.filter(field => field !== 'id');
            let parser = new json2csv({fields});
            let csv = parser.parse(result.results);

            res.attachment('data.csv');
            res.type('text/csv');
            res.status(200).send(csv);
            break;
        case 'json':
        default:
            res.status(200).send(result);
            break;
    }
}
