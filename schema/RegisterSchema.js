//Require Mongoose
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const RegisterSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true,"Name is required"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true,"Username is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true,"Password is required"],
    maxlength: 10,
    minlength:5,
    trim: true
  },
  mobile: {
    type: String,
    required: [true,"Mobile is required"],
    maxlength: 10,
    minlength:10,
    trim: true
  },
  address: {
    type: String,
    required: [true,"Address is required"],
    trim: true
  },
  city: {
    type: String,
    required: [true,"City is required"],
    trim: true
  },
  gender: {
    type: String,
    required: [true,"Gender is required"],
  },
  role: String,
  status: Number,
  info: String
});

// Apply the uniqueValidator plugin to RegisterSchema.
RegisterSchema.plugin(uniqueValidator);

// compile schema to model
const RegisterSchemaModel = mongoose.model('reg_tmp', RegisterSchema ,'register');

export default RegisterSchemaModel;