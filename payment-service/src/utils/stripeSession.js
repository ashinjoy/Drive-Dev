import Stripe from "stripe";
import { configDotenv } from "dotenv";
configDotenv()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const createStripeSession = async (email, tripId, pickUpLocation, dropOffLocation, fare) => {
    console.log('Creating session...');  
    
    try {
        return await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:3000/payment-failure?session_id=${CHECKOUT_SESSION_ID}",
            customer_email: email,
            client_reference_id: tripId,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Cab Booked from ${pickUpLocation} to ${dropOffLocation}`
                    },
                    unit_amount: fare * 100
                },
                quantity: 1
            }],
        });
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
};

export const retrieveSessionData = async (sessionId) => {
    try {
        console.log('Retrieving session data...'); 
        return await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
        console.error('Error retrieving session data:', error);
        throw error;
    }
};

