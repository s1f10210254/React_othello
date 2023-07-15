import { useState } from 'react';
//8方向の辞書

export const useGame = () => {
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

  //候補地の座標返す
  const getInditateCells = (direction: number[]) => {
    const inditateCells = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (board[y][x] === 0) {
          const [mx, my] = direction;
          let tempX = x + mx;
          let tempY = y + my;

          while (board[tempY] !== undefined && board[tempY][tempX] !== undefined) {
            if (board[tempY][tempX] === 0) {
              break;
            } else if (board[tempY][tempX] === turnColor) {
              return inditateCells;
            } else {
              inditateCells.push([y, x]);
            }
            tempX += mx;
            tempY += my;
          }
        }
      }
    }
    return inditateCells;
  };

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
      if (board[tempY][tempX] === 0 || board[tempY][tempX] === 3) {
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

    const candidateCells = getInditateCells([0, 1]);

    if (candidateCells.length === 0) {
      return;
    }

    //裏返せる石の座標を格納する
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
  };

  console.table(board);

  return { board, onClick };
};
