import pdf from 'html-pdf-node'
import fs from 'fs'
export class DownloadTripReportUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(startDate,endDate){
        try {
           const tripfareData =  await this.tripRepository.getTripReport(startDate,endDate)
           try {
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body style="display: flex; flex-direction: column; align-items: center; width: 100vw; min-height: 80vh;">
                <h2 style="margin-top: 3.5rem;">RollIN Screen Collection Report</h2>
                <h2 style="margin: 2.5rem 0px;">${"hello"}</h2>
                <table style="width: 80%; border-spacing: 0; border-collapse: collapse;">
                    <tr >
                        <th style="border: 1px solid black; padding: 1rem;">Date</th>
                        ${"screensHtml"}
                    </tr>
                    ${"content"}
                </table>
            </body>
            </html>`
            let file = { content: html }
            let options = { format: 'A4' }

        const data =  await pdf.generatePdf(file, options)
        console.log(data);
           return data
           } catch (error) {
            console.error(error);
            
           }
         
        } catch (error) {
            console.error(error);
            
        }

    }
}