import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import MainNavBar from "../../components/NavBar/MainNavBar";
import MatchesNavbarContent from "../../components/Matches/MatchesNavbarContent";
import MatchesTab from "../../components/Matches/MatchesTab";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

function Matches() {
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const { data: liveMatches, isPending: isLivePending } = useAxiosFetch(
    getAPIBaseURL() + "/match/live"
  );

  const { data: upcomingMatches, isPending: isUpcomingPending } = useAxiosFetch(
    getAPIBaseURL() + "/match/upcoming"
  );

  const {
    data: finishedMatches,
    fetchError,
    isPending,
  } = useAxiosFetch(getAPIBaseURL() + "/match/finished");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BackdropComponent
        open={isPending || isLivePending || isUpcomingPending}
      />

      <MainNavBar currentPageName="Matches">
        <MatchesNavbarContent />
      </MainNavBar>

      {!isPending && !isLivePending && !isUpcomingPending && (
        <div id="matchesTab">
          <MatchesTab
            liveMatches={liveMatches}
            upcomingMatches={upcomingMatches}
            finishedMatches={finishedMatches}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Matches;
