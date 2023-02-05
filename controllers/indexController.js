import indexModel from '../models/indexModel.js';

class indexController
{
    registerUser(userDetail)
    {
        // console.log(userDetail);
        return new Promise ((resolve,reject)=>{

            indexModel.fetchUsers({}).then((result)=>{
                // console.log(result);
                var len = result.length;
                var _id = (len==0)? 0: result[len-1]._id+1;

                userDetail = {...userDetail, "_id":_id ,"status":0, "role":"user","info":Date()};
                indexModel.registerUserModel(userDetail).then((result)=>{
                resolve(result);
                }).catch((err)=>{
                reject(err);
                });

            }).catch((err)=>{
                reject(err);

            });

            

        });
    }

    userLogin(userDetails)
    {
        userDetails = {...userDetails, "status":1};
        return new Promise ((resolve,reject)=>{
            indexModel.fetchUsers(userDetails).then((result)=>{
                var len = result.length;
                var status = (len==0)?0:((result[0].role=="admin")?1:2);
                resolve({"status":status,"userDetailsRes":result[0]});
            }).catch((err)=>{
                reject(err);
            });

        });

    }

}

export default new indexController();