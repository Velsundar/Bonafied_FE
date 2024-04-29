// components/PaperLayout.js
import { Paper } from "@mui/material";
import S10Login from "../../../assets/png/rec.jpg";

const PaperLayout = ({ children, hasBackgroundImage }: any) => {
  return (
    <Paper
      elevation={3}
      style={{
        height: "100%",
        marginTop: "90px",
        padding: "20px",
        width: "calc(100vw - 200px)",
        backgroundImage: hasBackgroundImage ? `url(${S10Login.src})` : "white",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: hasBackgroundImage ? 'rgba(255, 255, 255, 1)' : 'white',
        opacity: hasBackgroundImage ? 0.9 : 1,
        position: "relative",
      }}
    >
      {hasBackgroundImage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        />
      )}
      {children}
    </Paper>
  );
};

export default PaperLayout;
