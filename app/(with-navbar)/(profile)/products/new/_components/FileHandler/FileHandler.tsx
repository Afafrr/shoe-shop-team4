import { useFormContext } from "react-hook-form";
import FilePreviewContainer from "./FilePreviewContainer";
import FileSelector from "./FileSelector";
import SquareGrid from "./SquareGrid";
import { ReactNode, useReducer } from "react";
import useIsMobile from "../useIsMobile";
import { Box, Stack, Typography } from "@mui/material";

type FileHandlerProps = {
  name: string;
  fieldName: string;
  required: boolean;
};

type FileType = { content: File; url: string };
type StateType = FileType[];
type StateAction =
  | { type: "append"; file: FileType }
  | { type: "remove"; name: string };

export default function FileHandler({
  name,
  fieldName,
  required,
}: FileHandlerProps) {
  const [imageList, setImageList] = useReducer(reducer, []);
  const {
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useFormContext();
  const isMobile = useIsMobile(900);

  setValue(
    "image",
    imageList.map((image) => image.content)
  );

  function handleClick(name: string) {
    setImageList({ type: "remove", name: name });
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!(file instanceof File) || !allowedTypes.includes(file.type)) {
        setError("image", {
          type: "manual",
          message: "Invalid file",
        });
        return;
      }
      if (errors.image) clearErrors("image");

      let fileUrl;
      try {
        fileUrl = await readAsUrl(file);
      } catch {
        fileUrl = "No preview";
      }
      const new_file = { content: file, url: fileUrl };
      setImageList({ type: "append", file: new_file });
    }
  }

  const items = [
    {
      id: "selector",
      content: <FileSelector handleFileChange={handleFileChange} />,
    },
    ...imageList.map((item) => ({
      id: item.url,
      content: (
        <FilePreviewContainer
          imageUrl={item.url}
          handleClick={() => handleClick(item.content.name)}
        />
      ),
    })),
    ,
  ] as { id: string; content: ReactNode }[];

  return (
    <Box
      sx={{
        width: "100%",
        display: { xs: "flex", lg: "block" },
        flexDirection: { xs: "column" },
        alignItems: { xs: "flex-start" },
        marginTop: "0",
      }}
    >
      <Typography fontWeight={500} marginBottom={{ xs: "10px", lg: "6px" }}>
        {fieldName}
        {required ? (
          <Typography variant="caption" color={"red"} fontWeight={500}>
            *
          </Typography>
        ) : (
          ""
        )}
      </Typography>
      {isMobile ? (
        <CenteredColumn items={items} />
      ) : (
        <SquareGrid items={items} />
      )}
    </Box>
  );
}

type ColumnProps = {
  items: { id: string; content: ReactNode }[];
};
function CenteredColumn({ items }: ColumnProps) {
  return (
    <Stack
      direction={"column"}
      width={"100%"}
      alignItems={"center"}
      spacing={6}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: "0.84",
            width: "100%",
          }}
        >
          {item.content}
        </div>
      ))}
    </Stack>
  );
}

function readAsUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      resolve(imageUrl);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

function reducer(state: StateType, action: StateAction): StateType {
  switch (action.type) {
    case "append":
      return [...state, action.file];
    case "remove":
      console.log("REMOVING!!");
      const new_list = state.filter(
        (file) => file.content.name !== action.name
      );
      console.log("new_list: ", new_list);
      console.log("Passing name: ", action.name);
      return new_list;
    default:
      return state;
  }
}
