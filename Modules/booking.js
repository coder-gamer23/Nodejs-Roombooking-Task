const mongo = require('../shared/connect');

module.exports.getAvailability = async (req,res,next) => {
    try {
        //var data = await mongo.db.collection("room_availability").find().toArray();
        var data = await mongo.db.collection(process.env.maintable).find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.bookRoom = async (req,res,next) => {
    try{
    //var con=await mongo.db.collection("room_availability").find({Room_id : req.body.RoomId}).toArray();
    var con=await mongo.db.collection(process.env.maintable).find({Room_id : req.body.RoomId}).toArray();
    //console.log(con);
    if(con.length!=0)
    {   
    try {
        //let data = await mongo.db.collection(process.env.table1).insertOne(req.body);
        let data1 = await mongo.db.collection(process.env.table2).insertOne(req.body);
        await mongo.db.collection(process.env.maintable).updateOne({Room_id : req.body.RoomId},{$set:{BookedStatus:"Booked"}});
        res.send(data1);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }

   }
else{
   res.status(500).send("Invalid room id");
   }
} catch(err){
    console.log(err);
        res.status(500).send(err);
}
}

module.exports.getRoombookedDetails = async (req,res,next) => {
    try {
        let data = await mongo.db.collection(process.env.maintable).find({BookedStatus:"Booked"}).toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports.getCustomerbookedDetails = async (req,res,next) => {
    try {
        let data = await mongo.db.collection(process.env.table2).find().toArray();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}
module.exports.getclear=async(req,res,next)=>{
    try{
        let data = await mongo.db.collection(process.env.maintable).updateMany({BookedStatus:"Booked"},{$set:{BookedStatus:"Available"}});
        let data1=await mongo.db.collection(process.env.maintable).find().toArray();
        let data2=await mongo.db.collection(process.env.table2).remove();
        res.send(data1);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

}