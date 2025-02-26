<template>
  <NuxtLayout name="empty">
    <template #header>
      <AtomsHeadline :size="3" :variant="'light'"> Hogar </AtomsHeadline>
    </template>
    <div class="grid gap-6">
      <AtomsHeadline :size="1">Sad to see you go</AtomsHeadline>
      <AtomsContainer>
        We are sorry to see you go. You are always welcome back. <br />
        If you have any feedback, please let us know. <br />
        We are always looking to improve.
      </AtomsContainer>
      <AtomsButton @click="goHome">Go home</AtomsButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const goHome = () => {
  useRouter().push("/");
};
</script>
