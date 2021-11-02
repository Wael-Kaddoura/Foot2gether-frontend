import { Grid, Backdrop, CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminDashboardCard from "../../components/AdminPanel/AdminDashboardCard";

function AdminMainPage() {
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login || !login_status.is_admin) {
    history.push("/home");
  }

  const { data: allMatchesCount, isPending: isAllMatchesPending } =
    useAxiosFetch("http://3.144.252.18/admin/match/all");

  const { data: todaysMatchesCount, isPending: isTodaysMatchesPending } =
    useAxiosFetch("http://3.144.252.18/admin/match/today");

  const { data: todaysRoomsCount, isPending: isTodaysRoomsPending } =
    useAxiosFetch("http://3.144.252.18/admin/room/today");

  return (
    <div>
      <AdminNavBar pageTitle="Foot2gether Admin Panel">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={
            isAllMatchesPending ||
            isTodaysMatchesPending ||
            isTodaysRoomsPending
          }
        >
          <CircularProgress color="inherit" />
        </Backdrop>

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
