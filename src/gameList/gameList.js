import './gameList.css';
import {useState} from "react";

const GameList = () => {

    const [boards, setBoards] = useState([
        {id: 1, title: 'Состав команды', items: [
                {id: 1, name: 'Grigoriy S'},
                {id: 2, name: 'Vitaliy D'},
                {id: 3, name: 'Yana S'}
            ]},
        {id: 2, title: 'Игроки', items: [
                {id: 1, name: 'John I'},
                {id: 2, name: 'Alex G'}
            ]}
    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler (e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler (e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler (e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b;
        }));
    }

    function dropCardHandler (e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b;
        }));
    }

    return (
        <>
            {boards.map(board =>
                <div
                    className='board'
                    onDragOver = {(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >
                    <div className="board__title">{board.title}</div>
                    {board.items.map(item => {
                        return (
                            <div
                                className="item"
                                draggable={true}
                                onDragOver = {(e) => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd = {(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                            >
                                {item.name}</div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default GameList
