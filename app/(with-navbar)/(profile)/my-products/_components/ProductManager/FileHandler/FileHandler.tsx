"use client";
import { useFormContext } from "react-hook-form";
import FilePreviewContainer from "./FilePreviewContainer";
import FileSelector from "./FileSelector";
import { ReactNode, useEffect, useReducer } from "react";
import useIsMobile from "../../useIsMobile";
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
  | { type: "append"; files: FileType[] }
  | { type: "remove"; name: string };

export default function FileHandler({ label, required }: FileHandlerProps) {
  const { setError, clearErrors, setValue, getValues } = useFormContext();

  // Retrieve default values from form and format to FileType
  const initialValue = getValues("images").map((file: File) => ({
    content: file,
    url: URL.createObjectURL(file),
  }));
  // Stores and tracks all files and their preview urls. Can `append` or `remove` file from it using reducer actions.
  const [imageList, setImageList] = useReducer(reducer, initialValue);

  const isMobile = useIsMobile();

  // Handles image preview click. In this case, deletes file and preview from selected files.
  function handleClick(fileName: string) {
    setImageList({ type: "remove", name: fileName });
    setValue(
      "images",
      [...getValues("images").filter((image: File) => image.name !== fileName)],
      { shouldValidate: true }
    );
  }

  /* Handles file selection.
   * Checks if selected file is valid
   * Extracts Url from file to show a preview if possible
   * Updates ImageList state
   */
  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    // received files from input.
    const files = event.target.files;

    if (files) {
      //iterate file list.
      const fileList = Array.from(files);

      // new formatted file list
      let new_files: FileType[] = [];

      fileList.map((file) => {
        // Check if it's valid file. If not, set react-hook-form manual error.
        if (!isValidFile(file)) {
          setError("images", {
            type: "manual",
            message: "Invalid file",
          });
          let timeoutId = setTimeout(() => {
            clearErrors("images");
            clearTimeout(timeoutId);
          }, 2000);
          return;
        }
        // create url of image file for preview.
        let fileUrl = URL.createObjectURL(file);

        new_files.push({ content: file, url: fileUrl });
      });

      // Update imageList and formField value.
      setImageList({ type: "append", files: new_files });
      setValue(
        "images",
        [...getValues("images"), ...new_files.map((file) => file.content)],
        { shouldDirty: true, shouldValidate: true }
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

/*
 * State reducer. Two possible actions:
 * "append" => Add file and url to imageList
 * "remove" => Filter the imageList to remove a file.
 */
function reducer(state: StateType, action: StateAction): StateType {
  switch (action.type) {
    case "append":
      return [...state, ...action.files];
    case "remove":
      const new_list = state.filter(
        (file) => file.content.name !== action.name
      );
      return new_list;
    default:
      return state;
  }
}
