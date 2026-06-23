// import React from "react";
// import { Backdrop, CircularProgress } from "@mui/material";

// const Loader = ({ open }) => {
//   return (
//     <Backdrop
//       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       open={open}
//     >
//       <CircularProgress color="inherit" />
//     </Backdrop>
//   );
// };

// export default Loader;


import React from "react";
import { Backdrop, Box, Typography } from "@mui/material";
import logo from "../assets/icons/logo.svg";

const Loader = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 999,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(2,126,255,0.08))",
        backdropFilter: "blur(18px)",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* Loader Container */}
      <Box
        sx={{
          position: "relative",
          width: 250,
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer Pulse */}
        <Box
          sx={{
            position: "absolute",
            width: 230,
            height: 230,
            borderRadius: "50%",
            border: "1px solid rgba(2,126,255,0.15)",
            animation: "pulseRing 2.5s ease-out infinite",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 230,
            height: 230,
            borderRadius: "50%",
            border: "1px solid rgba(2,126,255,0.08)",
            animation: "pulseRing 2.5s ease-out infinite 1s",
          }}
        />

        {/* Rotating Gradient Ring */}
        <Box
          sx={{
            position: "absolute",
            width: 210,
            height: 210,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, #027EFF, #66B2FF, #c7e0ff, #027EFF)",
            animation: "spin 3s linear infinite",
            filter: "blur(8px)",
            opacity: 0.7,
          }}
        />

        {/* Orbit Dot */}
        <Box
          sx={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            animation: "orbit 3s linear infinite",
          }}
        >
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#027EFF",
              boxShadow: "0 0 12px #027EFF",
            }}
          />
        </Box>

        {/* Glass Center */}
        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 10px 40px rgba(2,126,255,0.2)",
          }}
        />

        {/* Logo + Fellowship */}
        <Box
          sx={{
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: 80,
              height: 60,
              animation: "floatLogo 2.2s ease-in-out infinite",
            }}
          />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: "3px",
              mt: 0.5,
              // background:
              //   "linear-gradient(90deg,#027EFF,#66B2FF,#027EFF)",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              animation: "glowText 2s ease-in-out infinite",
            }}
          >
            FELLOWSHIP
          </Typography>
        </Box>
      </Box>

      {/* Bottom Text */}
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: "6px",
          background: "linear-gradient(90deg,#027EFF,#66B2FF,#ffffff,#027EFF)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 2s linear infinite",
        }}
      >
        LOADING
      </Typography>

      {/* Animations */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulseRing {
          0% {
            transform: scale(.6);
            opacity: .7;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes floatLogo {
          0%,100% {
            transform: translateY(0px) scale(.95);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }

        @keyframes glowText {
          0%,100% {
            opacity: .6;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes fadeText {
          0%,100% {
            opacity: .4;
            letter-spacing: 5px;
          }
          50% {
            opacity: 1;
            letter-spacing: 8px;
          }
        }

        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Backdrop>
  );
};

export default Loader;
