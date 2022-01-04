import { useState, useEffect } from 'react';

// TODOを取得・追加・更新・削除するカスタムフックを作成するp310

// useE:ffectを利用し、コンポーネントのマウント後またはアンマウント後にモックサーバーと通信処理を行って
// 安全にモックサーバーからtodoデータを取得する

// 各todoのidについてはulidを使って付与する
import { ulid } from 'ulid';

// api/todoで宣言した各関数をimport
//     todoData.XXXのオブジェクト形式でまとめてインポート
import * as todoData from '../api/todo';

export const useTodo = () => {
  // todolistは現在のtodoの状態
  // setTodoListで状態を更新、初期値は空の配列
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      // モックサーバーからtodoとしてデータを取得して、順番を反転させると
      // 追加した順にうえから表示させる事ができる
      // →Array.reverseと...を組み合わせてもとの配列をコピーしつつ新しい配列を作る
      console.log(todo);
      setTodoList([...todo.reverse()]);
    });
  }, []);

  // todoListItemのdone(完了・未完了)の真偽値を反転させて更新する
  // idとdoneを引数として受け取る
  const toggleTodoListItemStatus = (id, done) => {
    // find()は配列から条件に合う値を見つけて最初にtrueになった要素の値を返し、要素を見つけた時点で処理を停止する
    // →完了・未完了のdoneの状態を反転させたいtodoListItemのidをみつけ、条件にあったtodoItemを返す
    // todoListは現在のtodoの状態;
    const todoItem = todoList.find((item) => item.id === id);

    //現在のtodoListの中から条件に一致した要素であるtodoItemの完了未完了のdoneを反転させる
    // ここの構文わからない
    const newTodoItem = { ...todoItem, done: !done };

    // todoData.updateTodoData()を利用して指定されたidのtodoを更新したら、続いてtodoListの状態も更新する
    //.thenわからない
    //Promise.then(第一引数,第二)の第一引数は成功したときの処理(成功時に呼び出されるコールバック関数を指定する。)
    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>
        // idが異なる場合、todoListから取り出したitemをそのまま返し、同じ場合はdoneの状態を反転させたupdatedTodoを返して新しい配列newTodoListを
        item.id !== updatedTodo.id ? item : updatedTodo
      );
      // todolistは現在のtodoの状態
      // setTodoListで状態を更新、初期値は空の配列
      setTodoList(newTodoList);
    });
  };

  // 新規todoを追加する関数を宣言
  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      // 内容、一意のid、デフォルトの状態は未完了
      content: todoContent,
      id: ulid(),
      done: false,
    };

    // todoData.addTodoDateを利用してtodoを更新したら、続いてtodolistの状態も更新
    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      // todolistの状態stateをnewTodoItemsが追加された状態に降雨心
      setTodoList([addTodo, ...todoList]);
    });
  };
  //  todoを削除する関数を宣言
  const deleteTodoListItem = (id) => {
    // todoData??を更新したらtodoListの状態も更新
    //  todoData.deleteTodoDateを利用して指定されたidのtodoを削除したら、
    // 続いてtodolistの状態も更新する
    // deleteTodoData()は一致したidのtodoを削除する関数
    todoData.deleteTodoData(id).then((deleteTodoListItemId) => {
      const newTodoList = todoList.filter(
        // 削除したtodoとidが一致しないtodoをフィルタリングして新しい配列を返す
        //idが一致したtodoは削除される
        (item) => item.id !== deleteTodoListItemId
      );
      setTodoList(newTodoList);
    });
  };

  // 作成した関数を返す、ここのオブジェクトもようわからん
  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
