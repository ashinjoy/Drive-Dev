export class DownloadReportController{
    constructor(dependencies){
this.downloadTripReportUseCase = new dependencies.useCase.DownloadTripReportUseCase(dependencies)
    }
    async downloadReport(req,res,next){
        try {
            const {startDate,endDate} = req.body
            console.log(req.body);
            
          const datas =  await this.downloadTripReportUseCase.execute(startDate,endDate)
          console.log('fsss',datas.length);
          
          res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=report.pdf',
            'Content-Length': datas.length,
        });

        // Send the PDF buffer
        res.status(201).send(datas);
        } catch (error) {
            console.error(error);
            next(error)
            
        }
    }
}