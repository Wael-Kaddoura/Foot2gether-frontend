import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function MainNavBar({ name, color, isActive, active }) {
  return (
    <Link
      to={"/" + name}
      className="nav-link"
      style={{ textDecoration: "none", color: color }}
    >
      <ListItem button className={isActive}>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
}

export default MainNavBar;
