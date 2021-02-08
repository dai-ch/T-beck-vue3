<template>
  <div id="todo">
    <table id="table">
      <thead>
        <tr>
          <td>
            <input
              type="radio"
              checked="checked"
              name="workingStatus"
              v-on:click="todoListPageBtn"
            />全て
          </td>
          <td>
            <input
              type="radio"
              name="workingStatus"
              v-on:click="workingPageBtn
              "
            />作業中!!!!!!
          </td>
          <td>
            <input
              name="workingStatus"
              type="radio"
              v-on:click="finishPageBtn"
            />完了
          </td>
        </tr>
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in getTodos" v-bind:key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.comment }}</td>
          <td>
            <button class="btn" v-on:click="changeStatus(todo.status,todo.id)">
              {{ todo.status }}
            </button>
            <button class="btn" v-on:click="deleteTodo(todo.id)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>新規タスクの追加</h2>
    <form id="form" v-on:submit.prevent="addTodo">
      <input type="text" ref="comment" />
      <input type="submit" class="addBtn" value="追加" />
    </form>
  </div>
</template>


<script>
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
      this.$store.commit('addTodo', { comment: comment });
      comment.value = '';
    },
    //タスクを削除するメソッド
    deleteTodo(todoId) {
      this.$store.commit('deleteTodo', {id: todoId });
    },
    //タスクの状態を変更するメソッド
    changeStatus(todoStatus,todoId) {
      this.$store.commit('changeStatus', {status: todoStatus,id: todoId });
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
    todoListPageBtn() {
      console.log('dddd');
      this.$router.push('/');
    },
    workingPageBtn() {
      this.$store.commit('workingPageBtn');

    },
    finishPageBtn() {
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

</script>

<style scoped>
#todo {
  width: 100%;
  margin: 0 auto;
  text-align: left;
}
.btn {
  padding: 0 3px;
  margin-right: 10px;
}
.btn:active {
  background-color: blue;
  color: #fff;
}
.addBtn {
  margin-left: 10px;
}
.addBtn:active {
  margin-left: 10px;
  background-color: blue;
  color: #fff;
}
</style>
