
function expressionCalculator(expr) {


    if (expr.replace(/\s/g, '').includes('/0')) {
        throw new Error('TypeError: Division by zero.');
    }

    if (brackets(expr.replace(/\s/g, ''))) {
        throw new Error('ExpressionError: Brackets must be paired')
    }

    function brackets(expr) {
        let count = 0;

        let arr = expr.match(/[()]/g);

        if (arr) {
            arr.forEach(el => {
                if (el == '(') {
                    count++;
                } else {
                    count--;
                }
            });
        }
        return count;

    }


    // write your solution here

    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mult = (a, b) => a * b;
    const div = (a, b) => a / b;

    let red = {
        "+": add,
        "-": sub,
        "*": mult,
        "/": div,
        "(": null,
        ")": null
    }

    let arr = expr.replace(/\s/g, '').match(/\(|\)|\+|\/|\*|\-|\d+/g)
    let num = [];
    let oper = [];
    let obj = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    }
    for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i])) {
            num.push(+arr[i])
        }
        else if (i != arr.length - 1) {
            let j = 0;
            let res = 0;
            let a = oper[oper.length - 1]; // * / + -
            let b = arr[i];
            if (oper.length === 0) {
                oper.push(b)
            }

            else if (obj[a] - obj[b] == -1 || oper[oper.length - 1] == "(") {
                oper.push(b)

                if (oper.length == 0) {
                    oper.push(b)
                }
            }
            else if (obj[oper[oper.length - 1]] - obj[b] == 1) {

                res = red[a](num[num.length - 2], num[num.length - 1])
                num.pop();
                num.pop();
                num.push(res);
                oper.pop();
                res = 0;

                while (obj[oper[oper.length - 1]] == obj[b]) {
                    res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])
                    num.pop();
                    num.pop();
                    num.push(res);
                    oper.pop();
                }


                if (oper.length == 0) {
                    oper.push(b)
                }

                if (oper[oper.length - 1] === "(") {
                    oper.push(arr[i])
                }
            }

            else if (obj[oper[oper.length - 1]] == obj[b] && obj[b] != undefined) {
                res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])

                num.pop();
                num.pop();
                num.push(res);
                oper.pop();


                if (obj[oper[oper.length - 1]] - obj[b] == -1 || oper[oper.length - 1] == "(") {
                    oper.push(b)
                    //debugger
                }
                if (oper.length == 0) {
                    oper.push(b)
                }
            }

            else if (arr[i] == "(") {
                oper.push("(")
            }

            else if (arr[i] == ")") {
                //debugger

                if (obj[oper[oper.length - 1]] == 2) {
                    res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])
                    num.pop();
                    num.pop();
                    num.push(res);
                    oper.pop();
                    res = 0;

                    while (oper[oper.length - 1] != "(") {
                        res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])
                        num.pop();
                        num.pop();
                        num.push(res);
                        oper.pop();
                    }
                    oper.pop();
                    // debugger
                }

                else if (obj[oper[oper.length - 1]] == 1) {
                    res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1]);
                    num.pop();
                    num.pop();
                    num.push(res);
                    oper.pop();
                    oper.pop();
                }
            }
        }

        else if (arr[arr.length - 1] == ")") {
            //debugger

            if (obj[oper[oper.length - 1]] == 2) {
                res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])
                num.pop();
                num.pop();
                num.push(res);
                oper.pop();
                res = 0;

                while (oper[oper.length - 1] != "(") {
                    res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])
                    num.pop();
                    num.pop();
                    num.push(res);
                    oper.pop();
                }
                oper.pop();
                // debugger

                res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])

                return res
            }

            else if (obj[oper[oper.length - 1]] == 1) {
                res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1]);
                num.pop();
                num.pop();
                num.push(res);
                oper.pop();
                oper.pop();

                res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])

                return res
            }
        }

        if (i == arr.length - 1 && arr[i] != ")") {
            let k = 0;
            let res = 0;
            while (oper.length != 0) {
                //debugger
                res = red[oper[oper.length - 1]](num[num.length - 2], num[num.length - 1])
                num.pop();
                num.pop();
                num.push(res)
                oper.pop()
            }
            return res
        }

    }

}

module.exports = {
    expressionCalculator
}