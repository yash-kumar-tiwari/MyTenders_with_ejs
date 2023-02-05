//Require Mongoose
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const TenderSchema = mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    required: [true,"title is required"],
    lowercase: true,
    trim: true,
  },
  subcatnm: {
    type: String,
    required: [true,"SubCategory is required"],
    lowercase: true,
    trim: true
  },
  tenderdesc: {
    type: String,
    required: [true,"Description is required"],
    trim: true
  },
  tenderdocnm: {
    type: String,
    required: [true,"Tender Doc Name is required"],
    trim: true
  },
  enddate: {
    type: String,
    required: [true,"End Date is required"],
    trim: true
  },
  info: String
});

// Apply the uniqueValidator plugin to RegisterSchema.
TenderSchema.plugin(uniqueValidator);

// compile schema to model
const TenderSchemaModel = mongoose.model('tender_tmp', TenderSchema ,'tenderdetails');

export default TenderSchemaModel;