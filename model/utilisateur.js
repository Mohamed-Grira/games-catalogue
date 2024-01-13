import bcrypt from 'bcrypt';
import connectionPromise from "../connection.js";

export async function addUtilisateur(username, password) {
    let connection = await connectionPromise;

    let cryptPassword = await bcrypt.hash(password, 10);

    await connection.run(
        `INSERT INTO utilisateur(username, password)
        VALUES (?, ?)`,
        [username, cryptPassword]
    )
}

export async function getUtilisateur(username) {
    let connection = await connectionPromise;

    const result = await connection.get(
        `SELECT id_utilisateur, username, password 
        FROM utilisateur
        WHERE username = ?`,
        [username]
    );

    return result;
}
