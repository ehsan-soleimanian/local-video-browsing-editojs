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
        // Custom configuration options
      }
    }
  }
});
```