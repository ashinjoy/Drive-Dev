

export class ReviewRatingUseCase{
    constructor(dependencies){
        this.tripRepository  = new dependencies.repository.MongoTripRepository()
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
        this.reviewRepository = new dependencies.repository.MongoReviewRepository()
    }
    async execute(body){
        try {
            const {userId,driverId,tripId,review,rating} = body
            if(!userId  || !driverId || !tripId || !review ||!rating){
                const error = new Error()
                error.message = 'Bad request! Insufficient info'
                error.status = 400
                throw error
            }
           const feedback =  await this.reviewRepository.createReviewRatings({tripId,userId,driverId,review,rating})
           console.log('feedback',feedback);
           const ratings = await this.reviewRepository.getAverageRatingByDriverId(driverId)
            console.log('rating',ratings[0].averageRating);
            const driverRating = ratings[0].averageRating
           this.driverRepository.findDriverByIdAndUpdate(driverId,{ratings:Math.ceil(driverRating)})    
            return
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}