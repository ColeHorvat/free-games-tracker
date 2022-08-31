/*
SignUp:
- Takes in fields from client form (First Name, Email Address, Phone Number, Contact Preference)
- Creates a new Courier recipient profile for the user including unique ID (Year, Month, Day, Hour, Minute, Second, 4 random digits)
- Adds user to Courier list
*/

const dotenv = require('dotenv');

dotenv.config()

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //Initialize data from form

    const FIRST_NAME = "Cole" //req.headers or req.body[path]
    const EMAIL = process.env.TEST_EMAIL //req.headers or req.body[path]
    const PHONE = process.env.TEST_PHONE //req.headers or req.body[path]
    const CONTACT_PREF = ["Email"] //req.body[path]

    //Create unique recipient ID
    /*
        ID = FGT-(Year)(Month)(Day)(Hour)(Minute)(Second)(4 random digits)
    */

    //Get Date
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();

    let dateString = cYear + "" + cMonth + "" + cDay + "";

    //Get Time
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();

    let timeString = hour + "" + min + "" + sec + ""

    //Get 4 Random Digits
    let digit = Math.floor(1000 + Math.random() * 9000);

    //Create ID
    const USER_ID = "FGT-" + dateString + timeString + digit 

    //Create Courier recipient
    const AUTH_KEY = process.env.AUTH_KEY

    const profileOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + AUTH_KEY
        },
        body: JSON.stringify({
            "profile": {
                "email": EMAIL,
                "phone_number": PHONE
            }
        })
    };

    fetch('https://api.courier.com/profiles/0460766e-8463-4905-ae98-b72c7aef41d6', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: ""
    };
}