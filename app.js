// ▼今後の課題
// - 小数があると動かない
// - ()がある時先に計算する処理
// - 演算子が連続してたときのエラー処理
// - 数字 or 演算子 or カッコ以外の文字が入っていたときのエラー処理
// 計算式
var input = "-22*2/2-2";
// 式の先頭に0を足す
var addLeadingZero = function (input) { return "0" + input; };
// 0除算対策
var isDivideZero = function (input) { return (input.indexOf("/0") != -1 ? true : false); };
// かけ算とわり算が含まれる式をたし算とひき算だけの式に変換する
var evaluateMathExpression = function (input) {
    var _loop_1 = function () {
        // 計算式内で次に計算する演算子があるインデックス番号を格納
        var currentOpeIndex;
        // 次に計算する演算子が出てきたかフラグ
        var existOpeFlg = false;
        // 計算式内で演算子が出てくるインデックス番号を格納
        var opeIndexList = [];
        // 式を一文字づつの配列にして回す
        input.split("").forEach(function (elem, index) {
            //elemが*または/の時かつ、まだ*または/が出てない時
            if ((elem === "*" || elem === "/") && !existOpeFlg) {
                currentOpeIndex = index;
                opeIndexList.push(index);
                existOpeFlg = true;
            }
            else if (/[^0-9]/.test(elem)) {
                opeIndexList.push(index);
            }
        });
        // 計算の結果を格納
        var result_1;
        // 演算子があるインデックスを回す
        opeIndexList.forEach(function (ope, index) {
            // カレント演算子のインデックスの両隣の数字を切り取って演算する
            // 「1+10*10/2」だったら「10*10」を計算
            if (ope === currentOpeIndex) {
                var left = Number(input.slice(opeIndexList[index - 1], ope));
                var right = Number(input.slice(currentOpeIndex + 1, opeIndexList[index + 1]));
                if (input[ope] === "*") {
                    result_1 = left * right;
                }
                else if (input[ope] === "/") {
                    result_1 = left / right;
                }
                // もともとの計算式を上書き
                input = input.slice(0, opeIndexList[index - 1] + 1) + result_1 + input.slice(opeIndexList[index + 1]);
            }
        });
    };
    // 文字列に*か/が含まれている限り回す
    while (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
        _loop_1();
    }
    return input;
};
// 足し算と引き算をする
var addSubtract = function (input) {
    // 左辺
    var left = 0;
    // 右辺
    var right = "0";
    // 次に計算する演算子
    var ope = "+";
    for (var _i = 0, _a = input.split(""); _i < _a.length; _i++) {
        var elem = _a[_i];
        if (elem === "+" || elem === "-") {
            if (ope === "+") {
                left += Number(right);
            }
            else if (ope === "-") {
                left -= Number(right);
            }
            right = "";
            ope = elem;
        }
        else {
            right += Number(elem);
        }
    }
    // 最後に残った式を計算
    if (ope === "+") {
        left += Number(right);
    }
    else if (ope === "-") {
        left -= Number(right);
    }
    return left;
};
// 0除算が式に含まれていないか判定
if (isDivideZero(input)) {
    throw "0除算が式に含まれています";
}
// 文字列が-から始まる場合先頭に0を足す
if (input.slice(0, 1) === "-") {
    input = addLeadingZero(input);
}
// かけ算か割り算が含まれていた時は先に計算
if (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
    input = evaluateMathExpression(input);
}
var result = addSubtract(input);
console.log(result);
