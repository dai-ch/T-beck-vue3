import { createStore } from 'vuex';

export default createStore({
  strict: true,
  state: {
    todos: [],
  },
  mutations: {
    addTodo(state, newComment) {
      const todo = {
        id: '',
        comment: '',
        status: '作業中',
      };
      todo.id = state.todos.length;
      todo.comment = newComment.comment.value;
      state.todos.push(todo);
    },
    deleteTodo(state, deleteTodo) {
      //spliceメソッドでtodo.idをキーにして配列を削除
      state.todos.splice(deleteTodo.id, 1);

      //todosの配列の長さを再計算し、各要素番号をidへ代入する
      for (let i = 0; i < state.todos.length; i++) {
        state.todos[i].id = i;
      }
    },
    changeStatus(state, changeStatus) {
      //第2引数はクリックされたボタンに対応するidとstatusのパラメータ
      if (changeStatus.status === '作業中') {
        state.todos[changeStatus.id].status = '完了';
      }
      if (changeStatus.status === '完了') {
        state.todos[changeStatus.id].status = '作業中';
      }
    },
  },
  computed: {},
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
  actions: {
  },
  modules: {},
});
