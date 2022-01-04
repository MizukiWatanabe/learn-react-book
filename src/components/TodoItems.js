// TodoItemコンポーネント
// 親コンポーネントからtodoをpropsで受け取る
export const TodoItem = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem,
}) => {
  // TODOの状態を反転させる関数toggleTodoListItemStatusを実行する関数を宣言
  const handleToggleTodoListItemStatus = () =>
    toggleTodoListItemStatus(todo.id, todo.done);
  // TODOを削除するdeleteTodoListItemを実行する関数を宣言
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  return (
    <li>
      {todo.content}
      <button onClick={handleToggleTodoListItemStatus}>
        {todo.done ? '未完了リストへ' : '完了リストへ'}
      </button>
      <button onClick={handleDeleteTodoListItem}>削除</button>
    </li>
  );
};
