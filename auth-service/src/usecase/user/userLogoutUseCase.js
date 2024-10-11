export class UserLogoutUseCase{
constructor(){}
async execute(req,res){
    console.log('req.cookies',req.cookies);
    res.clearCookie('userRefreshToken')
    return 
      
}
}