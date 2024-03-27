const {validationResukt}= require ('express-validator')

 const register = ( req, res ) =>{
    const errors =validationResukt(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
}

module.exports= {
    register
}