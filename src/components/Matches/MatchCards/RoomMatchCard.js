import { LinearProgress, Grid } from "@mui/material";

import MatchCard from "./MatchCard";

function RoomMatchCard({ matchData }) {
  return (
    <MatchCard
      team1Name={matchData.team1.name}
      team1Logo={matchData.team1.logo}
      team2Name={matchData.team2.name}
      team2Logo={matchData.team2.logo}
      league={matchData.competition.name}
      kickOff={matchData.kick_off}
    >
      <Grid
        sx={{ mb: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5}>
          <LinearProgress color="error" />
        </Grid>
      </Grid>
    </MatchCard>
  );
}

export default RoomMatchCard;
