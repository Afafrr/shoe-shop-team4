import Image from "next/image";

import { Box, IconButton, SvgIcon, Typography } from "@mui/material";

import { useCart } from "@/contexts/Cart";
import QuantitySelect from "./QuantitySelect";

export default function ProductInfo({ item }: { item: any }) {
  const { removeItem } = useCart();

  return (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        my: "30px",
        mx: "20px",
        gap: "15px",
      }}
    >
      <Box sx={{ width: "150px", height: "120px" }}>
        <Image
          src={item.image}
          alt={item.name}
          width={223}
          height={110}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: {
              md: "100%",
            },
          }}
        >
          <Box>
            <Typography fontWeight={500} noWrap sx={{ maxWidth: "150px" }}>
              {item.name}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={"12px"}
              color={"#5c5c5c"}
              noWrap
              sx={{ maxWidth: "150px" }}
            >
              {item.description}
            </Typography>
          </Box>

          <QuantitySelect item={item} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            fontWeight={500}
            sx={{ alignSelf: "flex-end" }}
          >{`$${item.price}`}</Typography>

          <IconButton
            onClick={() => removeItem(item.id)}
            aria-label="delete"
            sx={{ color: "#8B8E93", gap: "4px", p: 0, mb: "10px" }}
            size="small"
          >
            <SvgIcon>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4998 3.36474C10.4898 3.36474 10.4748 3.36474 10.4598 3.36474C7.81484 3.09974 5.17484 2.99974 2.55984 3.26474L1.53984 3.36474C1.32984 3.38474 1.14484 3.23474 1.12484 3.02474C1.10484 2.81474 1.25484 2.63474 1.45984 2.61474L2.47984 2.51474C5.13984 2.24474 7.83484 2.34974 10.5348 2.61474C10.7398 2.63474 10.8898 2.81974 10.8698 3.02474C10.8548 3.21974 10.6898 3.36474 10.4998 3.36474Z"
                  fill="#A2A5A9"
                />
                <path
                  d="M4.24988 2.86C4.22988 2.86 4.20988 2.86 4.18488 2.855C3.98488 2.82 3.84488 2.625 3.87988 2.425L3.98988 1.77C4.06988 1.29 4.17988 0.625 5.34488 0.625H6.65488C7.82488 0.625 7.93488 1.315 8.00988 1.775L8.11988 2.425C8.15488 2.63 8.01488 2.825 7.81488 2.855C7.60988 2.89 7.41488 2.75 7.38488 2.55L7.27488 1.9C7.20488 1.465 7.18988 1.38 6.65988 1.38H5.34988C4.81988 1.38 4.80988 1.45 4.73488 1.895L4.61988 2.545C4.58988 2.73 4.42988 2.86 4.24988 2.86Z"
                  fill="#A2A5A9"
                />
                <path
                  d="M7.60519 11.3753H4.39519C2.65019 11.3753 2.58019 10.4103 2.52519 9.63028L2.20019 4.59528C2.18519 4.39028 2.34519 4.21028 2.55019 4.19528C2.76019 4.18528 2.93519 4.34028 2.95019 4.54528L3.27519 9.58028C3.33019 10.3403 3.35019 10.6253 4.39519 10.6253H7.60519C8.65519 10.6253 8.67519 10.3403 8.72519 9.58028L9.05019 4.54528C9.06519 4.34028 9.24519 4.18528 9.45019 4.19528C9.65519 4.21028 9.81519 4.38528 9.80019 4.59528L9.47519 9.63028C9.42019 10.4103 9.35019 11.3753 7.60519 11.3753Z"
                  fill="#A2A5A9"
                />
                <path
                  d="M6.83004 8.625H5.16504C4.96004 8.625 4.79004 8.455 4.79004 8.25C4.79004 8.045 4.96004 7.875 5.16504 7.875H6.83004C7.03504 7.875 7.20504 8.045 7.20504 8.25C7.20504 8.455 7.03504 8.625 6.83004 8.625Z"
                  fill="#A2A5A9"
                />
                <path
                  d="M7.25 6.625H4.75C4.545 6.625 4.375 6.455 4.375 6.25C4.375 6.045 4.545 5.875 4.75 5.875H7.25C7.455 5.875 7.625 6.045 7.625 6.25C7.625 6.455 7.455 6.625 7.25 6.625Z"
                  fill="#A2A5A9"
                />
              </svg>
            </SvgIcon>
            <Typography>Delete</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
