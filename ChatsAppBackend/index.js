const express = require('express')
const dotenv = require('dotenv')
const DBConnect = require('./config/db.js')
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const authRouters = require('./routes/authRouter.js');
const messageRouters = require('./routes/messageRouter.js')
const searchFriendsRouter = require('./routes/searchRouter.js')

dotenv.config();
const PORT = process.env.PORT || 6000

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.use('/api/v1/auth', authRouters);
app.use('/api/v1/message', messageRouters);
app.use('/api/v1/search', searchFriendsRouter)
app.get('/', (req,res) => {
    res.status(200).send({name:'arjun', project:'Chatting app'})
    console.log('a request has came')
})
app.listen(process.env.PORT, async () => {
    console.log(`Server has been started on port no ${PORT}`)
    DBConnect();
})