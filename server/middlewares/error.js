class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

  }     
}


const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';   
    res.status(statusCode).json({
        success: false,
        message
    });


    if(err.code === 11000 ) {
        const message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        error = new ErrorHandler(message, 400);
    }


    if(err.name === 'jsonWebTokenError') {
        const message = 'JSON Web Token is invalid, try again';
        error = new ErrorHandler(message, 400);
    }

    if(err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired, try again';
        error = new ErrorHandler(message, 400);
    }

    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    const errorMessage = err.errors
     ? Object.values(err.errors)
     .map((val) => val.message)
     .join(', ') 
     : err.message;

     return res.status(statusCode).json({
        success: false,
        message: errorMessage
     });
   
    
    
}

export default errorMiddleware;