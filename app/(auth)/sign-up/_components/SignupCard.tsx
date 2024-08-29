"use client";

import Image from "next/image";
import { Box } from "@mui/material";
import { useReducer } from "react";

// MOCKUP MESSAGES
const LOREM = [
  '"Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do."',
  '"The final outcome was exactly what we wanted, They clearly know their craft. Very satisfied with the results."',
  '"Quality work and great attention to detail. Impressive work ethic and creativity. They bring fresh ideas and high energy to every project."',
];
const defaultMessages = [
  {
    message: LOREM[0],
    user: "John Stone",
    location: "Ukraine, Chernivtsi",
    rating: 5,
  },
  {
    message: LOREM[1],
    user: "Mark Anthony",
    location: "Argentina, Buenos Aires",
    rating: 4,
  },
  {
    message: LOREM[2],
    user: "Jhon Doe",
    location: "Brazil, Brazilia",
    rating: 5,
  },
];

function reducer(state: { count: number }, action: { type: string }) {
  switch (action.type) {
    case "increment":
      if (state.count == defaultMessages.length - 1) return { count: 0 };
      else {
        return { count: state.count + 1 };
      }
    case "decrement":
      if (state.count == 0) return { count: defaultMessages.length - 1 };
      else {
        return { count: state.count - 1 };
      }
    default:
      throw new Error("Unknown action type");
  }
}

export default function SignupCard() {
  const initialState = { count: 0 };
  let [Message, setMessage] = useReducer(reducer, initialState);
  let currMessage = defaultMessages[Message.count];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "absolute",
        border: "2px solid #FFFFFFA3",
        borderRadius: "32px",
        width: "75%",
        minHeight: "280px",
        height: "fit-content",
        top: "340px",
        left: "90px",
        padding: "30px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        fontFamily: "Work Sans",
        fontSize: "20px",
        fontWeight: "500",
        lineHeight: "27.83px",
        textAlign: "left",
        color: "rgba(13, 13, 13, 1)",
      }}
    >
      <p
        style={{
          margin: "0 0 12px 0",
          width: "90%",
          fontFamily: "monospace",
        }}
      >
        {currMessage.message}
      </p>
      <Box>
        <Box sx={{ display: "flex" }}>
          <p
            style={{
              fontFamily: "sans-serif, __Work_Sans_8eb020",
              fontSize: "25px",
              fontWeight: "bold",
              margin: "0 12px 0 0",
            }}
          >
            {currMessage.user}
          </p>
          <Box
            sx={{
              width: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Change to dynamic component */}
            <Image src="/auth/star.png" alt="star" width={17} height={17} />
            <Image src="/auth/star.png" alt="star" width={17} height={17} />
            <Image src="/auth/star.png" alt="star" width={17} height={17} />
            <Image src="/auth/star.png" alt="star" width={17} height={17} />
            <Image src="/auth/star.png" alt="star" width={17} height={17} />
          </Box>
        </Box>
        <p style={{ margin: "0" }}>{currMessage.location}</p>
      </Box>
      <Box
        sx={{
          width: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      >
        <Image
          src="/auth/leftArrow.png"
          alt="left arrow"
          width={25}
          height={25}
          style={{ cursor: "pointer" }}
          onClick={() => setMessage({ type: "decrement" })}
        />
        <Image
          src="/auth/rightArrow.png"
          alt="left arrow"
          width={25}
          height={25}
          style={{ cursor: "pointer" }}
          onClick={() => setMessage({ type: "increment" })}
        />
      </Box>
    </Box>
  );
}
