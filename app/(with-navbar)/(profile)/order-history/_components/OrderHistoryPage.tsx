"use client";
import { useRouter } from "next/navigation";
import ProfileTitle from "../../_components/ProfileTitle";
import NoProductsInfo from "@/app/(with-navbar)/_components/NoProductsInfo";
import { Order } from "@/types/types";
import OrderAccordion from "./order/OrderAccordion";

type OrderHistoryPageProps = {
  orders: Order[];
  orderIdOpened: string | undefined;
};

export default function OrderHistoryPage({
  orders,
  orderIdOpened,
}: OrderHistoryPageProps) {
  const router = useRouter();
  const hasOrders = orders.length > 0;
  return (
    <ProfileTitle title="Order history">
      {hasOrders ? (
        orders.map((order) => (
          <OrderAccordion
            key={order.id}
            order={order}
            defaultExpanded={order.id === orderIdOpened ? true : undefined}
          />
        ))
      ) : (
        <NoProductsInfo
          onBtnClick={() => router.push("/")}
          title="You don't have any order placed yet"
          subtitle="Browse the homepage and find products of your preference"
          btnDescription="Browse products"
        />
      )}
    </ProfileTitle>
  );
}
