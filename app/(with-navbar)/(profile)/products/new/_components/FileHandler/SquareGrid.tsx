import { ReactNode } from "react";

type GridProps = {
  items: { id: string; content: ReactNode }[];
};

export default function SquareGrid({ items }: GridProps) {
  return (
    <div style={styles.gridContainer}>
      {items.map((item) => (
        <div key={item.id} style={styles.gridItem}>
          {item.content}
        </div>
      ))}
    </div>
  );
}

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "50px",
    width: "100%",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: "0.84",
  },
};
