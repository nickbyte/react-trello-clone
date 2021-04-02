import { Fragment, useEffect, useState } from "react";
import List from '../../components/List';
import {DragDropContext} from "react-beautiful-dnd";
import { useParams, useHistory } from "react-router-dom";
import AddItem from '../../components/addItem';
import {removeIcon} from '../../img/icons';
import AddList from "../../components/addList";
function ListContainer(props){
    // initialstate from localStorage
    let initialData = localStorage.hasOwnProperty('zuddl_data') ? JSON.parse(localStorage.getItem('zuddl_data')) : [{"id":1,"name":"Board 1","list":[{"id":1,"name":"To Do","items":[{"id":"65918ba4-470e-466f-9faa-3c8047275807","name":"Send package to Mom"},{"id":"1116c8c3-959a-4823-94c4-7cd96bb32b41","name":"Buy Groceries"},{"id":"5cb1f2bd-4298-4141-9b15-621adbc1c815","name":"Email Elon Musk"}]},{"id":2,"name":"Done","items":[{"id":"a92d418f-cee9-439e-bd2a-377e298489a3","name":"Clean the house"}]}]}];
    const [data,setData] = useState(initialData);
    let history = useHistory();
    let {id} = useParams();
    // const [lists,setLists] = useState(initialState);
    const [name, setName] = useState('');
    const [listName, setListName] = useState('');
    const [editId, setEditId] = useState('');
    
    // add a list
    const addList = (e) => {
        e.preventDefault();
        if(listName.length < 2){
            alert('Please enter name of the list');
            return;
        }
        let obj = {
            id: data[id-1].list.length+1,
            name:listName,
            items:[]
        }
        const dataItem = Array.from(data);
        setListName('');
        dataItem[id-1].list.push(obj);
        setData(dataItem);
       
    }
    // remove a list 
    const removeList = (listId) => {
        if (window.confirm("Are you sure you want to delete?")) {
            const dataItem = Array.from(data);
            let filtered = dataItem[id-1].list.filter((ls) => ls.id !== listId);
            dataItem[id-1].list = filtered;
            setData(dataItem);
          }
    }

    // handle drag event
    const handleDragEnd = ({destination, source}) => {
        // return if destination is empty
        if(!destination){
            return;
        }
        // check if destination index & source index are not the same 
        // and destination droppableId & source droppableid are not the same
        // return 
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }
        const dataItem = Array.from(data);
        const copy = dataItem[id-1].list[source.droppableId].items.splice(source.index, 1)
        dataItem[id-1].list[destination.droppableId].items.splice(destination.index, 0, copy[0]);
        setData(dataItem);
      }
    // add an item to the list
    const submitData = (obj,key) => {
        const dataItem = Array.from(data);
        dataItem[id-1].list[key]?.items.push(obj);
        setData(dataItem);
    }
    // remove an item from the list
    const removeItem = (key,idx) => {
        const dataItem = Array.from(data);
        dataItem[id-1].list[key].items.splice(idx,1);
        setData(dataItem);
    }
    // edit Item 
    const editItem = (key,idx) => {
        // initialising value in case of no change.
        const dataItem = Array.from(data);
        if(name.length > 0){
            dataItem[id-1].list[key].items[idx].name = name;
            setData(dataItem);
        } 
        setName('');
        setEditId('');
    }
    // save to localstorage when a change happens
    useEffect(()=>{
        localStorage.setItem('zuddl_data',JSON.stringify(data));
    },[data]);
    // redirecting to 404 if data is not defined
    if(!data[id-1]){
        history.push('/404');
        return false;
    }
    // list the lists 
    let listItems = data[id-1].list.map((list,key) => { 
        return(<div className="rounded bg-gray-200 flex-shrink-0 p-2 max-w-4xl w-1/4" key={key}>
        <div className="flex-none py-1">
        <button className="float-right" onClick={() => removeList(list.id)}>{removeIcon}</button>
        <h3 className="text-sm font-bold">{list.name}</h3> 
        </div>
        <List keyId={key} setName={setName} list={list} editId={editId} setEditId={setEditId} removeItem={removeItem} AddItem={AddItem} editItem={editItem} submitData={submitData} />
        </div>)
    });

    return(<Fragment>
    <div className="container mx-auto">
        <h2 className="my-4 text-white text-2xl font-bold">{data[id-1].name}</h2>
        <div className="flex space-x-4 pb-8 items-start space-between overflow-scroll w-screen">
        <DragDropContext onDragEnd={handleDragEnd}>
        {listItems}
        <AddList addList={addList} setListName={setListName} listName={listName}/>
        </DragDropContext>
         </div>
         </div>   
    </Fragment>);
}
export default ListContainer;