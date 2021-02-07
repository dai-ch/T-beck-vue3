import { createStore } from 'vuex';

export default createStore({
  strict: true,
  state: {
    todos: [],
    todosManaged: [],
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
    }, //プロパティを表示するメソッド
    showTodo(state, newTodos) {
      //現在保存されている配列情報を複製
      const editTodos = state.todos.slice();
      console.log(editTodos);

      console.log(newTodos);
      //更新予定の値をaddNumに格納
      const addNum = newTodos;
      //console.log(addNum);
      //todosに保存されている要素を削除
      state.todos.splice(0, state.todos.length);
      //console.log('test');

      //addNumのプロパティをtodosにプッシュ
      for (let i = 0; i < addNum.length; i++) {
        this.state.todos.push(addNum[i]);
      }
      console.log(addNum);
    },
  },
  computed: {},
  getters: {
    getTodos(state) {
      return state.todos;
    },
    getFinishTodos(state) {
      return state.todosManaged;
    },
  },
  actions: {
    //ラジオボタンをクリックした時の処理
    changePageBtn(context, btnValue) {
      const BtnValue = btnValue.btnValue;
      //各ボタンに応じて画面出力するデータを抽出
      if (BtnValue === '全て') {
        let todoStatus = this.state.todos.filter((todo) => {
          return todo.status;
        });
        context.commit('showTodo', todoStatus);
      } else if (BtnValue === '作業中') {
        //statusが作業中に該当するクエリを抽出する
        let todoStatus = this.state.todos.filter((todo) => {
          return todo.status === '作業中';
        });
        context.commit('showTodo', todoStatus);
      } else if (BtnValue === '完了') {
        //statusが作業中に該当するクエリを抽出する
        let todoStatus = this.state.todos.filter((todo) => {
          return todo.status === '完了';
        });
        context.commit('showTodo', { todoStatus:todoStatus,BtnValue:BtnValue });
      }
    },
  },
  modules: {},
});
