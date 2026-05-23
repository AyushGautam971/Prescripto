import jwt from 'jsonwebtoken'

//doctor authentication middleware
const authDoctor  = async (req,res,next) =>{
   try{
        
        const {dtoken} = req.headers
        console.log(dtoken)
        if(!dtoken){
          return res.json({success:false,message:"Not Authorized Login Again"})   
        }

        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
       
        req.docId = token_decode.id
        console.log(req.docId)
      
        next()
   }
   catch(err){
     console.log(err)
     res.json({success:false,message:err.message})
   }
}

export default authDoctor