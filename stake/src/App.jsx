import { useState } from "react"
import Wallet from "./components/Wallet/Wallet"
import Navigation from "./components/Navigation/Navigation"
import DisplayPannel from './components/Display Pannel/DisplayPannel'
import TokenApproval from './components/StakeToken/TokenApproval'
import StakeAmount from './components/StakeToken/StakeAmount'
import WithdrawStakeAmount from './components/Withdraw/Withdraw'
//import Withdra from './components/Withdraw/Withdraw'
import GetToken from "./components/Mint/getToken"
import { StakingProvider } from './context/StakingContext'
import './App.css'
import ClaimReward from "./components/ClaimReward/ClaimReward"
function App() {

  const [displaySection, setDisplaySection] = useState("stake");

  const handleButtonClick = (section) => {
    setDisplaySection(section);
  };

  return (
    // <div className="main-section">
    //   <Wallet>
    //     <Navigation/>
    //     <StakingProvider>
    //       <DisplayPannel/>
    //       <StakeAmount/>
    //       <WithdrawStakeAmount/>
    //     </StakingProvider>
    //     <TokenApproval/>
    //     <ClaimReward/>
    //   </Wallet>
    // </div>
    (
      <div className="main-section">
        <Wallet>
          <Navigation />
          <StakingProvider>
            <DisplayPannel />
            <div className="main-content">
              <div className="button-section">
                <button
                  onClick={() => handleButtonClick("stake")}
                  className={displaySection === "stake" ? "" : "active"}
                >
                  Stake
                </button>
                <button
                  onClick={() => handleButtonClick("withdraw")}
                  className={displaySection === "withdraw" ? "" : "active"}
                >
                  Withdraw
                </button>
                {/* 222 */}
                <button
                  onClick={() => handleButtonClick("get tokens")}
                  className={displaySection === "get tokens" ? "" : "active"}
                >
                  Get Tokens
                </button>
              </div>
              {displaySection === "stake" && (
                <div className="stake-wrapper">
                  <TokenApproval />
                  <StakeAmount />
                </div>
              )}
              {displaySection === "withdraw" && (
                <div className="stake-wrapper">
                  <WithdrawStakeAmount />
                </div>
              )}
               {displaySection === "get tokens" && (
                <div className="stake-wrapper">
                  <GetToken/>
                </div>
              )}
            </div>
          </StakingProvider>
        </Wallet>
      </div>
    )
  )
}

export default App
