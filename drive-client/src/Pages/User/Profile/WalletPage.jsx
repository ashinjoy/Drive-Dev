import React, { useEffect, useState } from 'react'
import WalletCard from '../../../Components/User/Wallet/WalletCard'
import UserNavbar from '../../../Components/Navbar/UserNavbar'
import WalletHistory from '../../../Components/User/Wallet/WalletHistory'


function WalletPage() {
const [walletHistory,setWalletHistory] = useState([])
  return (
    <>
    <UserNavbar/>
    <div className=' w-[30%] h-screen flex flex-col justify-center items-center gap-8 py-[7rem]'>
    <WalletCard component={'userBalance'}/>
    <WalletCard component={'addMoney'} setWalletHistory={setWalletHistory}/>
    </div>
<WalletHistory userType={'user'} walletHistory={walletHistory} setWalletHistory={setWalletHistory} />
    </>
  )
}

export default WalletPage
