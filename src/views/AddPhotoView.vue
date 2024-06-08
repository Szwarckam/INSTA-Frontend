<template>
  <div class="card" id="addFormContainer">
    <div class="add-photo-container">
      <div class="flex flex-column gap-2">
        <label for="username">Name</label>
        <InputText id="username" v-model="name" aria-describedby="username-help" />

        <FloatLabel>
          <Chips id="tags" v-model="tags" @keyup.enter="checkTags(this.value)" />
          <label for="tags">Tags</label>
        </FloatLabel>
        <Editor v-model="desc" editorStyle="min-height: 320px" class="mb-2" />
      </div>
      <FileUpload
        name="demo[]"
        url="/api/upload"
        @upload="onTemplatedUpload($event)"
        customUpload
        @uploader="customBase64Uploader"
        :multiple="false"
        accept="image/*"
        :maxFileSize="1000000"
        @select="onSelectedFiles"
      >
        <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
          <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
            <div class="flex gap-2">
              <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined></Button>
              <Button
                @click="uploadEvent(uploadCallback)"
                icon="pi pi-cloud-upload"
                rounded
                outlined
                severity="success"
                :disabled="!files || files.length === 0"
              ></Button>
              <Button
                @click="clearCallback()"
                icon="pi pi-times"
                rounded
                outlined
                severity="danger"
                :disabled="!files || files.length === 0"
              ></Button>
            </div>
            <ProgressBar
              :value="totalSizePercent"
              :showValue="false"
              :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
            >
              <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
            </ProgressBar>
          </div>
        </template>
        <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
          <div v-if="files.length > 0">
            <h5>Pending</h5>
            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
              <div
                v-for="(file, index) of files"
                :key="file.name + file.type + file.size"
                class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
              >
                <div>
                  <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                </div>
                <span class="font-semibold">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Pending" severity="warning" />
                <Button
                  icon="pi pi-times"
                  @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>

          <div v-if="uploadedFiles.length > 0">
            <h5>Completed</h5>
            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
              <div
                v-for="(file, index) of uploadedFiles"
                :key="file.name + file.type + file.size"
                class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3"
              >
                <div>
                  <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                </div>
                <span class="font-semibold">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Completed" class="mt-3" severity="success" />
                <Button
                  icon="pi pi-times"
                  @click="removeUploadedFileCallback(index)"
                  outlined
                  rounded
                  severity="danger"
                />
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          <div class="flex align-items-center justify-content-center flex-column">
            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
          </div>
        </template>
      </FileUpload>
    </div>
  </div>
</template>

<style>
.add-photo-container {
  /* display: flex; */
  width: 70vw;
}

#addFormContainer {
  width: 80vw;
  margin: 0 auto;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      files: [],
      tags: [],
      name: "",
      desc: "",
      totalSize: 0,
      totalSizePercent: 0,
    };
  },
  methods: {
    checkTags() {
      const uniqueTags = new Set();

      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i][0] !== "#") {
          this.tags[i] = "#" + this.tags[i];
        }
        uniqueTags.add(this.tags[i]);
      }

      this.tags = Array.from(uniqueTags);
    },
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
    async customBase64Uploader(event) {
      const formData = new FormData();
      formData.append("file", this.files[0], this.files[0].name);
      formData.append("title", this.name);
      formData.append("desc", this.desc);
      formData.append("tags", this.tags);

      try {
        const token = this.$store.getters.GET_TOKEN;
        const response = await axios.post("http://localhost:3000/api/photos", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data); // Wyświetlenie danych z odpowiedzi serwera
        if (response.status >= 200 && response.status < 300) {
          this.showToast("success", "File Uploaded");
          await this.$store.dispatch("GET_PHOTOS_LIST");
          this.$router.push({ name: "detail", params: { id: response.data.file.id } });
        } else {
          this.showToast("error", "Upload failed");
        }
      } catch (error) {
        console.error("Error:", error);
        this.showToast("error", "Upload failed");
      }
    },
    onRemoveTemplatingFile(file, removeFileCallback, index) {
      removeFileCallback(index);
      this.totalSize -= file.size;
      this.totalSizePercent = (this.totalSize / 1000000) * 100;
    },
    onSelectedFiles(event) {
      if (event.files.length > 1) {
        // Ensure only the first file is selected if multiple files are selected
        this.files = [event.files[0]];
      } else {
        this.files = event.files;
      }
      this.totalSize = this.files.reduce((acc, file) => acc + file.size, 0);
      this.totalSizePercent = (this.totalSize / 1000000) * 100;
    },
    uploadEvent(callback) {
      this.totalSizePercent = (this.totalSize / 1000000) * 100;
      callback();
    },
    onTemplatedUpload() {
      this.$toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
    },
    formatSize(bytes) {
      const k = 1024;
      const dm = 2;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
  },
};
</script>
