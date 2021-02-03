<template>
  <div id="todo">
    <h1>Todoリスト</h1>
    <table id="table">
      <thead>
        <tr>
          <td>
            <input type="radio" name="check" value="全て" checked="checked"
            />全て
          </td>
          <td><input type="radio" name="check" />作業中</td>
          <td><input type="radio" name="check" />完了</td>
        </tr>
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" v-bind:key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.comment }}</td>
          <td>
            <button class="btn">
              {{ todo.status }}
            </button>
            <button class="btn">
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
    addTodo: function() {
      //this.$refs.変数で入力した値を取得
      let comment = this.$refs.comment;
      //入力された値が空なら処理を中断
      if (!comment.value) {
        return;
      }
      //追加するオブジェクトの作成
      const todo = {
        id: this.todos.length + 1,
        comment: comment.value,
        status: '作業中',
      };
      this.todos.push(todo);
      // フォーム要素を空にする
      comment.value = '';
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
.addBtn {
  margin-left: 10px;
}

</style>
