export class GetDriverOfflineUseCase{
    constructor(dependencies){
this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(driverId){
        try {
            const dataToUpdate = {
                isActive:false,
                currentStatus:'inactive'
            }
            const upateDriverStatus_Inactive = await this.driverRepository.findDriverByIdAndUpdate(driverId,dataToUpdate)
            return upateDriverStatus_Inactive
        } catch (error) {
            console.error(error)
        }
    }
}