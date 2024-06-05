<template>
  <div class="card">
    <!-- <Toast /> -->
    <div class="card flex justify-content-center">
      <FileUpload
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        customUpload
        @uploader="onCustomUpload"
        @select="onSelectedFiles"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
    };
  },
  methods: {
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    onSelectedFiles(event) {
      this.files = event.files;
      this.totalSize = this.files.reduce((total, file) => total + file.size, 0);
      this.totalSizePercent = this.totalSize / 10;
    },
    async onCustomUpload() {
      const formData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        formData.append("file", this.files[i], this.files[i].name);
      }
      // const result = await this.$store.dispatch("POST_UPLOAD_PROFILE_PHOTO", {
      //   formData,
      // });
      // console.log(result);
      // if (result.status == 404) {
      //   this.showToast("error", result.message);
      // } else if (result.status >= 200 && result.status < 300) {
      //   this.showToast("success", result.message);

      //   this.$router.push("/");
      // }
      // } else {
      //   //POST_CHANGE_PASS
      //   this.showToast("error", "Passwords cant be same");
      // }
      // POST_UPLOAD_PROFILE_PHOTO
      try {
        const token = this.$store.getters.GET_TOKEN;

        const response = await fetch("http://localhost:3000/api/profile", {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        });

        if (response.ok) {
          this.showToast("success", "File Uploaded");
          // Handle successful upload logic
        } else {
          this.showToast("error", "Upload failed");
        }
      } catch (error) {
        this.showToast("error", "Upload failed");
      }
    },
    formatSize(bytes) {
      const k = 1024;
      const dm = 2;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) return `0 ${sizes[0]}`;

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
  },
};
</script>
