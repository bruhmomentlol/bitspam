import { app } from "./app.js";
import validator from "validator";
import { getCsrf, isOffsale, logIn } from "./generate.js";
import { conn } from "./models/con.js";
/*
    this api endpoint is the part to request to get an account
    bitfarmed
*/
app.post('/api/bitfarm', (req, res) => {
    const {item, bits} = req.body;
    if(item === undefined || bits === undefined) {
        res.status(400)
        res.json({error: "no_empty"})
        return
    }
    if(!validator.isAscii(item)) {
        res.status(400)
        res.json({error: "alphanumeric_item"})
        res.end()

        return

    }

    if(!item.includes("https://www.brickplanet.com")) {
        res.status(400)
        res.json({error: "bp_link"})
        res.end()

        return
    }

    if(!validator.isNumeric(bits)) {
        res.status(400)
        res.json({error: "numeric_only"})
        res.end()
        return
    }

    isOffsale(item, {
        offSale: function() {
            res.status(404)
            res.json({error: "item_offsale"})
            res.end()
        },
        onSale: function() {
            conn.getConnection()
            .then(
                (con) => {
                    con.execute("SELECT * FROM accounts WHERE banned=0 ORDER BY RAND() LIMIT 5")
                        .then(
                            (rows) => {
                                for(let i = 0; i < rows.length; i++) {
                                    getCsrf((token) => logIn(rows[i].name, rows[i].password, token, (cookie) => {console.log(cookie)}, (data) => {
                                        console.log(data.status)
                                        console.log(token)

                                        res.status(500)
                                        res.json({error: 'login_error'})
                                        res.end()
                                    }))
                                }
                            }
                        )
                }
            )
            .catch(
                (err) => {
                    res.status(500)
                    res.json({error: "err_server"})
                    return
                }
            )
            
        }
    })

    
})
app.listen(8080)