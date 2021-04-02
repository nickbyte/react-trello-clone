import {Draggable} from "react-beautiful-dnd";
import {editIcon, removeIcon} from '../../img/icons';
export default function ItemsContainer(props){
    let {el,idx} = props;
    return(<Draggable key={el.id} index={idx} draggableId={''+el.id+''}>
    {(provided,snapshot) => {
        return(<div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter shadow-lg" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={props.keyId} >
            {props.editId === el.id ? <><input type="text" defaultValue={el.name} className="mt-3 text-grey-dark w-full bg-transparent p-2 border" onChange={event => props.setName(event.target.value)}/>
            <button onClick={() => props.editItem(props.keyId,idx)} className="bg-green-600 text-white p-2 mt-2 rounded">Update</button> <button onClick={() => props.setEditId('')} className="bg-green-600 text-white p-2 mt-2 rounded">Cancel</button>
            </> : <> {el.name }
            <div className="text-grey-darker mt-2 ml-2 flex justify-between items-start">
<span className="text-xs flex items-center">
<button onClick={() => props.setEditId(el.id)}> 
{editIcon}
</button>   
</span>
<button className="float-right" onClick={() => props.removeItem(props.keyId,idx)}>{removeIcon}</button>
</div>
</>}
        </div>)                       
    }}
</Draggable>);
}
