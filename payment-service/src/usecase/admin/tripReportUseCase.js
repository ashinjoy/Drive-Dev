import { getDailyFilters,getWeeklyFilters,getMonthlyFilter,getYearlyFilter} from "../../utils/dateFilters.js";
export class TripReportUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(filter){
      try {
        let labels = []
        let tripCompletedStat
        
       if(filter == "Daily"){
        const currentTime = new Date()
        const dateRange =  getDailyFilters(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange) 
       }else if(filter == "Weekly"){
        const currentTime = new Date()
        const dateRange = getWeeklyFilters(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)
       }else if(filter == "Monthly"){
        const currentTime = new Date()
        const dateRange = getMonthlyFilter(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)
       }else{
        const currentTime = new Date()
        const dateRange = getYearlyFilter(currentTime)
        tripCompletedStat = await this.tripRepository.tripSalesReport(dateRange)
       }

     try{ 

      const data =  tripCompletedStat.map((el)=>Object.entries(el)).flat()
      
       data.map(([key, value]) =>{
        const totalRide = value.length > 0 ? value[0].totalAmountFromTrips : 0
        labels.push({[key]:totalRide})
      });
      }catch(error){
        console.error(error);
        throw error
        
      }
      
      return labels
      } catch (error) {
        console.error(error);
        throw error
        
      }

    }
}