import { Textarea, Button } from '@chakra-ui/react';

export const TodoAdd = ({
  placeholder,
  leftIcon,
  buttonText,
  inputEl,
  handleAddTodoListItem,
}) => {
  return (
    <>
      <Textarea
        ref={inputEl}
        bgColor="white"
        mt="8"
        borderColor="gray.400"
        placeholder={placeholder}
      />
      <Button
        onClick={handleAddTodoListItem}
        colorScheme="blue"
        leftIcon={leftIcon}
        mt="8"
      >
        {buttonText}
      </Button>
    </>
  );
};
