import BoardItem from '../../components/Board';
import {useEffect, useState} from 'react';
function BoardContainer(){
    // initialise data from localstorage;
    let initialData = localStorage.hasOwnProperty('zuddl_data') ? JSON.parse(localStorage.getItem('zuddl_data')) : [{"id":1,"name":"Board 1","list":[{"id":1,"name":"To Do","items":[{"id":"65918ba4-470e-466f-9faa-3c8047275807","name":"Send package to Mom"},{"id":"1116c8c3-959a-4823-94c4-7cd96bb32b41","name":"Buy Groceries"},{"id":"5cb1f2bd-4298-4141-9b15-621adbc1c815","name":"Email Elon Musk"}]},{"id":2,"name":"Done","items":[{"id":"a92d418f-cee9-439e-bd2a-377e298489a3","name":"Clean the house"}]}]}];
    const [data,setData] = useState(initialData);
    const [name,setName] = useState('');
    const [toggle, setToggle] = useState(0);
    // add board
    const addBoard = (e) => {
        e.preventDefault();
        if(name.length < 2){
            alert('Please enter board name');
            return;
        }
        let obj = {
            id:data.length+1,
            name,
            list:[]
        }
        let dataItem = Array.from(data);
        dataItem.push(obj);
        setData(dataItem);
        setName('');
        setToggle(0);
    }
    // remove board
    const removeBoard = (id) => {
        let dataItem = Array.from(data);
        let filtered = dataItem.filter(d => d.id !== id);
        setData(filtered);
    }
    // toggle form
    const hideForm = () => {
        setToggle(0);
        setName('');
    }
    useEffect(() => {
        // saving to localstorage
        localStorage.setItem('zuddl_data',JSON.stringify(data));
    },[data]);
    let boardForm = <div className="rounded bg-gray-200 flex-shrink-0 p-2 max-w-2xl bg-opacity-25 mt-2"><form onSubmit={addBoard}><input type="text" placeholder="Name of Board" className="p-2 w-full rounded" onChange={e => setName(e.target.value)} /> <button className="mt-2 bg-green-500 p-2 rounded text-white text-sm">Add</button> <button type="button" onClick={() => hideForm()} className="mt-2 bg-green-500 p-2 rounded text-white text-sm">Clear</button></form></div>
    let boardItems  = data.map(board => <BoardItem key={board.id} board={board} removeBoard={removeBoard}/>);
    let emptyBoard = <div className="container mx-auto"><p className="my-4 text-white text-md font-bold">No boards Available, add a board</p><div>{toggle ? boardForm : <button className="bg-white shadow-md bg-opacity-50 hover:bg-opacity-100  p-6 rounded mt-2 border-b border-grey cursor-pointer hover:bg-grey-lighter w-60 text-center" onClick={() => setToggle(1)} >+ ADD A BOARD</button> }</div></div>;
    return (<div className="container mx-auto">
        <h2 className="my-4 text-white text-2xl font-bold">Boards</h2>
        <div className="flex-row flex flex-wrap">
        {data.length > 0 ? boardItems : emptyBoard}
        {data.length > 0 ? <div>{toggle ? boardForm : <button className="bg-white shadow-md bg-opacity-50 hover:bg-opacity-100  p-6 rounded mt-2 border-b border-grey cursor-pointer hover:bg-grey-lighter w-60 text-center" onClick={() => setToggle(1)} >+ ADD A BOARD</button> }</div> : null}
        </div>
        </div>);
}
export default BoardContainer;