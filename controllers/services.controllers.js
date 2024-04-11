import db from '../db.js'

class ServiceControllers {
      // создание услуги
    async createService(req, res) {
        console.log(req)
        const {tittle, price, descriptions, word_key} = req.body
        const id = req.params.id
        const newService = await db.query('INSERT INTO services (userID, tittle, price, descriptions, word_key) values ($1, $2, $3, $4, $5) RETURNING *', [id, tittle, price, descriptions, word_key])
        res.json(newService.rows[0].id)
    }

    async updateServicePhoto(req, res){
        const id = req.params.id
        const photo = req.file.originalname
        const updatePhoto = await db.query(`UPDATE services SET photos = '${photo}' WHERE id = ${id}`)
        res.json(updatePhoto.rows[0])
    }

    // поиск услуг
    async getServices (req, res) {
        let searchWord = req.body.search
        console.log(searchWord)
        const services = await db.query(`SELECT * FROM services WHERE LOWER(tittle) LIKE LOWER('%${searchWord}%')
                                                                    OR LOWER(descriptions) LIKE LOWER('%${searchWord}%')
                                                                    OR LOWER(word_key) LIKE LOWER('%${searchWord}%')`)
        res.json(services.rows)
    }

    // получение одной услуги
    async getOneService(req, res) {
        const id = req.params.id
        const service = await db.query(`SELECT * FROM services WHERE id=${id}`)
        res.json(service.rows[0])

    }

    // получение услуг специалиста
    async getServiceSpecialist(req, res){
        const id = req.params.id
        const serviceSpecialist = await db.query(`SELECT * FROM services WHERE userID=${id}`)
        res.json(serviceSpecialist.rows)
    }

    // получение избранных услуг
    async getServiceFavorites(req, res){
        const id = req.params.id
        const serviceFavorites = await db.query(`SELECT services. * FROM users
        JOIN favorites ON users.id = favorites.userid
        JOIN services ON favorites.servicesid = services.id
        WHERE users.id = ${id}`)
        res.json(serviceFavorites.rows)
    }

    // обновление услуги
    async updateService(req, res) {
        const {tittle, price, descriptions, word_key} = req.body
        console.log(tittle, price, descriptions, word_key)
        const id = req.params.id
        console.log(id)
        console.log(`UPDATE services SET tittle = '${tittle}', price = '${price}', descriptions = '${descriptions}', word_key = '${word_key}' WHERE id = ${id}`)
        const updateService = await db.query(`UPDATE services SET tittle = '${tittle}', price = '${price}', descriptions = '${descriptions}', word_key = '${word_key}' WHERE id = ${id}`)
        res.json(updateService)

    }

    async addFavorites(req, res){
        const {userID, serviceID} = req.body
        const addService = await db.query(`INSERT INTO favorites (userID, servicesID) VALUES (${userID}, ${serviceID})`)
        console.log(addService)
        res.json(addService.rows[0])
    }
}

export default new ServiceControllers()