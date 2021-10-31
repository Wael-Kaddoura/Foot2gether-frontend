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

  const {
    data: cardsCount,
    fetchError,
    isPending,
  } = useAxiosFetch("http://localhost:8000/admin/cards_count");

  return (
    <div>
      <AdminNavBar pageTitle="Foot2gether Admin Panel">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isPending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {!isPending && (
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
              cardCount={cardsCount.total_matches_count}
              pageLink="all_matches"
            />

            <AdminDashboardCard
              cardTitle="Today's Matches"
              cardIconName="SportsIcon"
              cardCount={cardsCount.todays_matches_count}
              pageLink="todays_matches"
            />

            <AdminDashboardCard
              cardTitle="Today's Rooms"
              cardIconName="PersonalVideoIcon"
              cardCount={cardsCount.todays_rooms_count}
              pageLink="todays_rooms"
            />
          </Grid>
        )}
      </AdminNavBar>
    </div>
  );
}

export default AdminMainPage;
