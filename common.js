class Game {
    divTable    = document.querySelectorAll(".app_container_game_cell");
    divScore    = document.querySelector(".app_container_menu_score");

    constructor() {
        this.board    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.boardPre = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.score = 0;

        document.addEventListener("keydown", event => {
            if (event.code === "KeyW") {
                this.boardPre = this.board.slice();
                this.listenerUp();
            }
            if (event.code === "KeyS") {
                this.listenerDown();
            }
            if (event.code === "KeyA") {
                this.listenerLeft();
            }
            if (event.code === "KeyD") {
                this.listenerRight();
            }
            if (event.code === "KeyR") {
                this.undo();
            }
        });

        this.addNumber();
    }

    listenerUp() {
        let a = [];
        for (let i = 0; i < Math.sqrt(this.board.length); i++) {
            a = [];
            for (let j = Math.sqrt(this.board.length) - 1; j >= 0; j--) {
                a.push(this.board[i + j * Math.sqrt(this.board.length)]);
            }
            a = this.move(a);
            let i2 = 0;
            for (let j = Math.sqrt(this.board.length) - 1; j >= 0; j--) {
                this.board[i + j * Math.sqrt(this.board.length)] = a[i2];
                i2++;
            }
        }


        if (this.compare(this.board, this.boardPre)) {
            this.addNumber();
        }
    }

    listenerDown() {
        let a = [];
        for (let i = 0; i < Math.sqrt(this.board.length); i++) {
            a = [];
            for (let j = 0; j < Math.sqrt(this.board.length); j++) {
                a.push(this.board[i + j * Math.sqrt(this.board.length)]);
            }
            a = this.move(a);
            let i2 = 0;
            for (let j = 0; j < Math.sqrt(this.board.length); j++) {
                this.board[i + j * Math.sqrt(this.board.length)] = a[i2];
                i2++;
            }
        }
        if (this.compare(this.board, this.boardPre)) {
            this.addNumber();
        }
    }

    listenerLeft() {
        let a = [];
        for (let i = Math.sqrt(this.board.length) - 1; i >= 0; i--) {
            a = [];
            for (let j = Math.sqrt(this.board.length) - 1; j >= 0; j--) {
                a.push(this.board[i * Math.sqrt(this.board.length) + j]);
            }
            a = this.move(a);
            let i2 = 0;
            for (let j = Math.sqrt(this.board.length) - 1; j >= 0; j--) {
                this.board[i * Math.sqrt(this.board.length) + j] = a[i2];
                i2++;
            }
        }
        if (this.compare(this.board, this.boardPre)) {
            this.addNumber();
        }
    }

    listenerRight() {
        let a = [];
        for (let i = 0; i < Math.sqrt(this.board.length); i++) {
            a = [];
            for (let j = 0; j < Math.sqrt(this.board.length); j++) {
                a.push(this.board[i * Math.sqrt(this.board.length) + j]);
            }
            a = this.move(a);
            let i2 = 0;
            for (let j = 0; j < Math.sqrt(this.board.length); j++) {
                this.board[i * Math.sqrt(this.board.length) + j] = a[i2];
                i2++;
            }
        }
        if (this.compare(this.board, this.boardPre)) {
            this.addNumber();
        }
    }

    undo() {
        if (this.compare(this.board, this.boardPre)) {
            this.board = this.boardPre.slice();
            this.render();
        }
    }

    addNumber() {
        let zeros = [];
        this.board.forEach(function (item, index) {
            if (item === 0) {
                zeros.push(index);
            }
        });

        if (zeros.length === 0) {
            // game over
        } else {
            let random = Math.floor(Math.random() * 9);
            let number = random > 0 ? 2 : 4;

            random = Math.floor(Math.random() * zeros.length);

            this.board[zeros[random]] = number;

            this.render();
        }
    }

    render() {
        for (let i = 0; i < this.board.length; i++) {
            this.divTable[i].innerHTML = this.board[i] === 0 ? " " : this.board[i];

            if (this.board[i] < 100)
                this.divTable[i].className = "app_container_game_cell app_container_game_cell-large";
            if (this.board[i] > 100 && this.board[i] < 1000)
                this.divTable[i].className = "app_container_game_cell app_container_game_cell-medium";
            if (this.board[i] > 1000)
                this.divTable[i].className = "app_container_game_cell app_container_game_cell-small";
        }
        this.divScore.innerHTML = "Score: " + this.score;
    }

    compare(a1, a2) {
        let compare = true;

        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                compare = false;
            }
        }

        return !compare;
    }

    move(a) {
        let f = function () {
            for (let i = a.length - 2; i >= 0; i--) {
                for (let j = i; j < a.length - 1; j++) {
                    if (a[j] > 0 && a[j + 1] === 0) {
                        let c = a[j];
                        a[j] = a[j + 1];
                        a[j + 1] = c;
                    }
                }
            }
        }
        f();
        for (let i = a.length - 2; i >= 0; i--) {
            if (a[i] === a[i + 1]) {
                a[i] = 0;
                a[i + 1] *= 2;
                this.score += a[i + 1];
            }
        }
        f();
        return a;
    }
}

let game = new Game();

document.querySelector(".app_container_menu_refresh").addEventListener("click", function () {
    game = new Game();
})