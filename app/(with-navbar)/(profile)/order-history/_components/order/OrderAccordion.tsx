import PlainAccordion from "@/components/Display/PlainAccordion";
import { Order, ProductFromOrder } from "@/types/types";
import { ExpandMore } from "@mui/icons-material";
import { AccordionDetails, AccordionSummary, Divider } from "@mui/material";
import OrderSummary from "./OrderSummary";
import ProductsDetails from "../details/ProductsDetails";
import { useState } from "react";
import ContactDetails from "../details/ContactDetails";
import AttachmentsDetails from "../details/AttachmentsDetails";

type OrderSummaryProps = {
  order: Order;
  defaultExpanded?: boolean;
};

export default function OrderAccordion({
  order,
  defaultExpanded = false,
}: OrderSummaryProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const products: ProductFromOrder[] = JSON.parse(
    order.metadata.products || ""
  );

  return (
    <PlainAccordion
      sx={{
        backgroundColor: "#FAFAFA",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ px: "24px" }}
        onClick={() => setExpanded(true)}
      >
        <OrderSummary
          id={order.id}
          created={order.created}
          productsQty={products.length}
          amount={order.amount}
          status={order.status}
        />
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        {expanded && (
          <>
            <Divider />
            <ContactDetails
              contactDetails={order.metadata}
              paymentType={order.paymentType}
            />
            <Divider />
            <ProductsDetails products={products} />
            <Divider />
            <AttachmentsDetails />
          </>
        )}
      </AccordionDetails>
    </PlainAccordion>
  );
}
