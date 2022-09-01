const { getGames } = require('epic-free-games')
const request = require('request-promise')
const cheerio = require('cheerio');
const dotenv = require('dotenv');

dotenv.config()

const EPIC_BASE_URL = process.env.EPIC_BASE_URL;
const STEAM_URL = process.env.STEAM_URL

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const result = await main();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };

    async function main() {
        let result = [];
        let epicResult = await processEpicGames();
        let steamResult = await processSteamGames();
    
        result.push(epicResult)
        result.push(steamResult)
    
        return result
    }

    /**
     * It takes the data from the Epic Games Store API, and returns an array of objects containing the
     * title, url, and image of each game.
     * 
     * The function is asynchronous, so it returns a promise.
     * 
     * The function uses the `getGames` function from the previous section to get the data from the Epic
     * Games Store API.
     * 
     * The function then loops through the data, and creates an object for each game.
     * 
     * The object contains the title, url, and image of the game.
     * 
     * The function then pushes the object into an array, and returns the array.
     * @returns An array of objects.
     */
    async function processEpicGames() {
        let res = await getGames("US", false);
        let epicData = []
    
        res.currentGames.forEach(cGame => {
            let gameData = {}
    
            gameData.title = cGame.title
            gameData.url = EPIC_BASE_URL + cGame.urlSlug
            gameData.image = cGame.keyImages.filter(function(img){return img.type == "OfferImageWide"})[0].url

            epicData.push(gameData);
        });
    
        return epicData
    }

    /**
     * It takes the HTML from a Steam page, and returns an array of objects containing the title, url, and
     * image of each game on the page.
     * 
     * The function is asynchronous, so it returns a promise.
     * 
     * The function uses the request and cheerio libraries to scrape the page.
     * 
     * The function uses CSS selectors to find the HTML elements that contain the data we want.
     * 
     * The function loops through the HTML elements, and pushes the data into an array.
     * 
     * The function returns the array.
     * @returns An array of objects.
     */
    async function processSteamGames() {
        
        // CSS Selectors
        const LIST_SELECTOR = "#search_resultsRows";
        const TITLE_SELECTOR = ".title";
        const URL_SELECTOR = ".search_result_row";
        const IMG_SELECTOR = ".search_capsule > img:nth-child(1)"

        //Request and scrape page
        let pageHtml = await request.get(STEAM_URL)
        let page$ = await cheerio.load(pageHtml);
        let steamData = []
    
        let length = await page$(LIST_SELECTOR).children().length;
    
        //Get data from HTML elements
        for (let i = 0; i < length; i++) {
            let gameData = {}
    
            gameTitle = await page$(LIST_SELECTOR).children().eq(i).find(TITLE_SELECTOR).text();
            gameUrl = await page$(LIST_SELECTOR).children(URL_SELECTOR).eq(i).attr("href")
            gameImg = await page$(LIST_SELECTOR).children().eq(0).find(IMG_SELECTOR).attr("src")
    
            gameData.title = gameTitle
            gameData.url = gameUrl
            gameData.image = gameImg
    
            steamData.push(gameData)
        }
    
        return steamData
    }
}