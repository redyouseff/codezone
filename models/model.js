const mongoose =require("mongoose");
const schema =new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

module.exports={ Course: mongoose.model("courses",schema)


}

