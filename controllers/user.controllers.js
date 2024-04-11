import db from '../db.js'
import crypto from 'crypto'

const salt = crypto.randomBytes(16).toString('hex');

function Hex(password){
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash
}


class UserControllers {
    
    async createUser(req, res) {
        const {role, name, surname, city, phone_number, INN, organization, telegram, viber, vk, pass} = req.body
        const photos = req.file.originalname
        let passHex = Hex(pass)
        const addSocialLinks = await db.query(`INSERT INTO social_links (telegram, viber, vk) VALUES ($1, $2, $3) RETURNING *`, [telegram, viber, vk])
        const linksId = addSocialLinks.rows[0].id
        const newPerson = await db.query('INSERT INTO users (role, name, surname, city, phone_number, INN, organization, photos, social_linksID, pass) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [role, name, surname, city, phone_number, INN, organization, photos, linksId, passHex])
        res.json(newPerson.rows[0])
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const oneUser = await db.query(`SELECT * FROM users WHERE id=${id} `)
        const linksID = oneUser.rows[0].social_linksid
        const userLinks = await db.query(`SELECT * FROM social_links WHERE id=${linksID}`)
        const user = oneUser.rows[0]
        const links = userLinks.rows[0]
        res.json({
            user,
            links
        })
    }

    async getOneUserPhone(req, res) {
        const phone = req.body.phone
        const oneUser = await db.query(`SELECT * FROM users WHERE phone_number='${phone}'`)
        console.log(oneUser)
        const linksID = oneUser.rows[0].social_linksid
        const userLinks = await db.query(`SELECT * FROM social_links WHERE id=${linksID}`)
        const user = oneUser.rows[0]
        const links = userLinks.rows[0]
        res.json({
            user,
            links
        })
    }

    async addPortfolio(req,res) {
        console.log(req)
        const id = req.params.id
        const photo = req.file.originalname
        const addPortfolio = await db.query(`INSERT INTO portfolio (userID, photo) VALUES ($1, $2) RETURNING *`, [id, photo])
        res.json(addPortfolio.rows[0])
    }

    async getPortfolio(req, res) {
        const id = req.params.id
        const portfolio = await db.query(`SELECT * FROM portfolio WHERE userID=${id}`)
        res.json(portfolio.rows)
    }

    async updateUser(req, res) {
        const id = req.params.id
        const {name, surname, city, phone_number, inn, organization, telegram, viber, vk, linksID} = req.body
        console.log(name, surname, city, phone_number, inn, organization, telegram, viber, vk, linksID)
        // const photo = req.file.originalname
        await db.query(`UPDATE users SET name = '${name}', surname = '${surname}', city = '${city}', phone_number = '${phone_number}', INN = '${inn}', organization = '${organization}' WHERE id = ${id}`)
        await db.query(`UPDATE social_links SET telegram = '${telegram}', viber = '${viber}', vk = '${vk}' WHERE id = ${linksID}`)
        res.json('Good')

    }
    async deleteUser(req, res) {

    }
}

export default new UserControllers()