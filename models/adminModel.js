import './connection.js';

import RegisterSchemaModel from '../schema/RegisterSchema.js';
import CategorySchemaModel from '../schema/CategorySchema.js';
import SubCategorySchemaModel from '../schema/SubCategorySchema.js';
import TenderSchemaModel from '../schema/TenderSchema.js';

class adminModel
{
    manageUserStatusModel(statusDetails)
    {
        return new Promise ((resolve, reject)=>{
            if(statusDetails.status=="block")
            {
                //to update status in collection
                RegisterSchemaModel.update({"_id":parseInt(statusDetails._id)},{"status":0},(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }
            else if(statusDetails.status=="verify")
            {
                //to update status in collection
                RegisterSchemaModel.update({"_id":parseInt(statusDetails._id)},{"status":1},(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }
            else
            {
                //to remove record from collection
                RegisterSchemaModel.remove({"_id":parseInt(statusDetails._id)},(err,result)=>{
                    err ? reject(err) : resolve(result);
                });
            }
        });
    }


    addCategoryModel(catDetails)
    {
        return new Promise((resolve,reject)=>{
        // a document instance
        var obj = new CategorySchemaModel(catDetails);

        // save model to database
        obj.save((err, result)=>{
        err ? reject(err) : resolve(result);
        });
        });
    }

    fetchCategory(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
            //to fetch users details according to condition
            CategorySchemaModel.find(condition_obj, (err, result)=>{
                err ? reject(err) : resolve(result);
            });
        })
    }

    addSubCategoryModel(subCatDetails)
    {
        return new Promise((resolve,reject)=>{
        // a document instance
        var obj = new SubCategorySchemaModel(subCatDetails);

        // save model to database
        obj.save((err, result)=>{
        err ? reject(err) : resolve(result);
        });
        });
    }

    fetchSubCategory(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
            //to fetch users details according to condition
            SubCategorySchemaModel.find(condition_obj, (err, result)=>{
                // err ? console.log(err) : console.log(result);
                err ? reject(err) : resolve(result);
            });
        });
    }

    fetchTender(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
            //to fetch users details according to condition
            TenderSchemaModel.find(condition_obj, (err, result)=>{
                // err ? console.log(err) : console.log(result);
                err ? reject(err) : resolve(result);
            });
        });
    }

    addTenderModel(tenDetails)
    {
        return new Promise((resolve,reject)=>{
        // a document instance
        var obj = new TenderSchemaModel(tenDetails);

        // save model to database
        obj.save((err, result)=>{
        err ? reject(err) : resolve(result);
        });
        });
    }

    // updateProfileModel(userDetails)
    // {
    //     return new Promise ((resolve,reject)=>{
    //         //to update profile in collection
    //         var condData = {"email":userDetails.email};
    //         var updData = {"name":userDetails.name,"mobile":userDetails.mobile,"address":userDetails.address,"city":userDetails.city,"gender":userDetails.gender};
    //         RegisterSchemaModel.update(condData,updData,(err,result)=>{
    //             err ? reject(err) : resolve(result);
    //         });
    //     });
    // }

    registerUpdateMasterModel(condData,updData)
    {
        return new Promise ((resolve,reject)=>{
            //to update profile in collection
            RegisterSchemaModel.update(condData,updData,(err,result)=>{
                err ? reject(err) : resolve(result);
            });
        });
    }
}

export default new adminModel();