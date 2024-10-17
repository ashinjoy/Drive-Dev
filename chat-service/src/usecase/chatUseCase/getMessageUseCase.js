export class GetMessageUseCase {
  constructor(dependencies) {
    this.chatRepository = new dependencies.repository.MongoChatRepository();
    this.tripRepository = new dependencies.repository.MongoTripRepository()
  }
  async execute(tripId) {
    try {
      const getMessage =  await this.chatRepository.getAllMessages(tripId);
      const getSenderRecieverData = await this.tripRepository.getChatNames(tripId)
      console.log('getMessage',getMessage);
      console.log('names',getSenderRecieverData);
      
      const messagesInfo = {
        userName:getSenderRecieverData?.userId?.name,
        driverName:getSenderRecieverData?.driverId?.name,
        messages:getMessage
      }
      return messagesInfo 
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
