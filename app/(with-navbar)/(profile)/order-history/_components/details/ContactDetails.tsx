import InfoBox from "../ui/InfoBox";
import { MetadataDetails } from "@/types/types";
import { Box } from "@mui/material";

type ContactDetailsProps = {
  contactDetails: MetadataDetails;
  paymentType: string;
};

export default function ContactDetails({
  contactDetails,
  paymentType,
}: ContactDetailsProps) {
  const { address, city, firstName, surname, phoneNumber, email } =
    contactDetails;

  const delivery = `${address}, ${city}`;
  const contact = `${firstName} ${surname}, ${phoneNumber}, ${email}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        py: "16px",
        px: "24px",
        justifyContent: { xs: "flex-start", sm: "center" },
        width: "100%",
      }}
    >
      <InfoBox label="Delivery:" value={delivery} sx={{ mr: "40px" }} />
      <InfoBox label="Contacts:" value={contact} sx={{ mr: "40px" }} />
      <InfoBox label="Payment:" value={paymentType} />
    </Box>
  );
}
