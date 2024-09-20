"use client";
import { Box, Menu, MenuItem, Divider } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThreeDotsIcon } from "@/public/svg/ThreeDotsIcon";
import { MyProduct } from "@/types/Product";
export default function MenuModal({ productData }: { productData: MyProduct }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const options = [
    {
      name: "View",
      action: () => {
        router.push(`./products/${productData.id}`);
      },
    },
    { name: "Edit", action: () => {
      
    } },
    { name: "Delete", action: () => {} },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          width: "40px",
          height: "40px",
          right: 0,
          zIndex: 100,
          cursor: "pointer",
        }}
        aria-label="more"
        id="long-button"
        onClick={handleClick}
      >
        <ThreeDotsIcon />
      </Box>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            display: "flex",
            minHeight: "98px",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px 0px #00000026",
          },
          "& .MuiList-root": {
            padding: 0,
          },
        }}
      >
        {options.map((option, index) => (
          <div key={option.name}>
            {index === 0 ? null : (
              <Divider
                style={{ margin: "0px 8px" }}
                sx={{ color: "#D8D8D8" }}
              />
            )}
            <MenuItem
              key={option.name}
              onClick={() => {
                handleClose();
                option.action();
              }}
              sx={{
                fontWeight: 300,
                width: { xs: "78px", md: "112px" },
                height: "33px",
                fontSize: { xs: "12px", md: "15px" },
              }}
            >
              {option.name}
            </MenuItem>
          </div>
        ))}
      </Menu>
    </>
  );
}
