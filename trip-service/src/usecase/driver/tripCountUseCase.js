import { getDailyFilters,getWeeklyFilters,getMonthlyFilter,getYearlyFilter} from "../../utils/dateFilters.js";
export class TripCountUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(driverId,filter){
        console.log('em');
        
        let labels = []
        let tripCompletedStat
        
       if(filter == "Daily"){
        const currentTime = new Date()
        const dateRange =  getDailyFilters(currentTime)
        console.log("dat",dateRange);
        console.log(driverId);
        
        tripCompletedStat = await this.tripRepository.getDriverTripCompletedStat(driverId,dateRange)
        console.log('trip',tripCompletedStat);
        
        
       }else if(filter == "Weekly"){
        const currentTime = new Date()
        const dateRange = getWeeklyFilters(currentTime)
        tripCompletedStat = await this.tripRepository.getDriverTripCompletedStat(driverId,dateRange)
       
        

       }else if(filter == "Monthly"){
        const currentTime = new Date()
        const dateRange = getMonthlyFilter(currentTime)
        tripCompletedStat = await this.tripRepository.getDriverTripCompletedStat(driverId,dateRange)
       
       }else{
        const currentTime = new Date()
        const dateRange = getYearlyFilter(currentTime)
        tripCompletedStat = await this.tripRepository.getDriverTripCompletedStat(driverId,dateRange)
       }
       console.log('hei');
       console.log(tripCompletedStat);
       
     try{  
      const data =  tripCompletedStat.map((el)=>Object.entries(el)).flat()
      console.log(data);
      const result = data.map(([key, value]) =>{
        const totalRide = value.length > 0 ? value[0].totalRidesCompleted : 0
        labels.push({[key]:totalRide})
      });
    //   labels.push({

    //   })
      
      
      
      }catch(error){
        console.error(error);
        
      }
      console.log('lll',labels);
      return labels
    }
}