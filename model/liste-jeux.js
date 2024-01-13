import connectionPromise from "../connection.js";

export async function getJeux() {
    let connection = await connectionPromise;

    const result = await connection.all(
        `SELECT nom, description, prix, en_vente, evaluation, chemin_image 
        FROM jeux`
    );

    return result;
}