# Editor.js LocalVideo Block Tool

An Editor.js block tool for embedding and previewing local videos.

## Installation

Install via npm:

```bash
npm install editorjs-localvideo

import EditorJS from '@editorjs/editorjs';
import LocalVideo from 'editorjs-localvideo';

const editor = new EditorJS({
  tools: {
    localVideo: {
      class: LocalVideo,
      config: {
        fetchUrl: 'https://your-api-endpoint.com/getVideosUploaded'
      }
    }
  }
});

```

Features
Embed local video files
Preview video directly in Editor.js
Supports metadata preloading

Configuration
fetchUrl
Type: string
Description: The URL endpoint to fetch the list of available videos.