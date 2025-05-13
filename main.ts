namespace graphing {


    // note that Caml casing yields lower case
    // block text with spaces


    function normaliseArray(xs: Array<number>, mini: number, maxi: number) {
        let xs_mini = xs.reduce((a, b) => Math.min(a, b), 9007199254740991); //For some reason Number.MAX_SAFE_INTEGER just breaks
        let xs_maxi = xs.reduce((a, b) => Math.max(a, b), -9007199254740991);
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
        let normal_y_list = normaliseArray(y_list, 114, 5);
        screen().fill(1);
        screen().drawLine(5, 5, 5, 114, 0);
        screen().drawLine(5, 114, 154, 114, 0);

        let index2 = 1;
        let point: number[] = [normal_x_list[0], normal_y_list[0]];
        let new_point: number[] = [normal_x_list[1], normal_y_list[1]];

        while (index2 < Math.min(x_list.length, y_list.length)) {
            new_point = [normal_x_list[index2], normal_y_list[index2]];
            screen().drawLine(point[0], point[1], new_point[0], new_point[1], 2);
            point = [normal_x_list[index2], normal_y_list[index2]];
            index2 = index2 + 1;
        }
        return;

    }

    function normaliseBuckets(buckets: Array<number>) : Array<number> {
        let sum = parseFloat((buckets.reduce((sum, current) => sum + current, 0)).toString());
        let new_arr: Array<number> = [];
        for (let bucket of buckets) {
            new_arr.push(bucket / sum);
        }
        return new_arr
    }

    //% block
    export function barChart(buckets: Array<number>)  {
        let normalised = normaliseBuckets(buckets);
        let width = buckets.length;
        let unit = 150.0 / (4 * width + 1);
        screen().fill(1);
        screen().drawLine(5, 5, 5, 114, 0);
        screen().drawLine(5, 114, 154, 114, 0);

        for (let i = 0; i < width; i++) {
            screen().fillRect(5+(4*i+1)*unit, 5+110*(1-normalised[i]), 3*unit, normalised[i]*110, i+2);
        }
    }

    //% block
    export function pieChart(buckets: Array<number>) {
        let normalised = normaliseBuckets(buckets);
    }
}

namespace Turtle {


    class Turtle {
        x: number;
        y: number = 60;
        dir: number = 0;
        pen: "up" | "down";
        colour: number;
        speed: number;

        constructor() {
            this.x = 80;
            this.y = 60;
            this.dir = 0;
            this.pen = "down";
            this.colour = 0;
            this.speed = 30;
        }

        move(dist: number): void {
            if (this.speed == 0) {
                let dx = dist * Math.cos(this.dir * Math.PI / 180);
                let dy = dist * Math.sin(this.dir * Math.PI / 180);
                if (this.pen == "down"){
                    screen().drawLine(this.x, this.y, this.x + dx, this.y + dy, this.colour);
                }                
                this.x += dx;
                this.y += dy;
            }
            else {
                let dx = this.speed * Math.cos(this.dir * Math.PI / 180) / 30;
                let dy = this.speed * Math.sin(this.dir * Math.PI / 180) / 30;
                for (let i = 1; i <= 30 * dist / this.speed;i += 1) {
                    if (this.pen == "down") {
                        screen().drawLine(this.x, this.y, this.x + dx, this.y + dy, this.colour);
                    }
                    this.x += dx;
                    this.y += dy;
                    pause(1/30);
                }
            }
        }

        set_pos(x: number, y: number): void {
            this.x = x;
            this.y = y;
        }

        rotate(angle: number): void {
            this.dir += angle;
        }

        set_angle(bearing: number): void {
            this.dir = bearing;
        }

        set_colour(colour: number): void {
            this.colour = colour;
        }

        set_speed(speed: number): void {
            if (speed >= 0) {
                this.speed = speed;
            }
        }

        pen_up(): void {
            this.pen = "up"
        }

        pen_down(): void {
            this.pen = "down"
        }
    }
    let Turt: Turtle;
    
    //% block
    export function makeTurtle() {
        screen().fill(1);
        Turt = new Turtle();
    }

    //% block
    export function move(dist: number) : void {
        Turt.move(dist);
    }

    //% block
    export function setPosition(x:number, y:number) : void {
        Turt.set_pos(x, y);
    }

    //% block
    export function turn(degrees: number) : void {
        Turt.rotate(degrees);
    }

    //% block
    export function setAngle(direction: number) : void {
        Turt.set_angle(direction)
    }

    //% block
    export function setColour(colour: number) : void {
        Turt.set_colour(colour);
    }

    //% block
    export function setSpeed(speed: number) : void {
        Turt.set_speed(speed);
    }

    //% block
    export function penUp() : void {
        Turt.pen_up();
    }

    //% block
    export function penDown(): void {
        Turt.pen_down();
    }

}
