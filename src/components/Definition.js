export default {
  el: '#todo',
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    //追加ボタンを押したときにtodosに値を格納するメソッド
    addTodo() {
      //this.$refs.変数で入力した値を取得
      let comment = this.$refs.comment;
      if (!comment.value) {
        return;
      }
      // this.showTodo(todo);
      this.$store.commit('addTodo', { comment: comment });
      comment.value = '';
    },
    //タスクを削除するメソッド
    deleteTodo(todoId) {
      this.$store.commit('deleteTodo', {deleteId: todoId });
    },
    //タスクの状態を変更するメソッド
    changeStatus(todo) {
      const status = todo.status;

      if (status === '作業中') {
        todo.status = '完了';
      }
      if (status === '完了') {
        todo.status = '作業中';
      }
    },
    //プロパティを表示するメソッド
    showTodo(addTodos) {
      //現在保存されている配列情報を複製
      //const editTodos = addTodos.slice();

      //todosに保存されている要素を削除
      //this.todos.splice(0, this.todos.length);

      for (let i = 0; i < addTodos.length; i++) {
        this.todos.push(addTodos[i]);
        this.showData.push(addTodos[i]);
        //テストコード
        if (addTodos.length > 30) {
          return;
        }
      }
    },
    //ボタンをクリックした時の処理
    StateBtn(todos, value) {
      if (value === '全て') {
        this.showTodo(todos);
      } else if (value === '作業中') {
        //statusが作業中に該当するクエリを抽出する
        let todoStatus = todos.filter((todo) => {
          return todo.status === '作業中';
        });
        return this.showTodo(todoStatus);
      } else if (value === '完了') {
        //statusが作業中に該当するクエリを抽出する
        let todoStatus = todos.filter((todo) => {
          return todo.status === '完了';
        });
        return this.showTodo(todoStatus);
      }
    },
    todoListBtn() {
      console.log('dddd');
      this.$router.push('/');
    },
    workingBtn() {
      console.log('gggg');
      this.$router.push('/work');
    },
    finishBtn() {
      console.log('hhhh');
      this.$router.push('/finish');
    },
  },
  computed: {
    getTodos() {
      return this.$store.getters.getTodos;
    },
  },
};
