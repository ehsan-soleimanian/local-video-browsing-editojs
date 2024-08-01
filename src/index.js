class LocalVideo {
  static get toolbox() {
    return {
      title: "Local Video",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M19.467 7.125c-1.333-1.333-3.132-2.126-5.032-2.126-1.9 0-3.698.793-5.031 2.126-2.773 2.773-2.773 7.293 0 10.066 1.333 1.333 3.132 2.126 5.031 2.126s3.699-.793 5.032-2.126c2.772-2.773 2.772-7.293 0-10.066zm-5.032 8.942c-2.103 0-3.808-1.705-3.808-3.808s1.705-3.808 3.808-3.808c2.103 0 3.808 1.705 3.808 3.808s-1.705 3.808-3.808 3.808zm6.015-10.67l-1.063-1.062c-.306-.305-.74-.396-1.145-.265-.962.304-1.853.768-2.627 1.402-.346.28-.396.779-.109 1.12l1.036 1.237c.236.282.64.313.916.082.498-.44 1.083-.78 1.72-1.002.347-.118.671-.14.922-.053.254.087.507-.056.627-.256.527-.906.83-1.952.814-2.944-.017-1.092-.373-2.168-1.024-3.071-.17-.24-.576-.24-.767-.07-.271.256-.581.479-.922.648-.343.17-.742.293-1.172.359-.352.056-.628.342-.682.694-.055.352.086.707.363.907.363.264.682.632.93 1.055.214.364.349.781.376 1.222.034.586-.052 1.197-.26 1.798-.114.323-.067.69.123.957.332.467.825.869 1.392 1.136.236.112.497.08.709-.086z"/></svg>`
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, api, config, readOnly }) {
    this.api = api;
    this.data = data || {};
    this.config = config || {};
    this.readOnly = readOnly;
    this.wrapper = null;
    this.modal = null;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("local-video");

    if (this.data.url) {
      const player = document.createElement("video");
      player.src = this.data.url;
      player.setAttribute("controls", "");
      player.setAttribute("width", "100%");
      this.wrapper.appendChild(player);
    }

    if (!this.readOnly) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Click to select a video";
      input.value = this.data.url || "";
      input.readOnly = true;
      input.classList.add("form-control");

      input.addEventListener("click", () => {
        this.showModal();
      });

      this.wrapper.appendChild(input);
    }

    return this.wrapper;
  }

  fetchVideos() {
    const fetchUrl = this.config.fetchUrl;
    if (!fetchUrl) {
      return Promise.reject("No fetch URL provided");
    }
    
    return fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => data.videos || []);
  }

  async showModal() {
    if (!this.modal) {
      this.modal = this.createModal();
    }

    const videos = await this.fetchVideos().catch(error => {
      console.error(error);
      return [];
    });
    
    const videoList = this.modal.querySelector(".video-list");
    videoList.innerHTML = "";

    videos.forEach((video) => {
      const videoItem = document.createElement("div");
      videoItem.classList.add("video-item");

      const videoPreview = document.createElement("video");
      videoPreview.src = video.url;
      videoPreview.classList.add("video-preview");
      videoPreview.setAttribute("controls", "");
      videoPreview.setAttribute("preload", "metadata");
      videoPreview.setAttribute("width", "150");
      videoPreview.setAttribute("muted", "");

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("video-info");

      const name = document.createElement("div");
      name.textContent = video.name;
      name.classList.add("video-name");

      const date = document.createElement("div");
      date.textContent = `Uploaded on: ${video.date}`;
      date.classList.add("video-date");

      infoDiv.appendChild(name);
      infoDiv.appendChild(date);

      videoItem.addEventListener("click", () => {
        this.selectVideo(video.url);
        this.closeModal();
      });

      videoItem.appendChild(videoPreview);
      videoItem.appendChild(infoDiv);
      videoList.appendChild(videoItem);
    });

    document.body.appendChild(this.modal);
  }

  createModal() {
    const modal = document.createElement("div");
    modal.classList.add("addLocalVideoModal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", () => this.closeModal());

    const videoList = document.createElement("div");
    videoList.classList.add("video-list");

    modalContent.appendChild(closeButton);
    modalContent.appendChild(videoList);
    modal.appendChild(modalContent);

    return modal;
  }

  closeModal() {
    if (this.modal) {
      this.modal.remove();
    }
  }

  selectVideo(url) {
    this.data.url = url;
    const input = this.wrapper.querySelector("input");
    if (input) {
      input.value = url;
    }

    const existingPlayer = this.wrapper.querySelector("video");
    if (existingPlayer) {
      existingPlayer.remove();
    }

    const player = document.createElement("video");
    player.src = url;
    player.setAttribute("controls", "");
    player.setAttribute("width", "100%");
    this.wrapper.appendChild(player);

    const blockIndex = this.api.blocks.getCurrentBlockIndex();
    this.api.blocks.update(blockIndex, this.save());
  }

  save() {
    return {
      url: this.data.url,
    };
  }
}

export default LocalVideo;
