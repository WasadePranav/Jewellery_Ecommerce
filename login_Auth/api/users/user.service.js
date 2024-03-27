// const { Result } = require("express-validator")
const pool = require ("../../../login/config/database")
module.exports={
    create:(data, callBack)=>{
        console.log('running')
        pool.query(
            'insert into registration(FirstName,LastName,Gender,Email,Password,Number) values(?,?,?,?,?,?)',
            [
                data.FirstName,
                data.LastName,
                data.Gender,
                data.Email,
                data.Password,
                data.Number,
            ],
            (error ,results ,fields)=>{
                if(error){
                  return  callBack(error)
                }
                return callBack(null,results)
            }
        )
    },
   
     getUser: callBack =>{
pool.query (
    'select id ,Firstname ,Lastname ,Gender,Email,Number from registration ',
    [],
    (error,results,fields)=>{
        if(error){
            return callBack(error);
        }
        return callBack(null ,results)

    }
)
    },
    getByUserId: (id, callBack)  => {
        pool.query(
            'SELECT id, FirstName, LastName, Gender, Email, Number FROM registration WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    

    updateUser: (data, callBack) => {
        pool.query(
            'UPDATE registration SET Firstname=?, Lastname=?, Gender=?, Email=?, Number=? WHERE id=?',
            [
                data.FirstName,
                data.LastNme,
                data.Gender,
                data.Email,
                data.Number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                if(!results){
                    return res.json({
                        success:0,
                        message:"Failed to update user"
                    })
                }
                return callBack(null, results);
            }
        );
    },
    deleteUser:(data,callBack)=>{
pool.query(
    'delete from registration where id=?',
    [data,id,],
    (error,results,fields) =>{
        if(error){
         return   callBack(error);

        }
        return callBack(null, results[0])
    }

    
)
    },

    getUserByUserEmail:(email ,callBack)=>{
        pool.query(
            'select * from registration where Email=?',
            [email],
            (error ,results ,fields)=>{
                if(error){
                    callBack(error)
                }
                return callBack (null,results)
            }
        )
    }
};

