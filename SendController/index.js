import { CourierClient } from "@trycourier/courier";

const AUTH_KEY = process.env.AUTH_KEY
const GET_STORE_DATA_URL = "" //process.env.GET_STORE_DATA_URL

const courier = CourierClient({ authorizationToken: AUTH_KEY });

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    let oldResult = "" //Retrieve from database
    let newResult = "" //Make request to GET_STORE_DATA_URL


    let content = compareResult(oldResult, newResult)

    if(content[0] || content[1]) {
        // SEND TO LIST AND ADD NEW RES TO DATABASE
    }

    if (myTimer.isPastDue) {
        context.log('JavaScript is quite running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);
};

function compareResult(oldRes, newRes) {
	let result = []
	newRes.forEach((store, sIndex) => {
		store.forEach((game, gIndex) => {
			if (oldRes[sIndex].some(compare => compare.title === game.title)) {
				store[gIndex] = null;
			}
		})
		let newStore = store.filter(x => x !== null)
		result.push(newStore)
	});

	return result
}
