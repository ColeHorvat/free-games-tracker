/*
SignUp:
- Takes in fields from client form (First Name, Email Address, Phone Number, Contact Preference)
- Creates a new Courier recipient profile for the user including unique ID (Year, Month, Day, Hour, Minute, Second, 4 random digits)
- Adds user to Courier list
*/

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}