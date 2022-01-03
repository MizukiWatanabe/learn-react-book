import { useState, useEffect } from 'react';
// モックサーバーと通信のためのaxios
import axios from 'axios';

const todoDataUrl = 'http://localhost:3100/todos';

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
  const [todoList, setTodoList] = useState([]);

  // useEffectを利用することでコンポーネントのマウント後に処理を実行する
  // async/awaitで非同期処理
  useEffect(() => {
    const fetchData = async () => {
      // getは外部から情報を取得するメソッド
      // getの引数にURLを入れるとURLに対してgetリクエストを送信
      // リクエスト後に戻ってくる値はすべてresponseに保存される
      const response = await axios.get(todoDataUrl);

      //戻された値についてuseStateを利用して
      // ここでuseStateのtodoListの現在の値としてセットする
      setTodoList(response.data);
    };
    fetchData();
  }, []);

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
      <textarea />
      <button>+ TODOを追加</button>

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
