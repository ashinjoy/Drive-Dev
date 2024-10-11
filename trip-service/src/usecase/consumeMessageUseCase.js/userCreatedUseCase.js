export class UserCreatedConsumerUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }

  async execute(data) {
    try {
        console.log('data',data); 
      await this.userRepository.createUser(data);
    } catch (error) {
      console.error(error);
    }
  }
}
