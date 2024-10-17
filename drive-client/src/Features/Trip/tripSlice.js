import { createSlice } from "@reduxjs/toolkit";
import { seacrhNearByDriver,requestRideAction,acceptTrip,startTrip,finishRide,cancelRide, payment, rideOngoing } from "./tripActions";

const trip = JSON.parse(localStorage.getItem('tripDetail'))
const tripStatus = localStorage.getItem('tripStatus')
const paymentStatus = localStorage.getItem('paymentStatus')
const paymentInfo  =localStorage.getItem('paymentInfo')
const initialState = {
    tripDetail:trip || null,
    nearbyDrivers:null,
    tripStatus:tripStatus||null,
    additionalSearchMetaData:'',
    paymentStatus:paymentStatus||null,
    paymentInfo: paymentInfo || null,
    loading:false,
    success:false,
    message:'',
    error:'' 
}
const tripSlice = createSlice({
    name:'tripSlice',
    initialState,
    reducers:{
        setTripData:(state,action)=>{
            localStorage.setItem('tripDetail',JSON.stringify(action?.payload))
            localStorage.setItem('tripStatus',action.payload?.tripStatus)
            state.tripDetail = action?.payload
            state.tripStatus = action?.payload?.tripStatus
        },
        setTripStatus:(state,action)=>{
            localStorage.setItem('tripStatus',action?.payload)
            state.tripStatus =action?.payload
        },
        setTripStatusComplete:(state,action)=>{
            localStorage.setItem('tripStatus','completed')
            state.tripStatus = 'completed'
        },
        resetTripDetails:(state,action)=>{
            localStorage.removeItem('tripDetail')
            localStorage.removeItem('tripStatus')
            localStorage.removeItem('paymentStatus')
            state.tripDetail = null
            state.tripStatus = null
        },
        setPaymentInfo:(state,action)=>{
            localStorage.setItem('paymentInfo',JSON.stringify(action.payload))
            state.paymentInfo = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(seacrhNearByDriver.pending,(state)=>{
            state.loading = true
        })
        .addCase(seacrhNearByDriver.fulfilled,(state,action)=>{
            state.success = true
            state.nearbyDrivers = action?.payload?.getNearByDrivers
            state.additionalSearchMetaData = action?.payload?.getAdditionalTripData
        })
        .addCase(seacrhNearByDriver.rejected,(state,action)=>{
            state.error = ''
        })
        .addCase(requestRideAction.pending,(state)=>{
            state.loading = true
        })
        .addCase(requestRideAction.fulfilled,(state)=>{
            state.success = true
            state.message = "Ride Requested"
        })
        .addCase(requestRideAction.rejected,(state,action)=>{
            
        })
        .addCase(acceptTrip.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(acceptTrip.fulfilled,(state,action)=>{
            localStorage.setItem('tripDetail',JSON.stringify(action?.payload?.acceptRide))
            localStorage.setItem('tripStatus','accepted')
            state.tripDetail = action?.payload?.acceptRide
            state.tripStatus ="accepted"
        })
        .addCase(cancelRide.pending,(state)=>{
            state.loading = true
        })
        .addCase(cancelRide.fulfilled,(state,action)=>{
            state.tripStatus = action?.payload?.status
            state.cancelData = action?.payload?.cancelDetails
        })
        .addCase(cancelRide.rejected,(state,action)=>{
            state.error = action?.payload
        })

        .addCase(startTrip.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(startTrip.fulfilled,(state,action)=>{
            localStorage.setItem('tripDetail',JSON.stringify(action?.payload?.tripDetail))
            localStorage.setItem('tripStatus',action.payload?.tripStatus)
            state.message = action?.payload?.message
        })
        .addCase(startTrip.rejected,(state,action)=>{
            // state.error = action?.payload
        })
        .addCase(finishRide.pending,(state)=>{
            state.loading = true
        })
        .addCase(finishRide.fulfilled,(state,action)=>{
            localStorage.removeItem('tripDetail')
            localStorage.removeItem('tripStatus')
            state.success = true
            state.message = action?.payload?.message
        })
        .addCase(finishRide.rejected,(state,action)=>{
            // state.error = 
        })
        .addCase(payment.pending,(state)=>{
            state.loading  = true
        })
        .addCase(payment.fulfilled,(state,action)=>{
            localStorage.setItem('paymentStatus',action.payload?.paymentStatus)
            state.paymentStatus = action.payload?.paymentStatus
        })
        .addCase(payment.rejected,(state,action)=>{

        })
        .addCase(rideOngoing.pending,(state)=>{
            state.loading  = true
        })
        .addCase(rideOngoing.fulfilled,(state,action)=>{
            if(action.payload.message === 'user is already in Trip'){
                localStorage.setItem('tripDetail',JSON.stringify(action.payload?.tripDetail))
                localStorage.setItem('tripStatus',action.payload?.tripDetail?.tripStatus)
                state.tripDetail = action.payload.tripDetail
                state.tripStatus = action.payload.tripDetail?.tripStatus
            }
            state.message = action?.payload?.message
        })
        .addCase(rideOngoing.rejected,(state)=>{
            // state.
        })
    }
})
export const {setTripData,resetTripDetails,setTripStatus,setPaymentInfo,setTripStatusComplete} = tripSlice.actions
export default tripSlice.reducer