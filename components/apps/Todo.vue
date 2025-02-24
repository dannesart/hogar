<template>
  <section class="flex flex-col gap-6">
    <AtomsHeadline :size="4">
      {{ title }}
    </AtomsHeadline>
    <template v-for="(value, key) in state">
      <MoleculesCard
        :title="key as string"
        :link="'/apps/todo/' + key"
        :icon="'lucide:list-todo'"
        :editable="true"
        :actions="[
          {
            label: 'Invite',
            actionId: 'invite',
            disabled: false,
          },
          {
            label: 'Members',
            actionId: 'members',
            variant: 'secondary',
            disabled: false,
          },
          {
            label: 'Delete',
            actionId: 'delete',
            variant: 'transparent',
            disabled: false,
          },
          {
            label: 'Leave',
            actionId: 'leave',
            variant: 'transparent',
            disabled: false,
          },
        ]"
      >
        Todos: {{ value.todos.length }}
      </MoleculesCard>
    </template>
    <AtomsEmpty v-if="!amountOfLists">
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
      <div class="flex flex-col gap-4">
        <AtomsInput
          :label="'Name'"
          :icon="'lucide:letter-text'"
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
const amountOfLists = computed(() => Object.keys(state.value).length);

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
