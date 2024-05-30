<template>
  <div class="card">
    <div class="flex mb-3 gap-2 justify-content-end">
      <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
      <Button @click="active = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
      <Button @click="active = 2" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
      <Button @click="active = 3" rounded label="4" class="w-2rem h-2rem p-0" :outlined="active !== 3" />
    </div>

    <Accordion v-model:activeIndex="active">
      <AccordionTab header="1. Ustawienia użytkownika">
        <div class="user-set-container">
          <ChangeInfo />
        </div>
      </AccordionTab>
      <AccordionTab header="2. Zdjęcie profilowe">
        <UploadProfile />
      </AccordionTab>
      <AccordionTab header="3. Opis konta">
        <Editor v-model="bio" editorStyle="height: 320px" />
      </AccordionTab>
      <AccordionTab header="4. Zmiana hasła">
        <p class="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
          facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus.
        </p>
      </AccordionTab>
    </Accordion>
  </div>
</template>
<style>
.user-set-container {
  display: flex;
  flex-direction: column;
  width: 40vw;
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
      name: null,
      lastName: null,
      bio: null,
    };
  },
  components: {
    UploadProfile,
    ChangeInfo,
  },
};
</script>
