import express from "express";
import routerUsers from "./routes/user.routes.js";
import routerServices from "./routes/services.routes.js";
import routerPosts from "./routes/posts.routes.js"
import routerAuth from "./routes/auth.routes.js"
import bodyParser from "body-parser";


const PORT = 5000;

const app = express();

app.use(express.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use('/api', routerUsers)
app.use('/api', routerServices)
app.use('/api', routerPosts)
app.use('/api', routerAuth)
app.use('/img', express.static('img'));

app.listen(PORT, () => console.log('server started'))

