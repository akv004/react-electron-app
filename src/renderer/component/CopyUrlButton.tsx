import React from 'react';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const CopyUrlButton = ({ url }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      //alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <IconButton onClick={copyToClipboard} aria-label="copy">
      <FileCopyIcon />
    </IconButton>
  );
};

export default CopyUrlButton;
