

namespace graphing {


    // note that Caml casing yields lower case
    // block text with spaces
    // test

    function normaliseArray(xs: Array<number>, mini: number, maxi: number) {
        let xs_mini = xs.reduce((a, b) => Math.min(a, b), 9007199254740991); //For some reason Number.MAX_SAFE_INTEGER just breaks
        let xs_maxi = xs.reduce((a, b) => Math.max(a, b), -9007199254740991);
        console.log(xs_mini);
        let index = 0;
        let new_xs: Array<number> = [];
        while (index < xs.length) {
            new_xs[index] = mini + (xs[index] - xs_mini) * (maxi - mini) / (xs_maxi - xs_mini);
            index = index + 1;
        }
        return new_xs
    }

    //% block
    export function lineGraph(x_list: Array<number>, y_list: Array<number>) {
        
        let normal_x_list = normaliseArray(x_list, 5, 154);
        let normal_y_list = normaliseArray(x_list, 114, 5);
        console.log(normal_x_list);
        screen().fill(1);
        screen().drawLine(5, 5, 5, 114, 0);
        screen().drawLine(5, 114, 154, 114, 0);

        let index = 1;
        let point: number[] = [normal_x_list[0], normal_y_list[0]];
        let new_point: number[] = [normal_x_list[1], normal_y_list[1]];

        while (index < Math.min(x_list.length, y_list.length)) {
            new_point = [normal_x_list[index], normal_y_list[index]];
            screen().drawLine(point[0], point[1], new_point[0], new_point[1], 2);
            point = [normal_x_list[index], normal_y_list[index]];
            index = index + 1;
        }

        return;

    }
}
