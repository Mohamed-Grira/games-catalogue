/**
 * Valide que le texte reçu du client est valide.
 * @param {*} texte La valeur de la variable texte reçu du client.
 * @returns Une valeur indiquant si la variable texte est valide.
 */
export const isTexteValid = (texte) => 
    typeof texte === 'string' &&
    texte.length >= 8;

/**
 * Valide que le id reçu du client est valide.
 * @param {*} id La valeur de la variable id reçu du client.
 * @returns Une valeur indiquant si la variable id est valide.
 */
export const isIdValid = (id) => 
    typeof id === 'number' &&
    id > 0;

export const isIdentifiantValid = (identifiant) => 
    typeof identifiant === 'string' &&
    identifiant.length >= 8;

export const isMotPasseValid = (motPasse) => 
    typeof motPasse === 'string' &&
    motPasse.length >= 8;
