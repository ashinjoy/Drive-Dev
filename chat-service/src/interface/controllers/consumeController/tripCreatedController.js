export class TripCreateConsumerController{
    constructor(dependencies){
      
      
      this.tripCreateUseCase = new dependencies.useCase.TripCreateUseCase(dependencies)
  }
  async createTrip(data){
      try {
        //   console.log('cretaeUsesr');
         await this.tripCreateUseCase.execute(data)
      } catch (error) {
          console.error(error);
      }
  }
}