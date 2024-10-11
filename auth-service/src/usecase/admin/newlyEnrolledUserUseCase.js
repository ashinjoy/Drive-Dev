import {getDailyFilters,getMonthlyFilter,getWeeklyFilters, getYearlyFilter } from '../../utils/dateFilters.js'
export class NewlyEnrolledUserUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(filter){
        try {
            let labels = []
            let newDriversData,newUsersData,newlyRegisterdUsers
           if(filter == "Daily"){
            const currentTime = new Date()
            const dateRange =  getDailyFilters(currentTime)
             newDriversData = this.driverRepository.sortDriversRegistrationByDate(dateRange)
             newUsersData = this.userRepository.sortNewlyRegisterdUsers(dateRange)
             newlyRegisterdUsers =  await Promise.all([newDriversData,newUsersData])
            // for(let i=0;i<newlyRegisterdUsers.length;i++){
            //     for(const key in newlyRegisterdUsers[i][0]){
            //         const value = newlyRegisterdUsers[i][0][key].length > 0 ? newlyRegisterdUsers[i][0][key][0].totalNewUsers : 0
            //        transformedArr.push({[key]:value}) 
            //     }
            // }  
           }else if(filter == "Weekly"){
            const currentTime = new Date()
            const dateRange = getWeeklyFilters(currentTime)
            newDriversData = this.driverRepository.sortDriversRegistrationByDate(dateRange)
            newUsersData = this.userRepository.sortNewlyRegisterdUsers(dateRange)
            newlyRegisterdUsers =  await Promise.all([newDriversData,newUsersData])
            

           }else if(filter == "Monthly"){
            const currentTime = new Date()
            const dateRange = getMonthlyFilter(currentTime)
            newDriversData = this.driverRepository.sortDriversRegistrationByDate(dateRange)
            newUsersData = this.userRepository.sortNewlyRegisterdUsers(dateRange)
            newlyRegisterdUsers =  await Promise.all([newDriversData,newUsersData])
           }else{
            const currentTime = new Date()
            const dateRange = getYearlyFilter(currentTime)
            newDriversData = this.driverRepository.sortDriversRegistrationByDate(dateRange)
            newUsersData = this.userRepository.sortNewlyRegisterdUsers(dateRange)
            newlyRegisterdUsers =  await Promise.all([newDriversData,newUsersData])
           }
            newlyRegisterdUsers.flatMap((user)=>Object.entries(user[0]).map(([key,value])=>{
            const totalUser = value.length > 0 ? value[0].totalNewUsers : 0
            labels.push({[key]:totalUser})
          }))

           return labels
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}