import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';
import MuxUploader from '@mux/mux-uploader-react';

function LessonForm({ addLesson }) {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const mux = new Mux({
      tokenId: process.env.REACT_APP_MUX_TOKEN_ID,
      tokenSecret: process.env.REACT_APP_MUX_TOKEN_SECRET
    });

    mux.video.uploads.create({
      cors_origin: 'https://your-browser-app.com', 
      new_asset_settings: {
        playback_policy: ['public'],
        encoding_tier: 'baseline'
      }
    }).then(upload => {
      setUploadUrl(upload.url);
    }).catch(error => {
      console.error('Error creating upload:', error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLesson({ title, video: videoUrl });
    setTitle('');
    setVideoUrl('');
  };

  const handleVideoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const upload = await axios.post('/api/get-mux-upload-url');
        const uploadURL = upload.data.url;
        await axios.put(uploadURL, file, {
          headers: {
            'Content-Type': file.type,
          },
        });

        const playbackId = upload.data.id;
        setVideoUrl(`https://stream.mux.com/${playbackId}.m3u8`);
      } catch (error) {
        console.error('Error uploading video to Mux:', error);
      }
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="LessonForm">
      <TextField
        id="standard-basic"
        value={title}
        label="Lesson Title"
        onChange={(e) => setTitle(e.target.value)}
        variant="standard"
        required
      />
      <div className="course-video-container">
        <div className="course-video-title">Course Video</div>
        <MuxUploader endpoint="https://api.mux.com/video/v1/uploads" />

      </div>
      <Button type="submit" variant="contained">Add Lesson</Button>
    </form>
  );
}

export default LessonForm;
