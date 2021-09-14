/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const express = require("express");
const cors = require("cors");
const hostname  = 'localhost';
const port = 3035;

const app = express();
app.use(cors());

app.get('/api/getData', function (req, res) {
    const sQuery = req.query.search ? req.query.search.toLowerCase() : "";
    const aResults = data.filter(oItem => {
        if (oItem.name.toLowerCase().includes(sQuery) || oItem.about.toLowerCase().includes(sQuery)) {
            if (oItem.isActive === "true") {
                return oItem;
            }
        }
    });

    res.json({results: aResults});
});

app.listen(`${port}`, () => {
    console.log(`[Server running on ${hostname}:${port}]`);
});
