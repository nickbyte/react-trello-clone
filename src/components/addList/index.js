export default function AddList(props){
    let {listName, addList, setListName} = props;
    return (<div className="rounded bg-gray-200 flex-shrink-0 p-2 max-w-2xl lg:w-1/6 w-5/6 bg-opacity-25" style={{marginRight:100+'px'}}>
    <div className="flex-none py-1">
    <h3 className="text-sm font-bold">Add a List</h3> 
    </div>
    <div className="text-sm mt-2"></div>
    <form onSubmit={addList}>
        <input type="text" className="w-full border rounded p-2 mb-2" placeholder="Name of the list" onChange={(e) => setListName(e.target.value)} value={listName}/>
        <button type="submit" className="p-2 bg-green-500 rounded text-white">Add List</button>
    </form>
    </div>)
}