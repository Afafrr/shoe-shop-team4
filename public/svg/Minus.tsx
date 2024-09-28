import { SvgIcon } from "@mui/material";

export const Minus = ({ size = 32 }: { size?: number }) => {
  return (
    <SvgIcon
      sx={{
        fontSize: size,
      }}
    >
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#E8E8E8" />
        <rect
          x="22"
          y="15"
          width="2"
          height="12"
          rx="1"
          transform="rotate(90 22 15)"
          fill="#CECECE"
        />
      </svg>
    </SvgIcon>
  );
};
