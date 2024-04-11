const mongoose=require("mongoose");


mongoose.connect("mongodb+srv://kinshuokmunjal:kmunjal654@cluster0.kzwzut4.mongodb.net/splititup");
const UserSchema = new mongoose.Schema({
    username:String,
    password: String,
    firstName:String,
    lastName:String,
});

const GroupSchema =new mongoose.Schema({
    name:String,

    members :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }]
});
const ExpenseSchema =new mongoose.Schema(
    {
    description:String,
    total_amount: Number,
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    participants:[{user :{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
        firstName:String,
        amount_owed:Number
}],
    group_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
    },
    settled_by:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    complete:{
        type:Boolean,
        default:false,
    }
});
const User= mongoose.model("User",UserSchema);
const Group= mongoose.model("Group",GroupSchema);
const Expenses= mongoose.model("Expense",ExpenseSchema);

module.exports ={
    User,
    Group,
    Expenses,
};


