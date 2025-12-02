
 const apiError = (statusCode,message)=>{
    const error = Error(message)
    error.statusCode=statusCode
return error
} 
export {apiError} 