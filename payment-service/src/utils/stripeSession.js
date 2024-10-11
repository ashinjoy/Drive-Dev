
import Stripe from "stripe"
export const creatStripSession =async(email,tripId,pickUpLocation,dropOffLocation,fare)=>{
    const  stripe =   new Stripe(process.env.STRIPE_SECRET_KEY)
   return await stripe.checkout.sessions.create({
     payment_method_types:['card'],
     mode:'payment',
     success_url:"http://localhost:3000/payment-success",
     cancel_url:"http://localhost:3000/payment-failure",
     customer_email:email,
     client_reference_id:tripId,
     line_items:[{
         price_data:{
             currency:'inr',
         product_data:{
             name:`Cab Booked from ${pickUpLocation} to ${dropOffLocation}`
         },
         unit_amount:fare * 100
         },
         quantity:1
     }],
    })
}