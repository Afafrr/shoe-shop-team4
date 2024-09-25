"use client";
import { Link } from "@mui/material";
import React, { ReactNode } from "react";

/* Component to manage the selection of files:
 * Allows for the selection of multiple files.
 * Input element is hidden. Provides an anchor text to add files to it.
 */
type FileExplorerProps = {
  children?: ReactNode;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileExplorer = ({ children, handleFileChange }: FileExplorerProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(e)}
      />
      <Link
        href={"#"}
        sx={{
          textDecoration: "underline",
          color: "blue",
          "&:hover": {
            color: "red",
            textDecoration: "underline",
          },
        }}
        onClick={handleOpenFilePicker}
      >
        {children || "select file"}
      </Link>
    </div>
  );
};

export default FileExplorer;
