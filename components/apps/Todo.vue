<template>
  <section class="flex flex-col gap-6">
    <AtomsHeadline :size="4">
      {{ title }}
    </AtomsHeadline>
    <template v-for="(value, key) in state">
      <MoleculesCard :title="key as string"></MoleculesCard>
    </template>
    <AtomsEmpty v-if="!state">
      <AtomsHeadline :size="5"> No todo's yet. </AtomsHeadline>
    </AtomsEmpty>
    <MoleculesAction
      :variant="'add'"
      :standalone="true"
      @action="toggleCreateTodoList"
      :float="true"
    ></MoleculesAction>
    <AtomsModal v-if="showCreateTodoList" @close="toggleCreateTodoList">
      <template v-slot:header>
        <AtomsHeadline :size="2">New todo-list</AtomsHeadline>
      </template>
      <div class="flex gap-4">
        <AtomsInput
          :label="'Name'"
          :icon="'lucide:letter-text'"
          :class="'flex-1'"
          :required="true"
          :value="valueRef"
          @update="handleUpdate"
        />
        <AtomsButton @click="saveTodoList">Add</AtomsButton>
      </div>
    </AtomsModal>
  </section>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
};
const appId = "Todo";

const { title = "todos" } = defineProps<Props>();

const appsStore = useAppsStore();
const { setState } = appsStore;
const { stateByApp } = storeToRefs(appsStore);
const state = computed(() => stateByApp.value(appId));

const valueRef = ref();
const showCreateTodoList = ref(false);
const handleUpdate = (value: string) => (valueRef.value = value);
const saveTodoList = () => {
  setState(appId, valueRef.value, {
    todos: [],
  });
  toggleCreateTodoList();
};
const toggleCreateTodoList = () => {
  showCreateTodoList.value = !showCreateTodoList.value;
};

const addTodo = () => {};
const removeTodo = () => {};
const completeTodo = () => {};
</script>
