/* import { CourierClient } from "@trycourier/courier"; */
const { CourierClient } = require("@trycourier/courier")
const fetch = require("node-fetch")
const { BlobServiceClient } = require('@azure/storage-blob')

const AUTH_KEY = process.env.AUTH_KEY
const GET_STORE_DATA_URL = process.env.GET_STORE_DATA_URL_TEST
const SAVED_DATA_URL = process.env.SAVED_DATA_URL
const CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

const TEST_PHONE = process.env.TEST_PHONE
const TEST_EMAIL = process.env.TEST_EMAIL

const courier = CourierClient({ authorizationToken: AUTH_KEY });

module.exports = async function (context, myTimer) {
	var timeStamp = new Date().toISOString();

	let oldResult = await getStoredData()//Retrieve from database
	let newResult =	await getRequest(GET_STORE_DATA_URL) //Make request to GET_STORE_DATA_URL

	let content = await compareResult(oldResult, newResult)
	console.log(content)
	if (await content[0] || await content[1]) {
		// SEND TO LIST AND ADD NEW RES TO DATABASE
		const { requestId } = await courier.send({
			message: {
				to: {
					email: TEST_EMAIL,
					phone_number: TEST_PHONE
				},
				template: "SET3Q2V4WNMNPNG9C5FQ2P7GT3K8",
				data: {
					recipientName: "Cole",
					steamGames: content[1],
					epicGames: content[0],
					cancelLink: "Cancel Link Placeholder"
				},
			},
		});

		uploadFile(await JSON.stringify(content))
		context.log("NOTIFICATION SENT")
	} else
		context.log("NO NOTIFICATION")

	if (myTimer.isPastDue) {
		context.log('JavaScript is quite running late!');
	}
	context.log('JavaScript timer trigger function ran!', timeStamp);
};

async function compareResult(oldRes, newRes) {
	/* console.log(oldRes) */
	let result = []
	for (let s = 0; s < newRes.length; s++) {
		for (let g = 0; g < newRes[s].length; g++) {
			if (oldRes[s] && oldRes[s].some(compare => compare.title === newRes[s][g].title)) {
				newRes[s][g] = null
			}
		}
		let newStore = newRes[s].filter(x => x !== null)
		result.push(newStore)
	}

	return result
}

async function getRequest(url) {
	let res = await fetch(url, {
		method: "GET",
	})

	return await res
}

async function getStoredData() {
	let res = await getRequest(SAVED_DATA_URL)
	return res.json()
}

async function uploadFile(data) {
	const blobServiceClient = BlobServiceClient.fromConnectionString(CONNECTION_STRING)
	const containerName = "store-data"
	const containerClient = blobServiceClient.getContainerClient(containerName)

	const blobName = "storeData.json"
	const blobkBlobClient = containerClient.getBlockBlobClient(blobName)

	const rep = await blobkBlobClient.upload(data, data.length)
}