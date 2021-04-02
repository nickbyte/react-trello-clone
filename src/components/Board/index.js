import { removeIcon } from "../../img/icons"

export default function BoardItem(props) {
    let id = props.board.id;
    return (
        <div className="relative shadow-md bg-white hover:bg-gray-300 rounded mt-2 border-b border-grey cursor-pointer hover:bg-grey-lighter w-60 text-center mr-2 ">
        <a href={'/b/'+props.board.id} className="h-full w-full block p-6">
        <p className="text-md">{props.board.name}</p>
        </a>
        <button onClick={() => props.removeBoard(id)} className="p-2 font-sm absolute -bottom-0.5 -right-0.5">{removeIcon}</button>
        </div>
)
}