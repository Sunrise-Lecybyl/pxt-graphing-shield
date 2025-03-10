/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#AA278D" weight=100
namespace graphing {


    // note that Caml casing yields lower case
    // block text with spaces

    //% block
    export function lineGraph(x_list: Array<Number>, y_list: Array<Number>) {
        screen().fill(1);
        console.log(x_list);
        console.log(y_list);
        return;

    }
}
