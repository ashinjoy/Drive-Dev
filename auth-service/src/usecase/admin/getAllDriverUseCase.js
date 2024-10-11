export class GetAllDriverUseCase{
  constructor(dependencies){
   this.driverRepository = new dependencies.repository.MongoDriverRepository()
  }
  async execute(search,page){
  try {
      // const query = {};
      // console.log(query); 
      // const searchResult =
      //   search != undefined ? new RegExp(search, "i") : new RegExp(".*", "i");
      // console.log("search", searchResult);
      // const currentPage = page != undefined ? page : 1;
      // query.name = searchResult;
      // console.log(query);
      // const limit = 10;
      // console.log('data',query,currentPage,limit);
      
      // const allDrivers = await this.driverRepository.getAllDrivers(
      //   query,
      //   currentPage,
      //   limit
      // );
      // const totalPages = search
      //   ? await this.driverRepository.getTotalDocs()
      //   : allDrivers.length;
      //   console.log(allDrivers);
      // return { allDrivers, totalPages };
    const allDrivers = await this.driverRepository.getAllDrivers(search,page)
    const totalPages = await this.driverRepository.getTotalDocs(search)
    return {
      allDrivers,
      totalPages
    }
  } catch (error) {
      console.error(error);
      throw  error
      
  }
  }
} 