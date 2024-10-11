export class GetMessageUseCase{
    constructor(dependencies){
        this.chatRepository = new dependencies.repository.MongoChatRepository()
    }
    async execute(id){
try {
 const messges =  await this.chatRepository.getAllMessages(id)
 return messges
} catch (error) {
    console.error(error)
}
    }
}