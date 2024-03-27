require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/categories/:categoryname/products", async (req, res) => {
    const { categoryname } = req.params;
    const { n, page } = req.query;
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const response = await axios.post(`http://20.244.56.144/test/auth`, {
        "companyName": "IIITBH",
        "clientID": "26951613-bf01-49a0-94a0-89835f12ceb9",
        "clientSecret": "BMAgOpVqzwXHqskQ",
        "ownerName": "Nandini Pandey",
        "ownerEmail": "nandini.2101082ec@iiitbh.ac.in",
        "rollNo": "2101082EC"
    })
    await Promise.all([
        axios.get(`http://20.244.56.144/test/companies/${companies[0]}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`, {
            headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        }),
        axios.get(`http://20.244.56.144/test/companies/${companies[1]}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`, {
            headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        }),
        axios.get(`http://20.244.56.144/test/companies/${companies[2]}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`, {
            headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        }),
        axios.get(`http://20.244.56.144/test/companies/${companies[3]}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`, {
            headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        }),
        axios.get(`http://20.244.56.144/test/companies/${companies[4]}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`, {
            headers: {
                Authorization: `${response.data.token_type} ${response.data.access_token}`
            }
        }),
    ]).then((responses) => {
        const products = responses.map((response) => response.data).flat().sort((a, b) => b.rating - a.rating);
        const start = (page - 1) * n;
        const end = page * n;
        if (n > 10)
            return res.json(products.slice(start, end));
        else
            return res.json(products);
    }).catch((error) => {
        console.log(error.response)
        return res.status(500).json({ error: error.message });
    });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000...`);
});