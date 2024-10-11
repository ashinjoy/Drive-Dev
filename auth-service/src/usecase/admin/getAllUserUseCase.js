export class GetAllUserUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(search, page) {
    try {
      const allUsers = await this.userRepository.getAllUsers(search,page)
      const totalPages = await this.userRepository.getTotalDocs(search)
      return { allUsers, totalPages };
    } catch (error) {
        console.log(error);
        throw error
        
    }

  }
}
