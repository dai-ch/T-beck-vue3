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
              v-on:click="changePageBtn((value = '全て'))"
              v-model="jobStatus"
              value="全て"
            />全て
          </td>
          <td>
            <input
              type="radio"
              name="workingStatus"
              v-on:click="changePageBtn((value = '作業中'))"
              v-model="jobStatus"
              value="作業中"
            />作業中
          </td>
          <td>
            <input
              name="workingStatus"
              type="radio"
              v-on:click="changePageBtn((value = '完了'))"
              v-model="jobStatus"
              value="完了"
            />完了
          </td>
        </tr>
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
        </tr>
      </thead>
      <tbody v-if="jobStatus == '全て'">
        <tr v-for="todo in getTodos" v-bind:key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.comment }}</td>
          <td>
            <button class="btn" v-on:click="changeStatus(todo.status, todo.id)">
              {{ todo.status }}
            </button>
            <button class="btn" v-on:click="deleteTodo(todo.id)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="jobStatus == '作業中'">
        ssssss
        <tr v-for="todo in getTodos" v-bind:key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.comment }}</td>
          <td>
            <button class="btn" v-on:click="changeStatus(todo.status, todo.id)">
              {{ todo.status }}
            </button>
            <button class="btn" v-on:click="deleteTodo(todo.id)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-if="jobStatus == '完了'">
        oookokoko
        <tr v-for="todo in getTodos" v-bind:key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.comment }}</td>
          <td>
            <button class="btn" v-on:click="changeStatus(todo.status, todo.id)">
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
      jobStatus: '全て',
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
      this.$store.commit('deleteTodo', { id: todoId });
    },
    //タスクの状態を変更するメソッド
    changeStatus(todoStatus, todoId) {
      this.$store.commit('changeStatus', { status: todoStatus, id: todoId });
    },
    //ラジオボタンを押して表示を切り替えるメソッド
    changePageBtn(changeBtnValue) {
      this.$store.dispatch('changePageBtn', { btnValue: changeBtnValue });
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
