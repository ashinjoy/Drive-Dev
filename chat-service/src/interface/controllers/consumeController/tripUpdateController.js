export class TripUpdateConsumerController{
    constructor(dependencies){
      
      
      this.tripCreateUseCase = new dependencies.useCase.TripUpdateUseCase(dependencies)
  }
  async updateTrip(data){
      try {
        //   console.log('cretaeUsesr');
          const {_id,...rest} = data
         await this.tripCreateUseCase.execute(_id,rest)
      } catch (error) {
          console.error(error);
      }
  }
}