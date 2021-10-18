import MainNavBar from "../components/NavBar/MainNavBar";
import LiveMatchCard from "../components/Matches/MatchCards/LiveMatchCard";
import UpcomingMatchCard from "../components/Matches/MatchCards/UpcomingMatchCard";
import FinishedMatchCard from "../components/Matches/MatchCards/FinishedMatchCard";

function Matches() {
  return (
    <div>
      <MainNavBar currentPageName="Matches" />
      <LiveMatchCard />
      <UpcomingMatchCard />
      <FinishedMatchCard />
      <FinishedMatchCard />
    </div>
  );
}

export default Matches;
