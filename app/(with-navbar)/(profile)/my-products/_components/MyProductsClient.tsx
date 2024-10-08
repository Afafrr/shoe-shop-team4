"use client";
import { Box, Typography, Button, Grid } from "@mui/material";
import BackgroundImage from "./BackgroundImage";
import ProfileAside from "../../_components/ProfileAside";
import AvatarBox from "./AvatarBox";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import { useRouter } from "next/navigation";
import WarningIcon from "@/components/Form/WarningIcon";
import { getData, ResData } from "@/utils/getData";
import ProductCard from "@/components/Products/ProductCard";
import { MyProduct, EditProduct } from "@/types/Product";
import MenuModal from "./MenuModal";
import EditModal from "./modals/edit-modal/EditModal";
import { useEffect, useState } from "react";
import { reduceData } from "../helper";
import { UserData } from "@/types/types";
import { deleteProduct } from "../action";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "@/components/Loading/LoadingPage";
import successToast from "@/components/Alerts/successToast";

type MyProductData = ResData<
  UserData & {
    products: MyProduct[];
  }
>;

export default function MyProductsClient() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalProduct, setEditModalProduct] = useState<EditProduct>();
  const [errorMsg, setErrorMsg] = useState("");
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<MyProductData>({
    queryKey: ["my-products"],
    queryFn: () =>
      getData(
        "users/me?populate[products][populate]=*&populate=avatar",
        session?.data?.user.jwt
      ),
  });
  const products = data?.data?.products;
  const userData = data?.data;
  if (error) setErrorMsg(error.message);

  useEffect(() => {
    if (selectedId && products) {
      const product = products.find((product) => product.id === selectedId);
      if (!product) return;

      reduceData(product).then((data) => {
        setEditModalProduct(data as EditProduct);
        setEditModalOpen(true);
      });
    }
    return () => {
      setSelectedId(null);
    };
  }, [selectedId]);

  const handleDeleteBtn = async (productId: number | null) => {
    if (!productId) return;
    const res = await deleteProduct(productId, session.data?.user.jwt);

    if (!res.error) {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      successToast("Product deleted Successfully");
    } else setErrorMsg(res.error);
  };

  const handleAddBtn = () => {
    router.push("/my-products/new");
  };
  const avatar = userData?.avatar?.url;

  return (
    <Box sx={{ display: "flex", width: 1, mb: 7 }}>
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
            <EditModal
              open={editModalOpen}
              handleClose={() => setEditModalOpen(false)}
              product={editModalProduct}
            />
            {products?.length ? (
              <Button
                onClick={handleAddBtn}
                variant="contained"
                sx={{
                  position: { xs: "fixed", md: "relative" },
                  bottom: { xs: "15px", md: "0px" },
                  left: { xs: "50%", md: "auto" },
                  width: "152px",
                  height: "40px",
                  transform: { xs: "translateX(-50%)", md: "none" },
                  zIndex: 1000,
                }}
              >
                Add Product
              </Button>
            ) : null}
          </Box>
          <Grid
            container
            sx={{
              mt: { xs: "20px", md: "36px" },
            }}
          >
            {error || errorMsg ? (
              <Typography color="red" sx={{ pb: 2 }}>
                <WarningIcon />
                {errorMsg}
              </Typography>
            ) : null}
            {!isLoading ? (
              products?.length ? (
                products?.map((product) => {
                  const { images, name, gender, price } = product;
                  return (
                    <Grid
                      key={product.id}
                      item
                      xs={6}
                      sm={4}
                      md={4}
                      lg={3}
                      sx={{ position: "relative" }}
                    >
                      <ProductCard
                        imageUrl={images ? images[0].url : ""}
                        name={name || ""}
                        gender={gender?.name || ""}
                        price={price}
                      >
                        <MenuModal
                          productId={product.id}
                          setSelectedId={setSelectedId}
                          onDelete={handleDeleteBtn}
                        />
                      </ProductCard>
                    </Grid>
                  );
                })
              ) : (
                <NoProductsInfo onBtnClick={handleAddBtn} />
              )
            ) : (
              <LoadingPage />
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
