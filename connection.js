import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { existsSync } from 'node:fs';

/**
 * Constante indiquant si la base de données existe au démarrage du serveur 
 * ou non.
 */
const IS_NEW = !existsSync(process.env.DB_FILE)

/**
 * Crée une base de données par défaut pour le serveur. Des données fictives
 * pour tester le serveur y ont été ajouté.
 */
const createDatabase = async (connectionPromise) => {
    let connection = await connectionPromise;

    await connection.exec(
        `CREATE TABLE jeux(
            id_jeu INTEGER PRIMARY KEY,
            nom TEXT NOT NULL,
            description TEXT NOT NULL,
            prix REAL NOT NULL,
            en_vente INTEGER NOT NULL,
            evaluation INTEGER NOT NULL,
            chemin_image TEXT NOT NULL
        );
        CREATE TABLE utilisateur(
            id_utilisateur INTEGER PRIMARY KEY,
            username TEXT UNIQUE,
            password TEXT
        );
        
        INSERT INTO jeux (nom, description, prix, en_vente, evaluation, chemin_image)
        VALUES (
            "Minecraft: Java Edition", 
            "Prépare-toi à une aventure aux possibilités illimitées lorsque tu construis, que tu casses des blocs, que tu combats des créatures ou que tu explores le paysage de Minecraft qui ne cesse de se réinventer.",
            35.00,
            false,
            93,
            "./img/minecraft.jpg"
        ), (
            "Ori and the Blind Forest: Definitive Edition", 
            """Ori and the Blind Forest"" relate l'histoire d'une jeune créature orpheline à la destinée héroïque, au travers d'un jeu de plateforme et d'action aux graphismes époustouflants, développé par Moon Studios.",
            22.09,
            false,
            96,
            "./img/ori.jpg"
        ), (
            "Terraria", 
            "Creuser, survivre, explorer, construire ! Tout est possible dans ce jeu d'aventure bourré d'action. Pack de 4 jeux également disponible !",
            10.99,
            false,
            98,
            "./img/terraria.jpg"
        ), (
            "Age of Empires II: Definitive Edition", 
            "Age of Empires II: Definitive Edition fête le 20e anniversaire de l'une des franchises de jeux de stratégie les plus populaires au monde avec des graphismes époustouflants 4K Ultra HD, une bande originale entièrement remasterisée et du contenu inédit, ""Les derniers khans"", proposant 3 nouvelles campagnes et 4 civilisations supplémentaires.",
            21.99,
            false,
            93,
            "./img/aoe2.jpg"
        ), (
            "RollerCoaster Tycoon® 2: Triple Thrill Pack", 
            "Stretch your imagination further to build bigger parks and higher coasters! Break ground and start from scratch, open the gates to a remarkable Six Flags park, or just create the most gut-wrenching roller coaster imaginable - now you can play your way! Choose and complete different scenarios accordingly to the experience and content you like. Satisfy the visitors by building various attractions and facilities.Wild new rides, exciting new themes, and improved easy-to-use building tools make creating the ultimate amusement park more fun than ever!",
            3.99,
            true,
            86,
            "./img/rct2.jpg"
        ), (
            "Portal 2", 
            "Portal 2 nous vient tout droit du jeu original culte Portal primé à plus de 70 reprises pour sa jouabilité, son scénario et sa musique. La partie solo de Portal 2 présente un ensemble de nouveaux personnages, de nouveaux éléments et de nouvelles chambres de test plus vastes. Les joueurs vont pouvoir parcourir des parties inconnues des laboratoires d'Aperture Science et retrouver GLaDOS, l'ordinateur maléfique du jeu original.",
            11.49,
            false,
            98,
            "./img/portal.jpg"
        ), (
            "Stardew Valley", 
            "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
            16.99,
            false,
            97,
            "./img/stardew.jpg"
        ), (
            "The Elder Scrolls V: Skyrim Special Edition", 
            "Lauréat de plus de 200 récompenses du Jeu de l'année ! Skyrim Special Edition apporte un souffle nouveau à cette aventure épique, avec force détail. La Special Edition comprend le célèbre jeu et les contenus additionnels, avec graphismes et effets remasterisés, rayons divins volumétriques, profondeur de champ dynamique, reflets et plus encore. Skyrim Special Edition apporte en outre toute la puissance des mods PC sur console.  Nouvelles quêtes, environnements, personnages, dialogue, armure, armes et plus encore... l'expérience est sans limite.",
            49.99,
            false,
            93,
            "./img/skyrim.jpg"
        ), (
            "The Witcher 3: Wild Hunt", 
            "Alors que la guerre fait rage à travers les royaumes du Nord, vous acceptez le contrat de votre vie et partez à la recherche de l'enfant de la prophétie, une arme vivante capable de changer le monde.",
            55.99,
            false,
            98,
            "./img/witcher.jpg"
        ), (
            "Undertale", 
            "Welcome to UNDERTALE. In this RPG, you control a human who falls underground into the world of monsters. Now you must find your way out... or stay trapped forever.",
            5.99,
            true,
            96,
            "./img/undertale.jpg"
        ), (
            "Super Smash Bros Ultimate", 
            "The game follows the series' traditional style of gameplay: controlling one of the various characters, players must use differing attacks to weaken their opponents and knock them out of an arena. It features a wide variety of game modes, including a campaign for single-player and multiplayer versus modes. Ultimate features over 80 playable fighters, including everyone from all previous Super Smash Bros. games, alongside several newcomers.",
            79.99,
            false,
            93,
            "./img/smash.png"
        ), (
            "Mario Kart 8 Deluxe", 
            "The game continues the traditional gameplay of the Mario Kart series, in which characters from the Mario universe race against each other in go-karts, attempting to hinder their opponents or improve their racing performance using various tools found in item boxes. In addition, the game includes four different difficulties, which can be selected before beginning the race to challenge players. Returning features from previous installments include motorbikes and 12-player racing from Mario Kart Wii, as well as hang gliders, underwater racing and vehicle customization from Mario Kart 7.",
            69.99,
            true,
            94,
            "./img/kart.jpg"
        ), (
            "The Legend of Zelda: The Wind Waker HD", 
            "The Legend of Zelda: The Wind Waker makes its glorious return on the Wii U console with gorgeous HD graphics and enhanced game features. In this timeless classic with a unique and colorful ""toon-shaded"" art style, players guide Link as he sets out on the massive Great Sea to find his kidnapped sister. You will sail the seas in search of lost islands, fight fearsome enemies, take on mighty bosses, and seek out the legendary Triforce.",
            19.99,
            false,
            90,
            "./img/zelda.jpg"
        ), (
            "League of Legends", 
            "As in other multiplayer online battle arena (MOBA) games, each player in League of Legends controls a character (""champion"") with a set of unique abilities.[2] Most games involve two teams of five players, with each player using a different champion.[3] The two teams compete to be the first to destroy the Nexus structure within the opposing base.",
            0.00,
            false,
            78,
            "./img/lol.jpg"
        ), (
            "Celeste", 
            "Aidez Madeline à survivre à ses démons intérieurs au mont Celeste, dans ce jeu de plateformes ultra relevé, réalisé par les créateurs du classique TowerFall. Relevez des centaines de défis faits à la main, découvrez tous les secrets et dévoilez le mystère de la montagne.",
            21.99,
            false,
            97,
            "./img/celeste.jpg"
        );
        
        INSERT INTO utilisateur (username, password)
        VALUES('test', '$2b$10$ruli227yQTQagrq1wePWCeMH13A9RhjrzFTysrOZIVIjoiPP3eDJm');`
    );
    
    return connection;
}

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
if (IS_NEW) {
    connectionPromise = createDatabase(connectionPromise);
}

export default connectionPromise;
