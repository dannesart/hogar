<template>
  <section class="flex flex-col gap-6">
    <AtomsHeadline :size="4"> {{ id || title }} </AtomsHeadline>

    <template v-if="id">
      <template v-for="todo in todoState.todos">
        <MoleculesCard :title="todo.label" :icon="icon">
          <template v-slot:corner>
            <AtomsToggle
              :toggled="todo.completed"
              :size="'small'"
              @toggle="todo.completed = $event"
            />
          </template>
        </MoleculesCard>
      </template>
      <AtomsEmpty v-if="!todoState.todos.length">
        <AtomsHeadline :size="5"> No todo's yet. </AtomsHeadline>
      </AtomsEmpty>
      <AtomsLabel> {{ amountOfCompleted }} completed todos </AtomsLabel>
      <MoleculesAction
        :variant="'add'"
        :standalone="true"
        @action="toggleCreateTodo"
        :float="true"
      ></MoleculesAction>
      <AtomsModal v-if="showCreateTodo" @close="toggleCreateTodo">
        <template v-slot:header>
          <AtomsHeadline :size="2">New todo</AtomsHeadline>
        </template>
        <div class="flex flex-col gap-4">
          <AtomsInput
            :label="'Name'"
            :icon="'lucide:letter-text'"
            :required="true"
            :value="valueRef"
            @update="handleUpdate"
          />
          <AtomsButton @click="saveTodo">Add</AtomsButton>
        </div>
      </AtomsModal>
    </template>
    <template v-else>
      <template v-for="(value, key) in appState">
        <MoleculesCard
          :title="key as string"
          :link="'/apps/todo/' + key"
          :icon="icon"
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
    </template>
  </section>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
};
type Todo = {
  label: string;
  id: string;
  completed: boolean;
};
const appId = "Todo";
const icon = "lucide:list-todo";
const { id } = useRoute().params;
const { title = "todos" } = defineProps<Props>();

const appsStore = useAppsStore();
const { setState } = appsStore;
const { stateByApp, stateById } = storeToRefs(appsStore);
const appState = computed(() => stateByApp.value(appId));
const todoState = computed(() => stateById.value(appId, id as string));
const amountOfLists = computed(() => Object.keys(appState.value).length);
const amountOfCompleted = computed(
  () => todoState.value.todos.filter((todo: Todo) => todo.completed).length
);

const valueRef = ref();
const showCreateTodoList = ref(false);
const showCreateTodo = ref(false);
const handleUpdate = (value: string) => (valueRef.value = value);
const saveTodoList = () => {
  setState(appId, valueRef.value, {
    todos: [],
  });
  toggleCreateTodoList();
};
const saveTodo = () => {
  setState(appId, id as string, {
    todos: [
      ...todoState.value.todos,
      {
        id: crypto.randomUUID(),
        label: valueRef.value,
        completed: false,
      },
    ],
  });
  toggleCreateTodo();
};
const toggleCreateTodoList = () => {
  showCreateTodoList.value = !showCreateTodoList.value;
};
const toggleCreateTodo = () => {
  showCreateTodo.value = !showCreateTodo.value;
};

const addTodo = () => {};
const removeTodo = () => {};
const completeTodo = () => {};
</script>
