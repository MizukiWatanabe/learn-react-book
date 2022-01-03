import axios from 'axios';

const todoDataUrl = 'http://localhost:3100/todos';

export const getAllTodosData = async () => {
  // getは外部から情報を取得するメソッド
  // getの引数にURLを入れるとURLに対してgetリクエストを送信
  // リクエスト後に戻ってくる値はすべてresponseに保存される
  const response = await axios.get(todoDataUrl);
  return response.data;
};

export const addTodoData = async (todo) => {
  // 第二引数に送信したいデータを指定してPOST通信 post(URL,newData)
  const response = await axios.post(todoDataUrl, todo);

  // 通信後、↓でレスポンスデータを返す
  return response.data;
};

// 一致したidのtodoを削除する
export const deleteTodoData = async (id) => {
  // delete(URL,id)で削除
  await axios.delete(`${todoDataUrl}/${id}`);
  // 通信後、削除したtodoのidを返す
  return id;
};

// 一致したidのtodoを更新する
export const updateTodoData = async (id, todo) => {
  // delete(URL,id)で削除
  const response = await axios.put(`${todoDataUrl}/${id}`, todo);
  // 通信後、response.dataでレスポンスデータを返す
  return response.data;
};
