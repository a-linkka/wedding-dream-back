import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js'

const generateAccessToken = (id, role, name, surname, phone_number, social_linksID, photo) => {
    const payload = {
        id,
        role,
        name,
        surname,
        phone_number,
        social_linksID,
        photo
    }

    return jwt.sign(payload, secretKey.secret, { expiresIn: '1d' });
}

class AuthControllers {
    
    async registration(req, res) {
        const {role, name, surname, city, phone_number, INN, organization, telegram, viber, vk, pass} = req.body
        const check = await db.query(`SELECT * FROM users WHERE phone_number = '${phone_number}'`)
        if(check.rows[0]){
            res.json('Номер телефона уже занят')
        } else {
            const addSocialLinks = await db.query(`INSERT INTO social_links (telegram, viber, vk) VALUES ($1, $2, $3) RETURNING *`, [telegram, viber, vk])
            const linksId = addSocialLinks.rows[0].id
            const passHash = bcrypt.hashSync(pass, 7)
            const newPerson = await db.query('INSERT INTO users (role, name, surname, city, phone_number, INN, organization, social_linksID, pass) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [role, name, surname, city, phone_number, INN, organization, linksId, passHash])
            const person = newPerson.rows[0]
            const social_links = addSocialLinks.rows[0]
            res.json({
                person,
                social_links
            })
            
        }
        // console.log(check.rows[0])
        // res.json(check.rows[0])
    }

    async login(req, res) {
        const {phone_number, pass} = req.body
        const check = await db.query(`SELECT * FROM users WHERE phone_number = '${phone_number}'`)
        if(!check.rows[0]) {
            return res.json('Пользователь не зарегистрирован')
        }
        const validPassword = bcrypt.compareSync(pass, check.rows[0].pass)
        if(!validPassword) {
            return res.json('Неверный пароль')
        }
        const person = check.rows[0]
        const token = generateAccessToken(person.id, person.role, person.name, person.surname, person.phone_number, person.social_linksid, person.photo)
        res.json(token)
    }
}

export default new AuthControllers()