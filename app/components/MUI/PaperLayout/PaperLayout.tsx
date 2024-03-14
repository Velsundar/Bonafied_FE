// components/PaperLayout.js
import { Paper } from "@mui/material";

const PaperLayout = ({ children }: any) => {
  return (
    <Paper
      elevation={3}
      style={{
        height: "100%",
        marginTop: "90px",
        padding: "20px",
        width: "calc(100vw - 200px)",
      }}
    >
      {children}
    </Paper>
  );
};

export default PaperLayout;
