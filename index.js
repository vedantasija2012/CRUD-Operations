const app = require('./app')

const port = 80;

app.listen(port, ()=>{
    console.log(`App Listening at: http://localhost:${port}`)
})