const pool =require ("../../config/database")

module.exports={
    create:(data,callBack)=>{

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
            (error ,results,fields)=>{
                if(error){
                  return  callBack(error)

                }
                return callBack(null,results)
            }
        );
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
     
    getUsersByUserId: (id, callBack) => {
        pool.query (
            'select id ,Firstname ,Lastname ,Gender,Email,Number from registration where id=? ',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.length ? results[0] : null); // Check if any results were returned
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            'UPDATE registration SET FirstName=?, LastName=?, Gender=?, Email=?, Password=?, Number=? WHERE id=?',
            [
                data.FirstName,
                data.LastName,
                data.Gender,
                data.Email,
                data.Password,
                data.Number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                callBack(null, results.affectedRows);
            }
        );
    },

    deleteUser: (id, callBack) => {
        pool.query(
            'DELETE FROM registration WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results.affectedRows > 0);
            }
        );
    }
     ,
    
    

    getUsersByUserEmail:(email ,callBack)=>{
        pool.query(
            "select * from registration where email=?",
            [email],
            (error ,results, fields)=>{
                if(error){
                    callBack(error);
                }
   
            return callBack(null , results[0]); 
         }

        )
    }
}