"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading/LoadingPage";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [age, setAge] = React.useState("");

  if (status === "loading") {
    return <LoadingPage />;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <main>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        {session ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => router.push("/auth/sign-in")}>Sign In</button>
        )}
      </Box>
    </main>
  );
}
