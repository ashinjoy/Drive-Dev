
import axios from 'axios'
export class UserCurrentLocationUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(userId,latitude,longitude){
        try {
           
        const response  =  await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`)
            const data = response.data
           console.log( data?.features[0]?.properties?.full_address)
           const locationAddress = data?.features[0]?.properties?.full_address
        const updateCoordinates  = await this.userRepository.findByIdUpdate(userId,{currentLocation:{coordinates:[longitude,latitude]}})
        return {
           id:updateCoordinates._id,
           name:updateCoordinates.name,
           email:updateCoordinates.email,
           phone:updateCoordinates.phone,
           profileImg:updateCoordinates.profileImg,
           isBlocked:updateCoordinates.isBlocked,
           isProfileComplete:updateCoordinates.isProfileComplete,
           isVerified:updateCoordinates.isVerified,
           currentLocation:updateCoordinates?.currentLocation,
           locationAddress
        }
        } catch (error) {
            console.error(error);
            
        }
}
}