<template>
  <div class="flex flex-col min-h-svh bg-gray-50">
    <header class="py-5 px-5 md:px-10 flex gap-4 items-center md:sticky top-0">
      <button
        class="rounded-full flex justify-center items-center cursor-pointer"
        v-wave
        v-if="isChild"
        @click.prevent="parentRoute"
      >
        <Icon name="lucide:arrow-left" :size="30" />
      </button>
      <div
        class="flex-1 overflow-hidden text-ellipsis flex justify-between items-center"
      >
        <slot name="header" />
      </div>
    </header>
    <main
      class="px-5 md:px-10 md:pb-32 flex-1 max-w-screen-xl w-full self-center relative"
    >
      <slot />
    </main>
    <nav
      class="sticky bottom-0 px-5 md:px-10 py-5 bg-inherit flex justify-between md:shadow-md md:rounded-full md:max-w-max md:min-w-96 md:bottom-10 md:self-center"
    >
      <NuxtLink
        v-for="nav in navs"
        :to="nav.route"
        class="flex flex-col gap-1 justify-center items-center cursor-pointer"
        activeClass="text-rose-400"
      >
        <Icon :name="nav.icon" size="30" />

        <label>{{ nav.label }}</label>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const isChild = computed(() => {
  return useRoute().path.split("/").length > 2;
});
const parentRoute = () => {
  const path = useRoute().path.split("/").slice(0, -1).join("/");
  useRouter().push(path);
};

const iconBase = "lucide:";
const navs = [
  {
    label: "Home",
    icon: iconBase + "house",
    route: "/",
  },
  {
    label: "Apps",
    icon: iconBase + "grip",
    route: "/apps",
  },
  {
    label: "Family",
    icon: iconBase + "users-round",
    route: "/family",
  },
  {
    label: "Profile",
    icon: iconBase + "user-round",
    route: "/profile",
  },
];
</script>
