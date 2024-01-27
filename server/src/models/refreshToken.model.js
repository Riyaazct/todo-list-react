const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const jwtRefreshExpiration = 60 * 60 * 24 * 7; \

const generateRefreshToken = async (userId) => {
    // calculate the expiration of the refresh token
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + jwtRefreshExpiration);
    
    // generate a unique token using UUIDv4
    const refreshToken = uuidv4();
    
    // create new refresh token in the database
    const insertRefreshTokenQuery = " INSERT INTO refresh_tokens (token, expiry_date, user_id) VALUES ($1,$2,$3) RETURNING token";

    const result = await db.query(insertRefreshTokenQuery, [
        refreshToken,
        expiryDate,
        userId
    ]);
    return result.rows[0].token;
};

const verifyRefreshTokenExpiration = (expiryDate) => {
    return new Date(expiryDate) < new Date();
}

module.exports = {
    generateRefreshToken,
    verifyRefreshTokenExpiration
};
