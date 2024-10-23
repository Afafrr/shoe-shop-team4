"use client";
import { Box, Typography, Button, Grid } from "@mui/material";
import BackgroundImage from "./BackgroundImage";
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
import DuplicateModal from "./modals/duplicate/DuplicateModal";

type MyProductData = ResData<
  UserData & {
    products: MyProduct[];
  }
>;

type ModalOptions = "edit" | "duplicate";

export type Selected = {
  id: number | null;
  action: ModalOptions | null;
};

export default function MyProductsClient() {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [modalOpen, setModalOpen] = useState<ModalOptions | null>(null);
  const [modalProduct, setModalProduct] = useState<EditProduct>();
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
    if (selected && products) {
      const product = products.find((product) => product.id === selected.id);
      if (!product) return;

      reduceData(product).then((data) => {
        setModalProduct(data as EditProduct);
        setModalOpen(selected.action);
      });
    }
    return () => {
      setSelected(null);
    };
  }, [selected]);

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
            open={modalOpen == "edit"}
            handleClose={() => setModalOpen(null)}
            product={modalProduct}
          />
          <DuplicateModal
            open={modalOpen == "duplicate"}
            handleClose={() => setModalOpen(null)}
            product={modalProduct}
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
                        setSelected={setSelected}
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
  );
}
