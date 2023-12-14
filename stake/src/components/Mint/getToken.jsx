import { useContext,useRef } from "react";
import {ethers} from "ethers"
import Web3Context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import Button from "../Button/Button";
import { toast } from "react-hot-toast";
import "./getToken.css"

const getToken =()=>{
 const {stakingContract}=useContext(Web3Context);
 const {isReload,setIsReload}=useContext(StakingContext)
 const getStakeAmountRef = useRef();


 const getStakeToken=async(e)=>{
   e.preventDefault();
   const amount = getStakeAmountRef.current.value.trim();
   console.log(amount)
   if(isNaN(amount) || amount<=0){
    console.error("Please enter a valid positive number");
    return;
   }
   const amountToget = ethers.parseUnits(amount,18).toString();
   console.log(amountToget)
   try{
    const transaction = await stakingContract.getToken(amountToget)
    await toast.promise(transaction.wait(),
    {
      loading: "Transaction is pending...",
      success: 'Transaction successful 👌',
      error: 'Transaction failed 🤯'
    });
    getStakeAmountRef.current.value = "";
    setIsReload(!isReload);
    const receipt = await transaction.wait();
    if (receipt.status === 1) {
        setIsReload(!isReload);
        getStakeAmountRef.current.value = "";
      } else {
          toast.error("Transaction failed. Please try again.")
      }
    } catch (error) {
      toast.error("Staking Failed");
      console.error(error.message)
    }
  };
    return (
        <form className="withdraw-form" onSubmit={getStakeToken}>
          <label>Stake Token Address : <br/> 0xB4D2095B7EF378F591b1B22a03Db7025708F562D</label>
  <label>Reward Token Address : <br/>0xB4D2095B7EF378F591b1B22a03Db7025708F562D</label>
        
            <label>Enter Token Amount:</label>
            <input type="text" ref={getStakeAmountRef} />
            <Button
            onClick={getStakeToken}
            type="submit"
            label="Get Stake Token"
            />
      </form>
       )
}
export default getToken;
// import { useContext,useRef, useState } from "react";
// import {ethers} from "ethers"
// import Web3Context from "../../context/Web3Context";
// import Button from "../Button/Button";
// import { toast } from "react-hot-toast";
// const Withdraw =()=>{
//  const {stakeTokenContract,stakingContract}=useContext(Web3Context);
//  const withdrawTokenRef = useRef();
// const[transactionStatus,setTranscationStatus]= useState(""); 
//  const withdrawToken=async(e)=>{
//    e.preventDefault();
//    const amount = withdrawTokenRef.current.value.trim();
//    if(isNaN(amount) || amount<=0){
//     console.error("Please enter a valid positive number");
//     return;
//    }
//    const amountToSend = ethers.parseUnits(amount,18).toString();
//    try{
//     const transaction = await stakingContract.withdrawStakedTokens(amountToSend);
//     await toast.promise(transaction.wait(),
//     {
//       loading: "Transaction is pending...",
//       success: 'Transaction successful 👌',
//       error: 'Transaction failed 🤯'
//     });
//     withdrawTokenRef.current.value = "";
//     // const receipt = await transaction.wait();
//     // if (receipt.status === 1) {
//     //     toast.success("Transaction is successful")
//     //     approvedTokenRef.current.value = "";
//     //   } else {
//     //       toast.error("Transaction failed. Please try again.")
//     //   }
//     } catch (error) {
//       toast.error("Token Approval Failed");
//       console.error(error.message)
//     }
//   };
//  return (
//   <div>
//      {transactionStatus && <div>{transactionStatus}</div>}
//      <form onSubmit={withdrawToken} className="token-amount-form">
//         <label className="token-input-label">Stake:</label>
//         <input type="text" ref={withdrawTokenRef} />
//         <Button onClick={withdrawToken} type="submit" label="Withdraw Amount" />
//            </form>
//  </div>
//  )
// }
// export default Withdraw;