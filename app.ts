// 計算式
let input = "-2+10*10*10*2/2-2";

// 式の先頭に0を足す
const addLeadingZero = (input: string) => "0" + input;

// かけ算とわり算あ含まれる式をたし算とひき算だけの式に変換する
const evaluateMathExpression = (input: string): string => {
  // 文字列に*/が含まれていれば
  while (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
    let currentOpeIndex: number;
    let kakewariflg = false;
    const kigouIndexList: number[] = [];

    input.split("").forEach((elem: string, index: number) => {
      if ((elem === "*" || elem === "/") && !kakewariflg) {
        currentOpeIndex = index;
        kigouIndexList.push(index);
        kakewariflg = true;
      } else if (/[^0-9.]/.test(elem)) {
        kigouIndexList.push(index);
      }
    });

    // 演算子があるインデックスを回す
    let result: number;
    kigouIndexList.forEach((elem: number, index: number) => {
      // カレント演算子のインデックスの両隣の数字を切り取って演算する
      if (elem === currentOpeIndex) {
        let left = Number(input.slice(kigouIndexList[index - 1], elem));
        let right = Number(input.slice(currentOpeIndex + 1, kigouIndexList[index + 1]));

        if (input[currentOpeIndex] === "*") {
          result = left * right;
        } else if (input[currentOpeIndex] === "/") {
          result = left / right;
        }

        // もともとの計算式を上書き
        input = input.slice(0, kigouIndexList[index - 1] + 1) + result + input.slice(kigouIndexList[index + 1]);
      }
    });
  }

  return input;
};

const addSubtract = (input: string): number => {
  let left = 0;
  let right = 0;
  let ope = "+";

  for (const elem of input.split("")) {
    if (elem === "+" || elem === "-") {
      if (ope === "+") {
        left += right;
      } else if (ope === "-") {
        left -= right;
      }
      right = 0;
      ope = elem;
    } else {
      right += Number(elem);
    }
  }

  if (ope === "+") {
    return left + Number(right);
  } else if (ope === "-") {
    return left - Number(right);
  }

  return left;
};

// -から始まる場合先頭に0を足す
if (input.slice(0, 1) === "-") {
  input = addLeadingZero(input);
}

//かけ算か割り算が含まれていた時は先に計算
if (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
  input = evaluateMathExpression(input);
  console.log(input);
}

const result: number = addSubtract(input);
console.log(result);
