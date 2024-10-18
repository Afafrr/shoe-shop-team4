import RemoveFavIcon from "@/public/svg/RemoveFavIcon";
import { useState } from "react";

type Props = { handleClick: () => void };
export default function RemoveItem({ handleClick }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      data-testid="remove-item-test"
      className="hover"
      style={{
        position: "absolute",
        top: "10px",
        right: "37px",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RemoveFavIcon color={isHovered ? "red" : "grey"} />
    </div>
  );
}
