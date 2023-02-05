import indexModel from '../models/indexModel.js';
import adminModel from '../models/adminModel.js';

class adminController
{
    fetchUsers(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
            indexModel.fetchUsers(condition_obj).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    }
    manageUserStatus(statusDetails)
    {
        return new Promise ((resolve,reject)=>{
            adminModel.manageUserStatusModel(statusDetails).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        });
    }

    addCategory(catDetails)
    {
        return new Promise ((resolve,reject)=>{

            adminModel.fetchCategory({}).then((result)=>{
                // console.log(result);
                var len = result.length;
                var _id = (len==0)? 1: result[len-1]._id+1;

                catDetails = {...catDetails, "_id":_id};
                adminModel.addCategoryModel(catDetails).then((result)=>{
                resolve(result);
                }).catch((err)=>{
                   reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });
        });

    }

    addSubCategory(subCatDetails)
    {
        return new Promise ((resolve,reject)=>{

            adminModel.fetchSubCategory({}).then((result)=>{
                // console.log(result);
                var len = result.length;
                var _id = (len==0)? 1: result[len-1]._id+1;

                subCatDetails = {...subCatDetails, "_id":_id};
                adminModel.addSubCategoryModel(subCatDetails).then((result)=>{
                resolve(result);
                }).catch((err)=>{
                   reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });
        });

    }

    addTender(tenDetails)
    {
        return new Promise ((resolve,reject)=>{

            adminModel.fetchTender({}).then((result)=>{
                // console.log(result);
                var len = result.length;
                var _id = (len==0)? 1: result[len-1]._id+1;

                tenDetails = {...tenDetails, "_id":_id,"info":Date()};
                adminModel.addTenderModel(tenDetails).then((result)=>{
                resolve(result);
                }).catch((err)=>{
                   reject(err);
                });
            }).catch((err)=>{
                reject(err);
            });
        });

    }

    // updateProfile(userDetails)
    // {
    //     return new Promise ((resolve,reject)=>{
    //         adminModel.updateProfileModel(userDetails).then((result)=>{
    //             resolve(result);
    //         }).catch((err)=>{
    //             reject(err);
    //         });
    //     })
    // }

    registerUpdateMaster(condData,updData)
    {
        return new Promise ((resolve,reject)=>{
            adminModel.registerUpdateMasterModel(condData,updData).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        })
    }
}

export default new adminController();