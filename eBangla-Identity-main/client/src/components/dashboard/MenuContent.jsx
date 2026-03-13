import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useNavigate } from "react-router-dom";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
  { text: "Profile", icon: <PeopleRoundedIcon />, path: "/profile" },
  { text: "Medical", icon: <AssignmentRoundedIcon />, path: "/medical" },
  { text: "Police", icon: <AssignmentRoundedIcon />, path: "/police" },
  { text: "Tax", icon: <AssignmentRoundedIcon />, path: "/tax" },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent({ user }) {
  const navigate = useNavigate();
  const isProfileComplete = user?.isProfileComplete;

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => {
          const isDisabled =
            !isProfileComplete &&
            (item.text === "Medical" ||
              item.text === "Police" ||
              item.text === "Tax");
          return (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={item.path === window.location.pathname}
                onClick={() => !isDisabled && item.path && navigate(item.path)}
                disabled={isDisabled}
                sx={{
                  opacity: isDisabled ? 0.5 : 1,
                  "&.Mui-disabled": {
                    opacity: 0.5,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  secondary={isDisabled ? "Complete profile to unlock" : null}
                  secondaryTypographyProps={{
                    variant: "caption",
                    color: "error",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
