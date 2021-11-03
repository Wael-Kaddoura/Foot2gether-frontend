import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#222831 !important",
    minHeight: "300px !important",
  },
  footerLink: {
    fontWeight: "700 !important",
  },
  footerTitle: {
    color: "#fff !important",
    fontWeight: "900 !important",
    fontSize: "32px !important",
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <div>
      <Grid
        className={classes.footer}
        container
        justifyContent="center"
        alignItems="flex-end"
      >
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            container
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Link to="/" className={classes.footerLink}>
              Home
            </Link>
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            container
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Link to="/MATCHES" className={classes.footerLink}>
              Matches
            </Link>
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            container
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Link to="/ROOMS" className={classes.footerLink}>
              Rooms
            </Link>
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            container
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Link to="/BLOGS" className={classes.footerLink}>
              Blogs
            </Link>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Link to="/" className={classes.footerTitle}>
            Foot2gether
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
