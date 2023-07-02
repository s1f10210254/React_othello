import { useState } from 'react';
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

  //自分の色があるかどうか探す関数
  const checkFlipCells = (x: number, y: number, direction: number[]) => {
    const [dx, dy] = direction;
    let tempX = x + dx;
    let tempY = y + dy;
    const flipCells = [];

    while (board[tempY][tempX] !== undefined) {
      if (board[tempY][tempX] === 0) {
        break;
      } else if (board[tempY][tempX] === turnColor) {
        return flipCells;
      } else {
        flipCells.push([tempY], tempX);
      }
      tempX += dx;
      tempY += dy;
    }
    return [];
  };

  //色を裏返す関数
  const flipCells = (cells: number[][]) => {
    for (const cell of cells) {
      const [y, x] = cell;
      newBoard[y][x] = turnColor;
    }
  };

  const onClick = (x: number, y: number) => {
    console.log(x, y);

    //2次元配列をコピーして新しいものをつくって変えてもOK！
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));

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
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            //記号番号
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
