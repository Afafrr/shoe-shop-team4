"use client";
import { useFormContext } from "react-hook-form";
import FilePreviewContainer from "./FilePreviewContainer";
import FileSelector from "./FileSelector";
import { ReactNode, useEffect, useReducer } from "react";
import useIsMobile from "../useIsMobile";
import { Box, Stack, Typography } from "@mui/material";

// Top component to handle file selection and show previews of selected files
// Hierarchy: FileHandler => FilePreviewContainer & FileSelector => FileExplorer

type FileHandlerProps = {
  label: string;
  required: boolean;
};

type FileType = { content: File; url: string };
type StateType = FileType[];
type StateAction =
  | { type: "append"; file: FileType }
  | { type: "remove"; name: string };

export default function FileHandler({ label, required }: FileHandlerProps) {
  const [imageList, setImageList] = useReducer(reducer, []);
  const { setError, clearErrors, setValue } = useFormContext();
  const isMobile = useIsMobile(900);

  // Updates form field 'image' every time imageList state changes
  useEffect(() => {
    setValue(
      "image",
      imageList.map((image) => image.content),
      { shouldValidate: imageList.length == 0 ? false : true }
    );
  }, [imageList, setValue]);

  // Handles image preview click
  function handleClick(name: string) {
    setImageList({ type: "remove", name: name });
  }

  /* Handles file selection.
   * Checks if selected file is valid
   * Extracts Url from file to show a preview if possible
   * Updates ImageList state
   */
  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const file = event.target.files?.[0];
    if (file) {
      if (!isValidFile(file)) {
        setError("image", {
          type: "manual",
          message: "Invalid file",
        });
        let timeoutId = setTimeout(() => {
          clearErrors("image");
          clearTimeout(timeoutId);
        }, 2000);
        return;
      }

      let fileUrl;
      try {
        fileUrl = await readAsUrl(file);
      } catch {
        fileUrl = "No preview";
      }
      const new_file = { content: file, url: fileUrl };
      setImageList({ type: "append", file: new_file });
      setValue(
        "image",
        imageList.map((image) => image.content),
        { shouldValidate: true }
      );
    }
  }

  // Check if file is instance of file and of an allowed type of file.
  function isValidFile(file: File): boolean {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    return (
      file instanceof File &&
      allowedTypes.includes(file.type) &&
      imageList.every((image) => image.content.name !== file.name)
    );
  }

  // All previews of selected files. First item of list is always FileSelector, which contains the UI and logic for file selection
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
        {label}
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

// Mobile container for file previews
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

// Desktop container for file previews
type GridProps = {
  items: { id: string; content: ReactNode }[];
};
function SquareGrid({ items }: GridProps) {
  return (
    <div className="gridContainer">
      {items.map((item) => (
        <div key={item.id} className="gridItem">
          {item.content}
        </div>
      ))}
    </div>
  );
}

// Function to extract url from a file
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

/*
 * State reducer. Two possible actions:
 * "append" => Add file and url to imageList
 * "remove" => Filter the imageList to remove a file.
 */
function reducer(state: StateType, action: StateAction): StateType {
  switch (action.type) {
    case "append":
      return [...state, action.file];
    case "remove":
      const new_list = state.filter(
        (file) => file.content.name !== action.name
      );
      return new_list;
    default:
      return state;
  }
}
