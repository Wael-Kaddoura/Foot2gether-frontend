import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function MainNavBar(props) {
  const { path, name, color, isActive, isActiveDrawer } = props;

  return (
    <Link
      to={"/" + path}
      className="nav-link"
      style={{ textDecoration: "none", color: color }}
    >
      <ListItem button className={isActive + " " + isActiveDrawer}>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
}

export default MainNavBar;
