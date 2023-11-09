const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient

const mongoURI = 'mongodb://gofood:Taresh@ac-lpfkhtd-shard-00-00.wy6v4pi.mongodb.net:27017,ac-lpfkhtd-shard-00-01.wy6v4pi.mongodb.net:27017,ac-lpfkhtd-shard-00-02.wy6v4pi.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-qa3aoj-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// mongodb://gofood:<password>@ac-lpfkhtd-shard-00-00.wy6v4pi.mongodb.net:27017,ac-lpfkhtd-shard-00-01.wy6v4pi.mongodb.net:27017,ac-lpfkhtd-shard-00-02.wy6v4pi.mongodb.net:27017/?ssl=true&replicaSet=atlas-qa3aoj-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("foodCategory");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);

                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
