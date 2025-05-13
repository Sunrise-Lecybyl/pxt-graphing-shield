namespace graphing {


    // note that Caml casing yields lower case
    // block text with spaces


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
        let normal_y_list = normaliseArray(y_list, 114, 5);
        console.log(normal_x_list);
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
}

namespace Turtle {

    type Colour = "black" | "white" | "red" | "pink" | "orange" | "yellow" | "teal" | "green" | "blue" | "light blue" | "purple" | "light purple" | "dark purple" | "peach" | "brown";

    function convertColour(colour: Colour): number {
        if (colour == "black") {
            return 0;
        }
        if (colour == "white") {
            return 1;
        }
        if (colour == "red") {
            return 2;
        }
        if (colour == "pink") {
            return 3;
        }
        if (colour == "orange") {
            return 4;
        }
        if (colour == "yellow") {
            return 5;
        }
        if (colour == "teal") {
            return 6;
        }
        if (colour == "green") {
            return 7;
        }
        if (colour == "blue") {
            return 8;
        }
        if (colour == "light blue") {
            return 9;
        }
        if (colour == "purple") {
            return 10;
        }
        if (colour == "light purple") {
            return 11;
        }
        if (colour == "dark purple") {
            return 12;
        }
        if (colour == "peach") {
            return 13;
        }
        if (colour == "brown") {
            return 14;
        }
        else {
            return -1;
        }
    }



    class Turtle {
        x: number;
        y: number = 60;
        dir: number = 0;
        pen: "up" | "down";
        colour: Colour;
        speed: number;

        constructor() {
            this.x = 80;
            this.y = 60;
            this.dir = 0;
            this.pen = "up";
            this.colour = "black";
            this.speed = 30;
        }

        move(dist: number): void {
            if (this.speed == 0) {
                let dx = dist * Math.cos(this.dir * Math.PI / 180);
                let dy = dist * Math.sin(this.dir * Math.PI / 180);
                if (this.pen == "down"){
                    screen().drawLine(this.x, this.y, this.x + dx, this.y + dy, convertColour(this.colour));
                }                
                this.x += dx;
                this.y += dy;
            }
            else {
                let dx = this.speed * Math.cos(this.dir * Math.PI / 180) / 30;
                let dy = this.speed * Math.sin(this.dir * Math.PI / 180) / 30;
                for (let i = 1; i <= dist / this.speed;i++) {
                    if (this.pen == "down") {
                        screen().drawLine(this.x, this.y, this.x + dx, this.y + dy, convertColour(this.colour));
                    }
                    this.x += dx;
                    this.y += dy;
                    pause(1/30)
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

        set_colour(colour: Colour): void {
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
    export function setColour(colour: Colour) : void {
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
