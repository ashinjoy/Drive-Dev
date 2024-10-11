export class UserCurrentLocationController{
    constructor(dependencies){
        
        this.userCurrentLocationUseCase = new dependencies.useCase.UserCurrentLocationUseCase(dependencies)
    }
    async getCurrentLocation(req,res,next){
        try {
            const {userId,latitude,longitude} = req.body
      const currentLocation = await  this.userCurrentLocationUseCase.execute(userId,latitude,longitude)
            res.status(201).json({userDetail:currentLocation})
        } catch (error) { 
            console.error(error);
        } 
    }
} 