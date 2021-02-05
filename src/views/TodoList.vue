<template>
  <div id="todo">
    <h1>Todoリスト</h1>
    <table id="table">
      <thead>
        <tr>
          <td>
            <input
              type="radio"
              checked="checked"
              name="workingStatus"
              v-on:click="StateBtn(todos, (value = '全て'))"
            />全て
          </td>
          <td>
            <input
              type="radio"
              name="workingStatus"
              v-on:click="StateBtn(todos, (value = '作業中'))"
            />作業中
          </td>
          <td>
            <input
              name="workingStatus"
              type="radio"
              v-on:click="StateBtn(todos, (value = '完了'))"
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
        <tr v-for="todo in todos" v-bind:key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.comment }}</td>
          <td>
            <button class="btn" v-on:click="changeStatus(todo)">
              {{ todo.status }}
            </button>
            <button class="btn" v-on:click="deleteTodo(todo)">
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

<script src="../components/Definition.js"></script>

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
