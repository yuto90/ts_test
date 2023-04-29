// // ▼今後の課題
// // - 小数があると動かない
// // - ()がある時先に計算する処理

// // 計算式
// let input = "-22*-2/2-2";

// // 式の先頭に0を足す
// const addLeadingZero = (input: string) => "0" + input;

// // 0除算対策
// const isDivideZero = (input: string) => (input.indexOf("/0") != -1 ? true : false);

// // かけ算とわり算が含まれる式をたし算とひき算だけの式に変換する
// const evaluateMathExpression = (input: string): string => {
//   // 文字列に*か/が含まれている限り回す
//   while (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
//     // 計算式内で次に計算する演算子があるインデックス番号を格納
//     let currentOpeIndex: number;
//     // 次に計算する演算子が出てきたかフラグ
//     let existOpeFlg = false;
//     // 計算式内で演算子が出てくるインデックス番号を格納
//     const opeIndexList: number[] = [];

//     // 式を一文字づつの配列にして回す
//     input.split("").forEach((elem: string, index: number) => {
//       //elemが*または/の時かつ、まだ*または/が出てない時
//       if ((elem === "*" || elem === "/") && !existOpeFlg) {
//         currentOpeIndex = index;
//         opeIndexList.push(index);
//         existOpeFlg = true;
//       } else if (/[^0-9]/.test(elem)) {
//         opeIndexList.push(index);
//       }
//     });

//     // 計算の結果を格納
//     let result: number;

//     // 演算子があるインデックスを回す
//     opeIndexList.forEach((ope: number, index: number) => {
//       // カレント演算子のインデックスの両隣の数字を切り取って演算する
//       // 「1+10*10/2」だったら「10*10」を計算
//       if (ope === currentOpeIndex) {
//         let left = Number(input.slice(opeIndexList[index - 1], ope));
//         let right = Number(input.slice(currentOpeIndex + 1, opeIndexList[index + 1]));

//         if (input[ope] === "*") {
//           result = left * right;
//         } else if (input[ope] === "/") {
//           result = left / right;
//         }

//         // もともとの計算式を上書き
//         input = input.slice(0, opeIndexList[index - 1] + 1) + result + input.slice(opeIndexList[index + 1]);
//       }
//     });
//   }

//   return input;
// };

// // 足し算と引き算をする
// const addSubtract = (input: string): number => {
//   // 左辺
//   let left = 0;
//   // 右辺
//   let right = "0";
//   // 次に計算する演算子
//   let ope = "+";

//   for (const elem of input.split("")) {
//     if (elem === "+" || elem === "-") {
//       if (ope === "+") {
//         left += Number(right);
//       } else if (ope === "-") {
//         left -= Number(right);
//       }

//       right = "";
//       ope = elem;
//     } else {
//       right += Number(elem);
//     }
//   }

//   // 最後に残った式を計算
//   if (ope === "+") {
//     left += Number(right);
//   } else if (ope === "-") {
//     left -= Number(right);
//   }

//   return left;
// };

// // 0除算が式に含まれていないか判定
// if (isDivideZero(input)) {
//   throw "0除算が式に含まれています";
// }

// // todo 数字 or 演算子 or カッコ以外の文字が入っていたときのエラー処理
// //if (/[0-9|+-*/|()]/.test(input)) {
// //throw "不正な値が式に含まれています。";
// //}

// // 演算子が式の中で連続していた時
// if (/r"[+\-*/]{2,}"/.test(input)) {
//   throw "連続した演算子が含まれています";
// }

// // 文字列が-から始まる場合先頭に0を足す
// if (input.slice(0, 1) === "-") {
//   input = addLeadingZero(input);
// }

// // かけ算か割り算が含まれていた時は先に計算
// if (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
//   input = evaluateMathExpression(input);
// }

// const result = addSubtract(input);
// console.log(result);

// 仕様
// Todo クラスを作成してください。このクラスは、タイトル(title)と完了フラグ(completed)の2つのプロパティを持ちます。
// TodoList クラスを作成してください。このクラスは、Todo オブジェクトを格納する配列を持ちます。
// TodoList クラスには、以下のメソッドを実装してください。
// addTodo：Todo オブジェクトを受け取り、配列に追加します。
// deleteTodo：Todo オブジェクトを受け取り、配列から削除します。
// getTodos：配列に格納された全ての Todo オブジェクトを返します。
// getCompletedTodos：完了フラグが true の Todo オブジェクトのみを含む配列を返します。

// todoアプリのモデル化
class Todo {
  constructor(private _title: string, private _completed: boolean) {
    this._title = _title;
    this._completed = _completed;
  }

  get title() {
    return this._title;
  }

  get completed() {
    return this._completed;
  }
}

class TodoList {
  todos: Todo[] = [];

  // todoの追加
  addTodo(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  // todoの削除
  deleteTodo(deleteTargetTodo: Todo) {
    this.todos.map((todo: Todo, index: number) => {
      if (todo === deleteTargetTodo) {
        this.todos.splice(index, 1);
      }
    });
  }

  // すべてのTodoを返す
  getTodos(): Todo[] {
    return this.todos;
  }

  // 完了フラグがtrueのTodoオブジェクトを返却
  getCompletedTodos(): Todo[] {
    return this.todos.filter((todo: Todo) => {
      return todo.completed === true;
    });
  }
}

const todoList = new TodoList();
const todo1 = new Todo("Buy milk", false);
const todo2 = new Todo("Do laundry", false);
const todo3 = new Todo("Clean kitchen", true);
todoList.addTodo(todo1);
todoList.addTodo(todo2);
todoList.addTodo(todo3);
console.log(todoList.getTodos()); // [todo1, todo2, todo3]
console.log(todoList.getCompletedTodos()); // [todo3]
todoList.deleteTodo(todo2);
console.log(todoList.getTodos()); // [todo1, todo3]
