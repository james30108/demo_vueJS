// ตัวอย่าง การใช้งาน express.js แบบ Dymanic files
const express       = require("express")
const cors          = require("cors")
const router        = require("./app/routes/")
const path          = require("path")
const app           = express()

// สำหรับรับข้อมูล จาก API ฝั่ง Frontend 
var corsOptions = {
    origin: "http://localhost:3000" // ใส่ที่มาของเว็บที่ส่งข้อมุลเข้ามา
};

// use คือการกำหนด middleware หรือก็คือตัวกรอง request ที่ส่งเข้ามา
app.use(express.static(path.join(__dirname,"app/public"))) // ตั้งค่า static files
app.use(cors(corsOptions))
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({extended:false})) // คำสั่งแปลงข้อมูลที่ถูกส่งมาแบบ post 
app.use(router)

app.listen(8080,()=>{
    console.log("รัน server ที่ port 8080")
})