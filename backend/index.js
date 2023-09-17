const express = require('express')
const app = express()

app.get('/lastrestart', (rreq,rres) => {
    rres.send("miau")
})


app.listen(8082)