import mongoose from "mongoose";

const companyWalletSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "company_wallet",
    },
    balance: {
      type: Number,
      default:0
    },
    transactions:{
        type:[
            {
                tripId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Trip'
                },
                transactionType:{
                    type:String,
                    enum:['debit','credit'],
                },
                description:{
                    type:String
                },
                createdAt:{
                    type:Date,
                    default:Date.now
                }
            }
        ],
        default:[]
    }
  },
  {
    timestamps: true,
  }
);

export const companyWalletModel = mongoose.model(
  "companyWallet",
  companyWalletSchema
);
