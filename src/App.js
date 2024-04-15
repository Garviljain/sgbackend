import React, { useState } from 'react';
import axios from 'axios';
import { computeHeadingLevel } from '@testing-library/react';


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const API_URL = 'http://localhost:4000/api/uploadAndGenerateSubtitles';
  console.log("Hello")

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('video', selectedFile);
    
    try {
      const response = await axios.post(API_URL, formData, {
        responseType: 'blob', // Set response type to blob
      });

      // Create a download link for the generated .srt file
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(downloadUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  };

  return (
    <>
    <div className='App'>
      <h1>Subtitle Generator</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile || loading}>
        Upload Video
      </button>
      {loading && <p>Uploading...</p>}
      {downloadLink && (
        <div>
          <p>Subtitles generated successfully! Click the link below to download.</p>
          <a href={downloadLink} download="subtitles.srt">Download Subtitles</a>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
