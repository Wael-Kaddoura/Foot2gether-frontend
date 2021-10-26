import { Grid, Card } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsIcon from "@mui/icons-material/Sports";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    border: "1px solid",
  },
  cardIconSection: {
    height: 125,
    textAlign: "center",
  },
  cardTitleSection: {
    height: 60,
    fontSize: 25,
    fontWeight: 600,
    textAlign: "center",
  },
  cardCountSection: {
    height: 175,
    fontSize: 60,
    fontWeight: 600,
    color: "#1976d2",
    textAlign: "center",
  },
  cardIcon: {
    transform: "scale(2.75)",
    fill: "#1976d2",
  },
});

function AdminDashboardCard(props) {
  const { cardTitle, cardIconName, cardCount } = props;
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      md={4}
      container
      justifyContent="center"
      sx={{ mt: 4, mb: 4 }}
    >
      <Card sx={{ minWidth: 300, py: 2 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.cardIconSection}
            container
            justifyContent="center"
            alignItems="center"
          >
            {cardIconName === "SportsSoccerIcon" ? (
              <SportsSoccerIcon className={classes.cardIcon} />
            ) : cardIconName === "SportsIcon" ? (
              <SportsIcon className={classes.cardIcon} />
            ) : cardIconName === "PersonalVideoIcon" ? (
              <PersonalVideoIcon className={classes.cardIcon} />
            ) : (
              ""
            )}
          </Grid>

          <Grid
            item
            xs={12}
            className={classes.cardTitleSection}
            container
            justifyContent="center"
            alignItems="center"
          >
            {cardTitle}
          </Grid>

          <Grid
            item
            xs={12}
            className={classes.cardCountSection}
            container
            justifyContent="center"
            alignItems="center"
          >
            {cardCount}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default AdminDashboardCard;
