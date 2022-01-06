// TODOlistコンポーネント

import { TodoItem } from './TodoItems';
import { TodoTitle } from './TodoTitle';

import { List } from '@chakra-ui/react';

// 親コンポーネントからtodolistをpropsで受け取る
export const TodoList = ({
  todoList,
  toggleTodoListItemStatus,
  deleteTodoListItem,
  title,
  as,
  fontSize,
}) => {
  return (
    <>
      {/* todoListの配列の中身が空のときは見出しとTODOリストの両方を表示させない */}
      {todoList.length !== 0 && (
        <>
          <TodoTitle title={title} as={as} fontSize={fontSize} mt="12" />
          <List w="full">
            {todoList.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                toggleTodoListItemStatus={toggleTodoListItemStatus}
                deleteTodoListItem={deleteTodoListItem}
              />
              // <li key={todo.id}>
              //   {todo.content}({todo.done ? '完了' : '未完了'})
              //   <button>{todo.done ? '未完了リストへ' : '完了リストへ'}</button>
              //   <button>削除</button>
              // </li>
            ))}
          </List>
        </>
      )}
    </>
  );
};
