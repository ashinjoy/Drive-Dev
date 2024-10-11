export class LocationAutoCompleteController{
constructor(dependencies){
this.autoCompleteUseCase = new dependencies.useCase.LocationAutoCompleteUseCase(dependencies)
this.reverseGeocode = new dependencies.useCase.ReverseGeoCodeUseCase(dependencies)
}
async autoComplete(req,res,next){
    try {
        const {search} = req.query
        const coordsPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?((1[0-7]\d(\.\d+)?|180(\.0+)?)|\d{1,2}(\.\d+)?)$/
        const isCoordinates = search.split(',')
        console.log("iscooeds",isCoordinates);
        if(coordsPattern.test(search)){
         const searchResult =   await this.reverseGeocode.execute(isCoordinates)
         res.status(200).json({searchResult})
         return
        }
          const searchResults =   await this.autoCompleteUseCase.execute(search)
          res.status(200).json({searchResults})
        

    } catch (error) {
        console.error(error);
        next(error)
    }
}
}