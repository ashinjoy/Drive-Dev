import twilio from 'twilio'

export const twilioAlertMessage = async(userInfo,savedContacts)=>{
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_ACCOUNT_PHONE
    console.log("authLogin",accountSid,authToken);
    
    const client = twilio(accountSid, authToken); 
    console.log("userIndo",userInfo);
    
        const messageBody = `
    🚨 Emergency Alert 🚨
    
 is currently in an emergency situation and requires immediate assistance.
**Details:**
- **Location:** Arror
 
- **Time:** ${userInfo.phone}
- **Contact:** ${userInfo?.email}
- **Contact:** ${userInfo?.phone}


Please reach out to ${userInfo?.name} as soon as possible to provide help. If you are unable to assist directly, consider contacting emergency services on their behalf.

Thank you for your prompt attention.

- Sent via DRIVE
   `;
//    return Promise.all()
try {
const alertPromises = savedContacts.map((element)=>{
    console.log('twiliophone',process.env.TWILIO_ACCOUNT_PHONE);
    
return client.messages.create({
        body: messageBody,
        from:process.env.TWILIO_ACCOUNT_PHONE,
        to:`+91${element.phoneNumber}`
      });    

    // console.log("messs",mesasgae);
})


const data = await Promise.all(alertPromises)
console.log("promised",alertPromises);

          
    } catch (error) {
        console.error(error);
    }
}