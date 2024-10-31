import { CartItem } from "@/contexts/Cart";

export default function sortCartItems(cartItems: CartItem[]): CartItem[] {
  return cartItems.sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);

    if (nameComparison === 0) {
      return a.size - b.size;
    }

    return nameComparison;
  });
}
