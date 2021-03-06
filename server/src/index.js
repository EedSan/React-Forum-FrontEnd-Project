const express = require('express')
const cors = require('cors')

const usersRouter = require('./routers/users')
const postsRouter = require('./routers/posts')
const subredditsRouter = require('./routers/subreddits')
const commentsRouter = require('./routers/comments')

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/subreddits', subredditsRouter)
app.use('/comments', commentsRouter)

app.listen(process.env.PORT || 6000, () => {
    console.log(`App is listening on port ${port}`)
})