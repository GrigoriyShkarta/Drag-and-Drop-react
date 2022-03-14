import './gameListItem.css'

const GameListItem = ({boards}) => {

    const elements = boards.map(board => {
        return (
            <div className="board">
                <div className="board__title">{board.title}</div>
            </div>
        )
    })

    return (
        <li>
            {elements}
        </li>
    )

}

export default GameListItem
