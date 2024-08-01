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

Backend response format should be like this :
```
{
	"videos": [
		{
			"name": "Rec 0028.mp4",
			"url": "http://video-sample-url.mp4",
			"date": "2024-07-31 12:26:13"
		},
			]
}
```
Features
Embed local video files ( at the moment Mp4 only)
Preview video directly in Editor.js
Supports metadata preloading

Configuration
fetchUrl
Type: string
Description: The URL endpoint to fetch the list of available videos.