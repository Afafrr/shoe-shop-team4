"use client";
import { Box, Typography, Button } from "@mui/material";
import BackgroundImage from "./BackgroundImage";
import ProfileAside from "../../_components/ProfileAside";
import AvatarBox from "./AvatarBox";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WarningIcon from "@/components/Form/WarningIcon";
import { ResData } from "@/utils/getData";
import { useUserData } from "@/contexts/UserDataProvider";

export default function MyProductsClient({ data }: { data: ResData<any> }) {
  const router = useRouter();
  const [products, setProducts] = useState(data.data?.products);
  const { data: userData, error } = useUserData(); //just to show output for provider
  const handleAddBtn = () => {
    router.push("/add-products");
  };
  const avatar = userData?.avatar?.url;

  return (
    <Box sx={{ display: "flex", width: 1, flexShrink: 0 }}>
      <ProfileAside activeBtnPath="my-products" />
      <Box sx={{ width: 1, margin: { md: "38px 60px 0px 53px" } }}>
        <BackgroundImage />
        <Box sx={{ mx: { xs: "20px", md: "0px" } }}>
          <AvatarBox
            name={userData?.firstName + " " + userData?.lastName}
            src={avatar}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={500}
              fontSize={{ xs: "30px", md: "45px" }}
              sx={{
                mt: { xs: "8px", md: "15px" },
                position: "relative",
              }}
            >
              My Products
            </Typography>
            {products?.length ? (
              <Button
                onClick={handleAddBtn}
                variant="contained"
                sx={{
                  position: { xs: "absolute", md: "relative" },
                  width: "152px",
                  height: "40px",
                  bottom: { xs: "15px", md: "0px" },
                  left: { xs: "50%", md: "auto" },
                  transform: { xs: "translateX(-50%)", md: "none" },
                }}
              >
                Add Product
              </Button>
            ) : null}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: { xs: "20px", md: "36px" },
            }}
          >
            {data.error ? (
              <Typography color="red">
                <WarningIcon />
                {data.error}
              </Typography>
            ) : null}
            {/* PRODUCTS */}
            {products?.length ? null : (
              <NoProductsInfo onBtnClick={handleAddBtn} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
