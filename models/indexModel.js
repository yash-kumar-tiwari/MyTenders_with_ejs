import './connection.js';

import RegisterSchemaModel from '../schema/RegisterSchema.js';

class indexModel
{
    registerUserModel(userDetail)
    {
        return new Promise((resolve,reject)=>{
        // a document instance
        var obj = new RegisterSchemaModel(userDetail);

        // save model to database
        obj.save((err, result)=>{
        err ? reject(err) : resolve(result);
        });
        });
    }

    fetchUsers(condition_obj)
    {
        return new Promise ((resolve,reject)=>{
            //to fetch users details according to condition
            RegisterSchemaModel.find(condition_obj, (err, result)=>{
                err ? reject(err) : resolve(result);
            });
        })
    }
}

export default new indexModel();