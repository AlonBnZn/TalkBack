/* eslint-disable react/prop-types */
import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";

export default function HisChat({ data }) {
  const { name } = JSON.parse(data);
  return (
    <Stack spacing={3}>
      {/* For variant="text", adjust the height via font-size */}

      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Typography>{name}</Typography>
        {/* <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ marginRight: "20px", marginLeft:"20px" }}
        />
        <Skeleton
          variant="rectangular"
          width={400}
          height={60}
          sx={{ borderRadius: "15px" }}
        /> */}
      </Box>
    </Stack>
  );
}
