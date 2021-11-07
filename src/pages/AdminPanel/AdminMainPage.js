import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminDashboardCard from "../../components/AdminPanel/AdminDashboardCard";
import BackdropComponent from "../../components/BackdropComponent";

function AdminMainPage() {
  const history = useHistory();

  //check user login status & type
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login || !login_status.is_admin) {
    history.push("/");
  }

  const { data: allMatchesCount, isPending: isAllMatchesPending } =
    useAxiosFetch(getAPIBaseURL() + "/admin/match/all");

  const { data: todaysMatchesCount, isPending: isTodaysMatchesPending } =
    useAxiosFetch(getAPIBaseURL() + "/admin/match/today");

  const { data: todaysRoomsCount, isPending: isTodaysRoomsPending } =
    useAxiosFetch(getAPIBaseURL() + "/admin/room/today");

  return (
    <div>
      <AdminNavBar pageTitle="Foot2gether Admin Panel">
        <BackdropComponent
          open={
            isAllMatchesPending ||
            isTodaysMatchesPending ||
            isTodaysRoomsPending
          }
        />

        {!isAllMatchesPending &&
          !isTodaysMatchesPending &&
          !isTodaysRoomsPending && (
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: "100vh" }}
            >
              <AdminDashboardCard
                cardTitle="Total Matches"
                cardIconName="SportsSoccerIcon"
                cardCount={allMatchesCount.length}
                pageLink="all_matches"
              />

              <AdminDashboardCard
                cardTitle="Today's Matches"
                cardIconName="SportsIcon"
                cardCount={todaysMatchesCount.length}
                pageLink="todays_matches"
              />

              <AdminDashboardCard
                cardTitle="Today's Rooms"
                cardIconName="PersonalVideoIcon"
                cardCount={todaysRoomsCount.length}
                pageLink="todays_rooms"
              />
            </Grid>
          )}
      </AdminNavBar>
    </div>
  );
}

export default AdminMainPage;
