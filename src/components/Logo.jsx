import { Box } from "@mui/material";

export default function Logo() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <img
        src="/logo.png"
        alt="logo"
        style={{ width: "120px" }}
      />
    </Box>
  );
}