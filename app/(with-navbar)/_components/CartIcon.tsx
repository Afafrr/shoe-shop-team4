import { SvgIcon } from "@mui/material";

export default function CartIcon({
  count,
  color = "grey",
}: {
  count?: number;
  color?: string;
}) {
  return (
    <SvgIcon>
      {count && count > 0 ? (
        <svg
          data-testid="cart-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.32507 5.31662C4.16673 5.31662 4.00007 5.24995 3.8834 5.13328C3.64173 4.89162 3.64173 4.49162 3.8834 4.24995L6.9084 1.22495C7.15007 0.983285 7.55007 0.983285 7.79173 1.22495C8.0334 1.46662 8.0334 1.86662 7.79173 2.10828L4.76673 5.13328C4.64173 5.24995 4.4834 5.31662 4.32507 5.31662Z"
            fill={color}
          />
          <path
            d="M15.6748 5.31662C15.5164 5.31662 15.3581 5.25828 15.2331 5.13328L12.2081 2.10828C11.9664 1.86662 11.9664 1.46662 12.2081 1.22495C12.4498 0.983285 12.8498 0.983285 13.0914 1.22495L16.1164 4.24995C16.3581 4.49162 16.3581 4.89162 16.1164 5.13328C15.9998 5.24995 15.8331 5.31662 15.6748 5.31662Z"
            fill={color}
          />
          <path
            d="M16.8415 8.83333C16.7832 8.83333 16.7248 8.83333 16.6665 8.83333H16.4748H3.33317C2.74984 8.84167 2.08317 8.84167 1.59984 8.35833C1.2165 7.98333 1.0415 7.4 1.0415 6.54167C1.0415 4.25 2.7165 4.25 3.5165 4.25H16.4832C17.2832 4.25 18.9582 4.25 18.9582 6.54167C18.9582 7.40833 18.7832 7.98333 18.3998 8.35833C17.9665 8.79167 17.3832 8.83333 16.8415 8.83333ZM3.5165 7.58333H16.6748C17.0498 7.59167 17.3998 7.59167 17.5165 7.475C17.5748 7.41667 17.6998 7.21667 17.6998 6.54167C17.6998 5.6 17.4665 5.5 16.4748 5.5H3.5165C2.52484 5.5 2.2915 5.6 2.2915 6.54167C2.2915 7.21667 2.42484 7.41667 2.47484 7.475C2.5915 7.58333 2.94984 7.58333 3.3165 7.58333H3.5165Z"
            fill={color}
          />
          <path
            d="M12.4083 18.9584H7.38329C4.39996 18.9584 3.73329 17.1834 3.47496 15.6417L2.29996 8.43337C2.24162 8.09171 2.47496 7.77504 2.81662 7.71671C3.15829 7.65837 3.47496 7.89171 3.53329 8.23337L4.70829 15.4334C4.94996 16.9084 5.44996 17.7084 7.38329 17.7084H12.4083C14.55 17.7084 14.7916 16.9584 15.0666 15.5084L16.4666 8.21671C16.5333 7.87504 16.8583 7.65004 17.2 7.72504C17.5416 7.79171 17.7583 8.11671 17.6916 8.45837L16.2916 15.75C15.9666 17.4417 15.425 18.9584 12.4083 18.9584Z"
            fill={color}
          />

          {count > 99 ? (
            <text x="5" y="15" fontSize="6" fill="#494949" fontWeight={600}>
              {"99+"}
            </text>
          ) : count > 9 ? (
            <text x="5.5" y="16" fontSize="8" fill="#494949" fontWeight={600}>
              {count}
            </text>
          ) : (
            <text x="7.5" y="16" fontSize="8" fill="#494949" fontWeight={600}>
              {count}
            </text>
          )}
        </svg>
      ) : (
        <svg
          data-testid="empty-cart-icon"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.18988 6.78033C4.99988 6.78033 4.79988 6.70033 4.65988 6.56033C4.36988 6.27033 4.36988 5.79033 4.65988 5.50033L8.28988 1.87033C8.57988 1.58033 9.05988 1.58033 9.34988 1.87033C9.63988 2.16033 9.63988 2.64033 9.34988 2.93033L5.71988 6.56033C5.56988 6.70033 5.37988 6.78033 5.18988 6.78033Z"
            fill={color}
          />
          <path
            d="M18.8101 6.78033C18.6201 6.78033 18.4301 6.71033 18.2801 6.56033L14.6501 2.93033C14.3601 2.64033 14.3601 2.16033 14.6501 1.87033C14.9401 1.58033 15.4201 1.58033 15.7101 1.87033L19.3401 5.50033C19.6301 5.79033 19.6301 6.27033 19.3401 6.56033C19.2001 6.70033 19.0001 6.78033 18.8101 6.78033Z"
            fill={color}
          />
          <path
            d="M20.21 11.0005C20.14 11.0005 20.07 11.0005 20 11.0005H19.77H4C3.3 11.0105 2.5 11.0105 1.92 10.4305C1.46 9.98049 1.25 9.28049 1.25 8.25049C1.25 5.50049 3.26 5.50049 4.22 5.50049H19.78C20.74 5.50049 22.75 5.50049 22.75 8.25049C22.75 9.29049 22.54 9.98049 22.08 10.4305C21.56 10.9505 20.86 11.0005 20.21 11.0005ZM4.22 9.50049H20.01C20.46 9.51049 20.88 9.51049 21.02 9.37049C21.09 9.30049 21.24 9.06049 21.24 8.25049C21.24 7.12049 20.96 7.00049 19.77 7.00049H4.22C3.03 7.00049 2.75 7.12049 2.75 8.25049C2.75 9.06049 2.91 9.30049 2.97 9.37049C3.11 9.50049 3.54 9.50049 3.98 9.50049H4.22Z"
            fill={color}
          />
          <path
            d="M9.75977 18.7004C9.34977 18.7004 9.00977 18.3604 9.00977 17.9504V14.4004C9.00977 13.9904 9.34977 13.6504 9.75977 13.6504C10.1698 13.6504 10.5098 13.9904 10.5098 14.4004V17.9504C10.5098 18.3704 10.1698 18.7004 9.75977 18.7004Z"
            fill={color}
          />
          <path
            d="M14.3599 18.7004C13.9499 18.7004 13.6099 18.3604 13.6099 17.9504V14.4004C13.6099 13.9904 13.9499 13.6504 14.3599 13.6504C14.7699 13.6504 15.1099 13.9904 15.1099 14.4004V17.9504C15.1099 18.3704 14.7699 18.7004 14.3599 18.7004Z"
            fill={color}
          />
          <path
            d="M14.8902 23.1504H8.86024C5.28024 23.1504 4.48024 21.0204 4.17024 19.1704L2.76024 10.5204C2.69024 10.1104 2.97024 9.73039 3.38024 9.66039C3.79024 9.59039 4.17024 9.87039 4.24024 10.2804L5.65024 18.9204C5.94024 20.6904 6.54024 21.6504 8.86024 21.6504H14.8902C17.4602 21.6504 17.7502 20.7504 18.0802 19.0104L19.7602 10.2604C19.8402 9.85039 20.2302 9.58039 20.6402 9.67039C21.0502 9.75039 21.3102 10.1404 21.2302 10.5504L19.5502 19.3004C19.1602 21.3304 18.5102 23.1504 14.8902 23.1504Z"
            fill={color}
          />
        </svg>
      )}
    </SvgIcon>
  );
}
