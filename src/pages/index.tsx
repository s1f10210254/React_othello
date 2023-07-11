import { useState } from 'react';
import { Cell } from '../compornents/Cell';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  //8方向の辞書
  const directions = [
    //上から時計回り
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  //隣の相手の色が何個続いているか探し最後に自分の色があったら座標を渡す
  //引数として石を置く場所のX座標、Y座標、探索する方向を受け取る
  const checkFlipCells = (x: number, y: number, direction: number[]) => {
    const [dx, dy] = direction;
    let tempX = x + dx;
    let tempY = y + dy;

    //裏返せる石の座標リストとなる配列を初期化
    const flipCells = [];

    while (board[tempY] !== undefined && board[tempY][tempX] !== undefined) {
      //8方向探索し、空セルが来た場合中止
      if (board[tempY][tempX] === 0) {
        break;
      }
      // 相手の色が続く場合flipCellsに一時的に配列を保存する
      else if (board[tempY][tempX] === turnColor) {
        return flipCells;
      }
      //自分の石にぶつかった場合、その時点までに保存したすべての相手の石の座標を返す
      else {
        flipCells.push([tempY, tempX]);
      }
      tempX += dx;
      tempY += dy;
    }

    //行き先が盤の外だった場合は空の配列を返す
    return [];
  };

  //裏返す処理
  //引数として（裏返すべき石の座標が格納された配列➡CELLS）、（現在のオセロ盤を表す２次元配列➡newBpard）
  const flipCells = (cells: number[][], newBoard: number[][]) => {
    //cells配列のY座標、X座標を格納した配列に対しforループ。
    for (const cell of cells) {
      //Y座標とX座標を取り出す
      const [y, x] = cell;

      //newBoard状の石の色を現在のターン色に更新
      newBoard[y][x] = turnColor;
    }
    setBoard(newBoard);
  };

  //セルに石を置き、必要ならその周辺の石を裏返す処理
  const onClick = (x: number, y: number) => {
    console.log(x, y);

    //すでに石が置かれていたらなにもしない
    if (board[y][x] !== 0) {
      return;
    }

    //裏返せる石の座標を格納するための２次元配列'flippableCells'を初期化
    let flippableCells: number[][] = [];

    //directionsで格納した各方向から裏返せる石をチェック
    for (const direction of directions) {
      //取得した方向の裏返せる石を取得しcellsに格納
      const cells = checkFlipCells(x, y, direction);
      //もし裏返せる石があればそれを返却する配列に追加
      flippableCells = [...flippableCells, ...cells];
    }

    // 裏返せる石が何もなければ何もなし
    if (flippableCells.length === 0) {
      return;
    }

    //2次元配列をコピーして新しいものをつくって変えてもOK！
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));

    //クリックした場所に石を置く、その色は現在の手番の色
    newBoard[y][x] = turnColor;
    //新たな盤面を現在の盤面に置き換え'board'を更新
    setBoard(newBoard);
    //裏返すべき色をflipCellで裏返す
    flipCells(flippableCells, newBoard);
    //最後に手番を切り替える
    setTurnColor(3 - turnColor);

    /*
    //隣が相手の色だったら置ける処理

    //下が相手の色だったら置ける(上)
    if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //左下が相手の色だったら置ける（右上）
    else if (board[y + 1][x - 1] !== undefined && board[y + 1][x - 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //左が相手の色だったら置ける（右）
    else if (board[x - 1] !== undefined && board[y][x - 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //左上が相手の色だったら置ける（右下）
    else if (board[x - 1][y - 1] !== undefined && board[y - 1][x - 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //上が相手の色だったら置ける（下）
    else if (board[y - 1] !== undefined && board[y - 1][x] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //右上が相手の色だったら置ける（左下）
    else if (board[y - 1][x + 1] !== undefined && board[y - 1][x + 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //右が相手の色だったら置ける（左）
    else if (board[x + 1] !== undefined && board[y][x + 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    //右下が相手の色だったら置ける（左上）
    else if (board[x + 1][y + 1] !== undefined && board[y + 1][x + 1] === 3 - turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(-turnColor + 3);
    }

    setBoard(newBoard);

    */
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell color={color} key={`${x}-${y}`} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
