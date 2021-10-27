import { useState, useEffect } from "react";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminDashboardCard from "../../components/AdminPanel/AdminDashboardCard";

function AdminMainPage() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    if (login_status.is_admin) {
      const token = login_status.token;
      config = { headers: { Authorization: `Bearer ${token}` } };
    } else {
      history.push("/home");
    }
  } else {
    history.push("/login");
  }

  const [isPending, setIsPending] = useState(true);
  const [cardsCount, setCardsCount] = useState(null);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  async function getCardsCount() {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/cards_count",
        config
      );
      const cards_count_data = response.data;
      setCardsCount(cards_count_data);
      handleClose();
      setIsPending(false);
    } catch (error) {}
  }

  useEffect(() => {
    getCardsCount();
  }, []);

  return (
    <div>
      <AdminNavBar pageTitle="Foot2gether Admin Panel">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
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
