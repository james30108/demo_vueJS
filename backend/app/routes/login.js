const express   = require('express')
const router    = express.Router()
const jwt       = require('jsonwebtoken')  // ใช้งาน jwt module
const fs        = require('fs') // ใช้งาน file system module ของ nodejs
 
router.get('/', function(req, res, next) {

    // ใช้ค่า privateKey เป็น buffer ค่าที่อ่านได้จากไฟล์ private.key ในโฟลเดอร์ config
    const privateKey = fs.readFileSync(__dirname+'/../config/private.key')

    // สมมติข้อมูลใน payload เช่น id , name , role ค่าเหล่านี้ เราจะเอาจากฐานข้อมูล กรณีทำการล็อกอินจริง
    const payload = {
        id   : 20134,
        name : 'test_demo',
        role : 'admin'
    }
    
    // ทำการลงชื่อขอรับ token โดยใช้ค่า payload กับ privateKey
    const token = jwt.sign(payload, privateKey);
    // เมื่อเราได้ค่า token มา ในที่นี้ เราจะแสดงค่าใน textarea เพื่อให้เอาไปทดสอบการทำงานผ่าน postman
    // ในการใช้งานจริง ค่า token เราจะส่งไปกับ heaer ในขั้นตอนการเรียกใช้งาน API  เราอาจจะบันทึก
    // ไว้ใน localStorage ไว้ใช้งานก็ได้
    var html = 'Login Page Token: <br>'
    html += '<textarea rows="5" cols="50">'+token+'</textarea>'
    res.send(html)
})
 
module.exports = router