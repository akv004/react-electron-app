import React, { useState, useEffect } from 'react';
import { RepoLink } from '../../common/interfaces/RepoLink'

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

  return (
    <div>
      <h2>GitHub Repo Links</h2>
      <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL" />
      <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
      <input value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Group" />
      <button onClick={addUrl}>Add URL</button>
      <ul>
        {urls.map((link, index) => (
          <li key={index}>{link.url} - {link.label} - {link.group}</li>
        ))}
      </ul>
    </div>
  );
};

export default UrlFetcher;
