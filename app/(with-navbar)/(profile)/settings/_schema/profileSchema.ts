type FormInput = {
  label: string;
  props: {
    name: string;
    required?: boolean;
    value?: string;
    placeholder?: string;
    type?: string;
    autoComplete?: string;
    InputProps?: {
      disabled: boolean;
    };
  };
};
export const inputs: FormInput[] = [
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
      name: "lastName",
      placeholder: "Meldrum",
      type: "text",
      autoComplete: "family-name",
    },
  },
  {
    label: "Email",
    props: {
      name: "email",
      placeholder: "Meldrum",
      type: "text",
      InputProps: {
        disabled: true,
      },
    },
  },
  {
    label: "Phone number",
    props: {
      name: "phoneNumber",
      type: "tel",
      placeholder: "+9493542574",
      autoComplete: "tel",
    },
  },
];
