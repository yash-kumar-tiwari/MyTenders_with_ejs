import adminModel from "../models/adminModel.js";
import indexModel from "../models/indexModel.js";

class userController
{
    fetchCategory(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
        adminModel.fetchCategory(condition_obj).then((result)=>{
            resolve(result);
        }).catch((err)=>{
            reject(err);            
        });
        });
    }

    fetchSubCategory(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
        adminModel.fetchSubCategory(condition_obj).then((result)=>{
            resolve(result);
        }).catch((err)=>{
            reject(err);            
        });
        });
    }

    fetchTenders(tenDetails)
    {
        return new Promise ((resolve,reject)=>{
            adminModel.fetchTender(tenDetails).then((result)=>{
                resolve(result);
            }).catch((err)=>{
                reject(err);
            });
        })
    }
}
export default new userController();