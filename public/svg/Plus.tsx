import { SvgIcon } from "@mui/material";

export const Plus = ({ size = 32 }: { size?: number }) => {
  return (
    <SvgIcon
      sx={{
        fontSize: size,
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#FFD7D6" />
        <rect x="15" y="10" width="2" height="12" rx="1" fill="#FE645E" />
        <rect x="10" y="15" width="12" height="2" rx="1" fill="#FE645E" />
      </svg>
    </SvgIcon>
  );
};
