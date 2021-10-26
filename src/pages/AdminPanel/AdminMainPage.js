import { Grid } from "@mui/material";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminDashboardCard from "../../components/AdminPanel/AdminDashboardCard";

function AdminMainPage() {
  return (
    <div>
      <AdminNavBar pageTitle="Foot2gether Admin Panel">
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
            cardCount="15"
            pageLink="all_matches"
          />

          <AdminDashboardCard
            cardTitle="Today's Matches"
            cardIconName="SportsIcon"
            cardCount="6"
            pageLink="todays_matches"
          />

          <AdminDashboardCard
            cardTitle="Today's Rooms"
            cardIconName="PersonalVideoIcon"
            cardCount="32"
            pageLink="todays_rooms"
          />
        </Grid>
      </AdminNavBar>
    </div>
  );
}

export default AdminMainPage;
