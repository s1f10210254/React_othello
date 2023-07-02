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

  const onClick = (x: number, y: number) => {
    console.log(x, y);

    //2次元配列をコピーして新しいものをつくって変えてもOK！
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));

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
