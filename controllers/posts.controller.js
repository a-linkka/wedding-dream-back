import db from '../db.js'

class PostsControllers {
    // создание поста
    async createPost(req, res) {
        const {description, tags} = req.body
        const photos = req.file.originalname
        const id = req.params.id
        const newService = await db.query('INSERT INTO posts (userID, description, tags, photo) values ($1, $2, $3, $4) RETURNING *', [id, description, tags, photos])
        res.json(newService.rows[0])
    }

    // поиск поста
    async searchPosts (req, res) {
        let searchWord = req.body.search
        const posts = await db.query(`SELECT * FROM posts WHERE LOWER(description) LIKE LOWER('%${searchWord}%')
                                                                    OR LOWER(tags) LIKE LOWER('%${searchWord}%')`)                                       
        res.json(posts.rows)
    }

    // получение одной поста
    async getOnePost(req, res) {
        const id = req.params.id
        const service = await db.query(`SELECT * FROM posts WHERE id=${id}`)
        res.json(service.rows[0])
    }

    async getAllPosts(req,res){
        const allPosts = await db.query('SELECT posts.*, users.* FROM posts JOIN users ON posts.userID = users.id;')
        res.json(allPosts.rows)
    }

    async getAllPostsID(req,res){
        const id = req.params.id
        const allPosts = await db.query(`SELECT posts.*, users.* FROM posts JOIN users ON posts.userID = users.id WHERE userID=${id}`)
        res.json(allPosts.rows)
    }

    // async getAllPosts(req,res){
    //     const allPosts = await db.query('SELECT * FROM posts')
    //     res.json(allPosts.rows)
    // }
}

export default new PostsControllers()