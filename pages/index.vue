<template>
  <NuxtLayout :class="'bg-gray-50'">
    <template v-slot:header>
      <!-- <AtomsHeadline :size="3">Hogar</AtomsHeadline> -->
    </template>
    <div v-if="user" class="grid gap-8">
      <AtomsHeadline :size="1">
        Welcome
        <span class="text-rose-300"> home</span><br />
        {{ user.displayName }}
      </AtomsHeadline>

      <div class="grid gap-6">
        <AtomsHeadline :size="4" :underline="true"> Shortcuts </AtomsHeadline>
        <div class="grid gap-6 grid-cols-2" v-if="amountOfShortCuts">
          <MoleculesCard
            :title="value.label"
            :icon="'lucide:list-todo'"
            :variant="'vertical'"
            :link="value.route"
            v-for="(value, key) in shortCuts"
          >
            <template v-slot:corner>
              <Icon
                :name="'lucide:star-off'"
                :size="30"
                @click="toggleShortCut(value.route)"
                :class="'cursor-pointer'"
              />
            </template>
          </MoleculesCard>
        </div>
        <AtomsEmpty v-else>
          <AtomsHeadline :size="5"> No shortcuts yet. </AtomsHeadline>
        </AtomsEmpty>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~~/stores/user";

const { user } = storeToRefs(useUserStore());
const appsStore = useAppsStore();
const { removeShortCut } = appsStore;
const { shortCuts } = storeToRefs(appsStore);

const amountOfShortCuts = computed(() => Object.keys(shortCuts.value).length);

const toggleShortCut = (route: string) => {
  removeShortCut(route);
};
</script>

<script lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
