import React, { useState, useEffect } from 'react';
import { RepoLink } from '../common/RepoLink'; // Adjust the path as needed
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Chip, Link } from '@mui/material';
import CopyUrlButton from './CopyUrlButton';

const UrlFetcher: React.FC = () => {
  const [urls, setUrls] = useState<RepoLink[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [label, setLabel] = useState('');
  const [group, setGroup] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const fetchedUrls: RepoLink[] = await window.electron.ipcRenderer.invoke('get-urls');
    setUrls(fetchedUrls);
  };

  const addUrl = async () => {
    const repoLink: RepoLink = { url: newUrl, label, group };
    await window.electron.ipcRenderer.invoke('add-url', repoLink);
    fetchUrls(); // Re-fetch URLs after adding
    setNewUrl('');
    setLabel('');
    setGroup('');
  };

  const handleOpenUrl = (url) => {
    window.electron.ipcRenderer.sendMessage('open-external', [url]);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>GitHub Repo Links</h2>
      <TextField
        label="URL"
        variant="outlined"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <TextField
        label="Label"
        variant="outlined"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <TextField
        label="Group"
        variant="outlined"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={addUrl}>
        Add URL
      </Button>
      <List>
        {urls.map((link, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Link component="button" variant="body2" onClick={() => handleOpenUrl(link.url)}>
                  {link.url} - {link.label} - {link.group}
                </Link>
              }
            />
            <CopyUrlButton url={link.url} />
          </ListItem>

        ))}
      </List>
    </div>
  );
};

export default UrlFetcher;
