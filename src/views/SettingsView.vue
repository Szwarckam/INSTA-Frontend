<template>
  <div class="card">
    <div class="flex mb-3 gap-2 justify-content-end">
      <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
      <Button @click="active = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
      <Button @click="active = 2" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
      <Button @click="active = 3" rounded label="4" class="w-2rem h-2rem p-0" :outlined="active !== 3" />
    </div>

    <Accordion v-model:activeIndex="active">
      <AccordionTab header="1. Informacje o użytkowniku">
        <div class="user-set-container">
          <ChangeInfo />
        </div>
      </AccordionTab>
      <AccordionTab header="2. Zdjęcie profilowe">
        <UploadProfile />
      </AccordionTab>
      <AccordionTab header="3. Opis konta">
        <Editor v-model="userBio" editorStyle="height: 320px" />
      </AccordionTab>
      <AccordionTab header="4. Zmiana hasła"> </AccordionTab>
    </Accordion>
  </div>
</template>
<style>
.user-set-container {
  display: flex;
  flex-direction: column;

  /* left: 30vw; */
  /* transform: translate(+50%); */
}
</style>
<script>
import UploadProfile from "@/components/UploadProfile.vue";
import ChangeInfo from "@/components/ChangeInfo.vue";
export default {
  data() {
    return {
      active: 0,
      userBio: "",
    };
  },
  components: {
    UploadProfile,
    ChangeInfo,
  },
  methods: {
    // checkBio() {
    //   console.log(this.bio);
    // },
    showToast(type, message) {
      this.$toast.add({ severity: type, summary: "", detail: message, life: 3000 });
    },
  },
  computed: {
    // getBio() {
    //   this.bio = this.$store.getters.GET_BIO;
    // },
  },
  async created() {
    console.log("Created");
    console.log("GET data successful!");
    const result = await this.$store.dispatch("POST_PROFILE_INFO", this.$store.getters.GET_TOKEN);
    console.log(result);
    if (result.status >= 400 && result.status < 500) {
      this.$router.push("/login");
      this.showToast("error", result.message);
    } else if (result.status >= 200 && result.status < 300) {
      this.$store.commit("SET_USER_DATA", result.profileData);
      this.userBio = this.$store.getters.GET_BIO;
      console.log(this.userBio);
      setInterval(() => {
        console.log(this.userBio);
      }, 100);
      // this.showToast("success", result.message);
      // this.$router.push("/login");
    }
  },
};
</script>
