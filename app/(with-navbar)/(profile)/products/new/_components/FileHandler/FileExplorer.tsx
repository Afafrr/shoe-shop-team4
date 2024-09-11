import { Link } from "@mui/material";
import React, { ReactNode } from "react";

type FileExplorerProps = {
  children: ReactNode;
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
        {children}
      </Link>
    </div>
  );
};

export default FileExplorer;
