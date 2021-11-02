import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function MainNavBar({ name, color, isActive, isActiveDrawer }) {
  return (
    <Link
      to={"/" + name}
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
