import { ListItem, Text, Flex, Button, IconButton } from '@chakra-ui/react';

import { DeleteIcon } from '@chakra-ui/icons';

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

  const setColorScheme = todo.done ? 'pink' : 'blue';

  return (
    <ListItem
      borderWidth="1px"
      p="4"
      mt="4"
      bg="white"
      borderRadius="md"
      borderColor="gray.300"
    >
      <Text mb="6">{todo.content}</Text>
      <Flex align="center" justify="flex-end">
        <Button
          colorScheme={setColorScheme}
          variant="outline"
          size="sm"
          onClick={handleToggleTodoListItemStatus}
        >
          {todo.done ? '未完了リストへ' : '完了リストへ'}
        </Button>
        <IconButton
          icon={<DeleteIcon />}
          variant="unstyled"
          aria-label="delete"
          onClick={handleDeleteTodoListItem}
        >
          削除
        </IconButton>
      </Flex>
    </ListItem>
  );
};
