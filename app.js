// 計算式
var input = "-2+2*2/2-2";
// 式の先頭に0を足す
var addLeadingZero = function (input) { return "0" + input; };
// かけ算とわり算あ含まれる式をたし算とひき算だけの式に変換する
var evaluateMathExpression = function (input) {
    var _loop_1 = function () {
        var currentOpeIndex;
        var kakewariflg = false;
        var kigouIndexList = [];
        input.split("").forEach(function (elem, index) {
            if ((elem === "*" || elem === "/") && !kakewariflg) {
                currentOpeIndex = index;
                kigouIndexList.push(index);
                kakewariflg = true;
            }
            else if (/[^0-9.]/.test(elem)) {
                kigouIndexList.push(index);
            }
        });
        // 演算子があるインデックスを回す
        var result_1;
        kigouIndexList.forEach(function (elem, index) {
            // カレント演算子のインデックスの両隣の数字を切り取って演算する
            if (elem === currentOpeIndex) {
                var left = Number(input.slice(kigouIndexList[index - 1], elem));
                var right = Number(input.slice(currentOpeIndex + 1, kigouIndexList[index + 1]));
                if (input[currentOpeIndex] === "*") {
                    result_1 = left * right;
                }
                else if (input[currentOpeIndex] === "/") {
                    result_1 = left / right;
                }
                // もともとの計算式を上書き
                input = input.slice(0, kigouIndexList[index - 1] + 1) + result_1 + input.slice(kigouIndexList[index + 1]);
            }
        });
    };
    // 文字列に*/が含まれていれば
    while (input.indexOf("*") != -1 || input.indexOf("/") != -1) {
        _loop_1();
    }
    return input;
};
var addSubtract = function (input) {
    var left = 0;
    var right = "0";
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
    if (ope === "+") {
        return left + Number(right);
    }
    else if (ope === "-") {
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
var result = addSubtract(input);
console.log(result);
