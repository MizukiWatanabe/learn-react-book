// import { useState, useEffect } from 'react';
// モックサーバーと通信のためのaxios
// import axios from 'axios';

// const todoDataUrl = 'http://localhost:3100/todos';

// useRefを利用できるようにする(todo入力フォームで利用する)
import { useRef } from 'react';

import { useTodo } from '../hooks/useTodo';

// タイトルコンポーネント
// 親からtitleとasをpropsで受け取る
const TodoTitle = ({ title, as }) => {
  if (as === 'h1') return <h1>{title}</h1>;
  if (as === 'h2') return <h2>{title}</h2>;

  return <p>{title}</p>;
};

// TodoItemコンポーネント
// 親コンポーネントからtodoをpropsで受け取る
const TodoItem = ({ todo }) => {
  return (
    <li>
      {todo.content}({todo.done ? '完了' : '未完了'})
      <button>{todo.done ? '未完了リストへ' : '完了リストへ'}</button>
      <button>削除</button>
    </li>
  );
};

// TODOlistコンポーネント
// 親コンポーネントからtodolistをpropsで受け取る
const TodoList = ({ todoList }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
        // <li key={todo.id}>
        //   {todo.content}({todo.done ? '完了' : '未完了'})
        //   <button>{todo.done ? '未完了リストへ' : '完了リストへ'}</button>
        //   <button>削除</button>
        // </li>
      ))}
    </ul>
  );
};

function App() {
  // todolistの初期値にからの配列を設定
  // const [todoList, setTodoList] = useState([]);

  // useEffectを利用することでコンポーネントのマウント後に処理を実行する
  // async/awaitで非同期処理
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // getは外部から情報を取得するメソッド
  //     // getの引数にURLを入れるとURLに対してgetリクエストを送信
  //     // リクエスト後に戻ってくる値はすべてresponseに保存される
  //     const response = await axios.get(todoDataUrl);

  //     //戻された値についてuseStateを利用して
  //     // ここでuseStateのtodoListの現在の値としてセットする
  //     setTodoList(response.data);
  //   };
  //   fetchData();
  // }, []);

  // useTodo()カスタムフックで作成したtodoListを利用できるようにする
  // todoListは現在のtodoの状態
  const {
    todoList, //todoの現在の状態
    addTodoListItem, //新規todoを追加する関数
  } = useTodo();

  // useRefでrefオブジェクトを作成
  const inputEl = useRef(null);

  // 入力欄に入力された文字列を新しいtodoに登録する関数
  // addTodoListItem関数をボタンクリックで実行
  const handleAddTodoListItem = () => {
    // 入力欄に何も入力されていないときは何も返さない
    if (inputEl.current.value === '') return;

    // 入力されたテキストを新規todoとして追加
    // 追加したら入力欄を空の文字列にする
    //ボタンクリックされるとaddTodoListItem関数が実行される
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = '';
  };

  console.log('TODOリスト', todoList);

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });
  console.log('未完了TODOリスト:', inCompletedList);

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });
  console.log('完了TODOリスト:', completedList);

  return (
    <div className="App">
      {/* <h1>TODO進捗管理</h1> */}
      <TodoTitle title="TODO進捗管理" as="h1" />

      <textarea ref={inputEl} />

      <button onClick={handleAddTodoListItem}>+ TODOを追加</button>

      <TodoTitle title="TODOリスト" as="h2" />

      <TodoList todoList={inCompletedList} />
      {/* <ul>
        {inCompletedList.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
          // <li key={todo.id}>
          //   {todo.content}({todo.done ? '完了' : '未完了'})
          //   <button>{todo.done ? '未完了リストへ' : '完了リストへ'}</button>
          //   <button>削除</button>
          // </li>
        ))}
      </ul> */}

      <TodoTitle title="完了TODOリスト" as="h2" />
      <TodoList todoList={completedList} />
      {/* <ul>
        {completedList.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
          // <li key={todo.id}>
          //   {todo.content}({todo.done ? '完了' : '未完了'})
          //   <button>{todo.done ? '未完了リストへ' : '完了リストへ'}</button>
          //   <button>削除</button>
          // </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
