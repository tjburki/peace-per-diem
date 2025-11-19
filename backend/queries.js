require('dotenv').config();

const PAGE_SIZE = 30;
const Pool = require('pg').Pool;
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

const getPeaces = (request, response) => {
    const { user_id, page, date } = request.query;
    const offset = ((page || 1) - 1) * PAGE_SIZE;

    pool.query(`
        SELECT 
            p.peace_id, 
            u.user_id, 
            u.username, 
            p.text, 
            p.created, 
            COUNT(DISTINCT l.user_id) AS loves, 
            COUNT(DISTINCT f.user_id) as flags, 
            (CASE WHEN ul.user_id IS NOT NULL THEN TRUE ELSE FALSE END) as userloves 
        FROM 
            peaces p 
        INNER JOIN 
            users u ON p.user_id = u.user_id 
        LEFT JOIN 
            loves l ON p.peace_id = l.peace_id 
        LEFT JOIN 
            flags f ON p.peace_id = f.peace_id 
        LEFT JOIN 
            loves ul ON ul.peace_id = p.peace_id AND ul.user_id = $1
        LEFT JOIN 
            flags uf ON uf.peace_id = p.peace_id AND uf.user_id = $1
        WHERE 
            active = TRUE AND 
            uf.flag_id IS NULL AND
            p.created <= $4
        GROUP BY 
            p.peace_id, 
            u.user_id, 
            u.username, 
            p.text, 
            p.created, 
            ul.user_id
        HAVING 
            COUNT(DISTINCT f.user_id) < 2 
        ORDER BY 
            (COALESCE(COUNT(DISTINCT l.user_id), 1) / COALESCE(NULLIF((EXTRACT('epoch' FROM CURRENT_TIMESTAMP) - EXTRACT('epoch' FROM p.created)), 0), 1)) DESC, p.peace_id DESC
        LIMIT $2
        OFFSET $3;
    `, [user_id, PAGE_SIZE, offset, new Date(date)], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(200).json(result.rows);
    });
};

const getUserPeaces = (request, response) => {
    const { id } = request.params;
    const { page } = request.query;
    const offset = ((page || 1) - 1) * PAGE_SIZE;
    const query = `
        SELECT 
            p.peace_id, 
            u.user_id, 
            u.username, 
            p.text, 
            p.created, 
            COUNT(DISTINCT l.user_id) AS loves
        FROM 
            peaces p 
        INNER JOIN 
            users u ON p.user_id = u.user_id 
        LEFT JOIN 
            loves l ON p.peace_id = l.peace_id 
        WHERE 
            active = TRUE AND
            p.user_id = $1
        GROUP BY 
            p.peace_id, 
            u.user_id, 
            u.username, 
            p.text, 
            p.created
        ORDER BY 
            created DESC, p.peace_id DESC 
        LIMIT $2
        OFFSET $3;
    `;
    
    pool.query(query, [id, PAGE_SIZE, offset], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(200).json(result.rows);
    });
};

const updatePeace = (request, response) => {
    const { text } = request.body;
    const { id } = request.params;
    pool.query('UPDATE peaces SET text = $1, created = $2 WHERE peace_id = $3', [text, new Date(), id], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(204).send(`Peace with ID ${id} successfully updated.`);
    });
};

const createPeace = (request, response) => {
    const { user_id, text } = request.body;
    pool.query('INSERT INTO peaces(user_id, text) VALUES($1, $2) RETURNING peace_id', [user_id, text], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        const peaceId = result.rows[0].peace_id;

        //Make the user love their own peace
        pool.query('INSERT INTO loves(peace_id, user_id) VALUES($1, $2)', [peaceId, user_id], (error, result) => {
            if (error) {} //Do nothing for now

            response.status(201).send(`Peace added with ID ${peaceId}`);
        });
    });
};

const insertUpdateUser = (request, response) => {
    const { email, username } = request.body;
    pool.query('SELECT user_id, username FROM users WHERE email = $1', [email], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        if (result.rows.length > 1) {
            response.status(400).json(`More than one user returned for the email ${email}`);
            return; 
        }

        if (result.rows.length === 1) {
            pool.query('UPDATE users SET username = $1 WHERE email = $2 RETURNING user_id, username', [username, email], (error, result) => {
                if (error) {
                    response.status(500).json(error);
                    return;
                }
    
                response.status(200).json(result.rows[0]);
            });
        }
        else {
            pool.query('INSERT INTO users(username, email) VALUES($1, $2) RETURNING user_id, username', [username, email], (error, result) => {
                if (error) {
                    response.status(500).json(error);
                    return;
                }
    
                response.status(200).json(result.rows[0]);
            });
        }
    });
};

const deletePeace = (request, response) => {
    const { id } = request.params;
    pool.query('UPDATE peaces SET active = FALSE WHERE peace_id = $1', [id], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(204).send(`Peace with ID ${id} successfully deleted.`);
    });
};

const flagPeace = (request, response) => {
    const { id } = request.params;
    const { user_id } = request.body;

    pool.query('INSERT INTO flags(peace_id, user_id) VALUES($1, $2)', [id, user_id], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(201).send(`Peace with ID ${id} has been flagged.`);
    });
};

const lovePeace = (request, response) => {
    const { id } = request.params;
    const { user_id } = request.body;

    pool.query('INSERT INTO loves(peace_id, user_id) VALUES($1, $2)', [id, user_id], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(201).send(`Peace with ID ${id} has been loved.`);
    });
};

const unlovePeace = (request, response) => {
    const { id } = request.params;
    const { user_id } = request.body;

    pool.query('DELETE FROM loves WHERE peace_id = $1 AND user_id = $2', [id, user_id], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(204).send(`Peace with ID ${id} has been unloved.`);
    });
};

const getLovesForUser = (request, response) => {
    const { id } = request.params;
    
    pool.query(`
        SELECT 
            COUNT(*) as loves
        FROM (
            SELECT DISTINCT 
                l.user_id, 
                l.peace_id 
            FROM 
                loves l 
            INNER JOIN 
                peaces p ON l.peace_id = p.peace_id 
            WHERE 
                p.active = TRUE AND
                p.user_id = $1
        ) AS lovesQuery`
        , [id], (error, result) => {
        if (error) {
            response.status(500).json(error);
            return;
        }

        response.status(200).send(result.rows[0].loves);
    });
};

module.exports = {
    getPeaces,
    getUserPeaces,
    createPeace,
    updatePeace,
    insertUpdateUser,
    deletePeace,
    flagPeace,
    lovePeace,
    unlovePeace,
    getLovesForUser
};