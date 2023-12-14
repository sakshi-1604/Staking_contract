import {ethers,Contract} from "ethers";
import stakingAbi from "../ABI/stakingAbi.json"
import stakeTokenAbi from "../ABI/stakeTokenAbi.json";
import Web3Context from "../context/Web3Context";

export const connectWallet = async()=>{
    try{
       let [signer,provider,stakingContract,stakeTokenContract,chainId]=[null,null,null,null,null];
       if(window.ethereum===null){
          throw new Error("Metamask is not installed");
       }
       const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
       })

       let chainIdHex= await window.ethereum.request({
        method:'eth_chainId'
       })
       chainId= parseInt(chainIdHex,16)
       
       let selectedAccount =accounts[0];
       if(!selectedAccount){
        throw new Error("No ethereum accounts available")
       } 

       provider = new ethers.BrowserProvider(window.ethereum);
       signer = await provider.getSigner();

       const stakingContractAddress="0x8bd92c9604aEdD2100634b2f4c6021368e140097"
       const stakeTokenContractAddress="0xB4D2095B7EF378F591b1B22a03Db7025708F562D"

       stakingContract= new Contract(stakingContractAddress,stakingAbi,signer);
       stakeTokenContract=new Contract(stakeTokenContractAddress,stakeTokenAbi,signer);
       console.log("acc3:",selectedAccount,"stake:",stakeTokenContractAddress,"chain id:",chainId);
    
       return {provider,selectedAccount,stakeTokenContract,stakingContract,chainId}

    }catch(error){
        console.error(error);
        throw error
    }
    
}