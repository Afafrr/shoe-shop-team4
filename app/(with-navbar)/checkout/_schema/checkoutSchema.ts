export const personalInfo = [
  {
    label: "Name",
    props: {
      name: "firstName",
      required: true,
      placeholder: "Jane",
      type: "text",
      autoComplete: "name",
    },
  },
  {
    label: "Surname",
    props: {
      name: "surname",
      required: true,
      placeholder: "Meldrum",
      type: "text",
      autoComplete: "family-name",
    },
  },
  {
    label: "Email",
    props: {
      name: "email",
      required: true,
      placeholder: "meldrum@gmail.com",
      type: "text",
    },
  },
  {
    label: "Phone number",
    props: {
      name: "phoneNumber",
      required: true,
      type: "tel",
      placeholder: "+9493542574",
      autoComplete: "tel",
    },
  },
];

export const shippingInfo = [
  {
    label: "Country",
    props: {
      name: "country",
      required: true,
      placeholder: "USA",
      type: "text",
      autoComplete: "country-name",
    },
  },
  {
    label: "City",
    props: {
      name: "city",
      required: true,
      placeholder: "New York",
      type: "text",
      autoComplete: "address-level2",
    },
  },
  {
    label: "State",
    props: {
      name: "state",
      required: true,
      placeholder: "New York",
      type: "text",
      autoComplete: "address-level1",
    },
  },
  {
    label: "Zip Code",
    props: {
      name: "zipCode",
      required: true,
      placeholder: "3490583",
      type: "text",
      autoComplete: "postal-code",
    },
  },
  {
    label: "Address",
    props: {
      name: "address",
      required: true,
      placeholder: "street, apartment, block",
      type: "text",
      autoComplete: "street-address",
    },
  },
];
