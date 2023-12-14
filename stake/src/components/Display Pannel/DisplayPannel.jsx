import EarnedReward from "./EarnedReward";
import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";

const DisplayPannel = ()=>{
    return(<div>
        <StakedAmount/>
        <RewardRate/>
        <EarnedReward/>
     
    </div>)
}
export default DisplayPannel;