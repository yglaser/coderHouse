const fs = require("fs")
const date = new Date()

fs.writeFileSync("date.txt", JSON.stringify(date))
if(fs.existsSync("date.txt")){
    let contenido = fs.readFileSync("date.txt", "utf-8")
}