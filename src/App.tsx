import React from "react";
import { useState } from 'react';

interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

// Square组件的两种写法 React组件和React函数组件 
class Square2 extends React.Component<SquareProps> {
    render() {
        return (
            <div>
                <button className="square" onClick={this.props.onSquareClick}>
                    {this.props.value}
                </button>
            </div>
        )
    }
}


// FC => FunctionComponent
const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}

// 类型定义
interface BoardProps {
    // 变量名 : 类型
    xIsNext: boolean;
    squares: string[];
    // 函数声明
    onPlay: (squares: string[]) => void;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                {/* <Square value={squares[2]} onSquareClick={() => handleClick(2)} /> */}
                <Square2 value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
};

class Board2 extends React.Component<BoardProps> {
    // 类中方法的定义 不需要function标识
    handleClick(i: number): void {
        // 类中使用构造函数的字段 this.props.xxx
        if (calculateWinner(this.props.squares) || this.props.squares[i]) {
            return;
        }
        const nextSquares = this.props.squares.slice();
        if (this.props.xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        this.props.onPlay(nextSquares);
    }

    componentDidMount(): void {
        console.log("componentDidMount")
    }

    render(): React.ReactNode {
        // 组件关键就是返回 render的部分
        console.log("render")
        const winner = calculateWinner(this.props.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
        }
        let squares = this.props.squares
        return (
            <>
                <div className="status">{status}</div>
                <div className="board-row">
                    <Square value={squares[0]} onSquareClick={() => this.handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => this.handleClick(1)} />
                    {/* <Square value={squares[2]} onSquareClick={() => handleClick(2)} /> */}
                    <Square2 value={squares[2]} onSquareClick={() => this.handleClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => this.handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => this.handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => this.handleClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => this.handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => this.handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => this.handleClick(8)} />
                </div>
            </>
        );
    }
}


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board2 xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
