const {MongoClient} = require("mongodb");

module.exports = {
    db: {},
    async connect() {
        try{
            //const client = await MongoClient.connect("mongodb://localhost:27017");
            const client = await MongoClient.connect(process.env.MongoURL);
           // this.db = client.db("room_booking");
            this.db=client.db(process.env.Mongodb)
        } catch(err) {
            console.log(err)
        }
    }
}