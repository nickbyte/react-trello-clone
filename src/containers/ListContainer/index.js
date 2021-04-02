import { Fragment, useEffect, useState } from "react";
import List from '../../components/List';
import {removeIcon} from '../../img/icons';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import AddItem from '../../components/addItem';
import { useParams, useHistory } from "react-router-dom";

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
        console.log('check',data[id-1])
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
            let filtered = dataItem[id-1].list.filter((ls) => ls.id != listId);
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
    }
    // list the lists 
    let listItems = data[id-1].list.map((list,key) => { 
        return(<div className="rounded bg-gray-200 flex-shrink-0 p-2 max-w-4xl w-1/4" key={key}>
        <div className="flex-none py-1">
        <button className="float-right" onClick={() => removeList(list.id)}>{removeIcon}</button>
        <h3 className="text-sm font-bold">{list.name}</h3> 
        </div>
        <div className="text-sm mt-2 overflow-scroll h-1/4" style={{height:30+'rem'}}>
            <Droppable droppableId={''+key+''} className={'overflow-scroll max-h-screen'}>
                {(provided) => {
                    return(<div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:80+'px',  overflow:'scroll'}}>
                        {list.items.map((el,idx) => {
                            return(
                                <Draggable key={el.id} index={idx} draggableId={''+el.id+''}>
                                    {(provided,snapshot) => {
                                        return(<div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter shadow-lg" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={key} >
                                            {editId == el.id ? <><input type="text" defaultValue={el.name} className="mt-3 text-grey-dark w-full bg-transparent p-2 border" onChange={event => setName(event.target.value)}/>
                                            <button onClick={() => editItem(key,idx)} className="bg-green-600 text-white p-2 mt-2 rounded">Update</button> <button onClick={() => setEditId('')} className="bg-green-600 text-white p-2 mt-2 rounded">Cancel</button>
                                            </> : <> {el.name }
                                            <div className="text-grey-darker mt-2 ml-2 flex justify-between items-start">
          	<span className="text-xs flex items-center">
              <button onClick={() => setEditId(el.id)}> 
              <svg className="h-4 fill-current mr-1"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
</svg>
</button>   
          	</span>
          	<button className="float-right" onClick={()=> removeItem(key,idx)}>{removeIcon}</button>
      	</div>
                                            </>}
                                            
                                 
                                        </div>)                       
                                    }}
                                </Draggable>
                            )
                        })}
                    {provided.placeholder}
                    </div>)
                }}
            </Droppable>
            <AddItem keyId={key} submitData={submitData}/>
        </div>
        </div>)
    });
    return(<Fragment>
    <div className="container mx-auto">
        <h2 className="my-4 text-white text-2xl font-bold">{data[id-1].name}</h2>
        <div className="flex space-x-4 pb-8 items-start space-between overflow-scroll w-screen">
        <DragDropContext onDragEnd={handleDragEnd}>
        {listItems}
        <div className="rounded bg-gray-200 flex-shrink-0 p-2 max-w-2xl w-1/6 bg-opacity-25" style={{marginRight:100+'px'}}>
        <div className="flex-none py-1">
        <h3 className="text-sm font-bold">Add a List</h3> 
        </div>
        <div className="text-sm mt-2"></div>
        <form onSubmit={addList}>
            <input type="text" className="w-full border rounded p-2 mb-2" placeholder="Name of the list" onChange={(e) => setListName(e.target.value)} value={listName}/>
            <button type="submit" className="p-2 bg-green-500 rounded text-white">Add List</button>
        </form>
        </div>
        </DragDropContext>
         </div>
         </div>   
    </Fragment>);
}
export default ListContainer;