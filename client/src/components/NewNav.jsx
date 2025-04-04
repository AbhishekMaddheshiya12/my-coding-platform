import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

function NewNav({setLanguage,language}) {
  const [fullScreen, setFullScreen] = useState(false);
  const changeHandler = (e) => {
    setLanguage(e.target.value);
  }

  const handleSettings = () => {
    console.log("Settings");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ margin: "8px" }}>
        <FormControl
          fullWidth
          sx={{
            backgroundColor: "#2c3e5d",
            fontSize: 10,
            borderRadius: 1,
          }}
          onChange = {changeHandler}
        >
          <NativeSelect
            sx={{
              paddingLeft: 2,
              color: "white", // Ensures selected text is white
              "& option": {
                backgroundColor: "white", // White background for options
                color: "black", // Black text for contrast
                display: "block", // Ensures block-style dropdown items
                padding: "8px", // Adds some padding for better spacing
              },
              "-webkit-appearance": "none", // Hides default arrow in WebKit browsers
              "-moz-appearance": "none", // Hides default arrow in Firefox
              appearance: "none", // Standard way to hide the arrow
            }}
            defaultValue={language}
          >
            <option value={"javascript"}>JavaScript</option>
            <option value={"python"}>Python</option>
            <option value={"java"}>Java</option>
            <option value={"cpp"}>C++</option>
            <option value={"c"}>C</option>
          </NativeSelect>
        </FormControl>
      </Box>
      <Box>
        <IconButton onClick={handleSettings}>
          <SettingsIcon sx={{ color: "rgb(112, 112, 112)" }} />
        </IconButton>
        <IconButton onClick={() => setFullScreen(!fullScreen)}>
          {fullScreen ? (
            <FullscreenExitIcon sx={{ color: "rgb(112, 112, 112)" }} />
          ) : (
            <FullscreenIcon sx={{ color: "rgb(112, 112, 112)" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}

export default NewNav;
