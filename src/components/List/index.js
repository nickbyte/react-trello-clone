import ItemsContainer from "../../containers/ItemsContainer";
import {Droppable} from "react-beautiful-dnd";
import AddItem from '../../components/addItem';

export default function List(props){
return(<div className="text-sm mt-2 overflow-scroll h-1/4" style={{maxHeight:30+'rem'}}>
            <Droppable droppableId={''+props.keyId+''} className={'overflow-scroll max-h-screen'}>
                {(provided) => {
                    return(<div ref={provided.innerRef} {...provided.droppableProps} style={{minHeight:80+'px',  overflow:'scroll'}}>
                        {props.list.items.map((el,idx) => {
                            return(
                                <ItemsContainer key={idx} keyId={props.keyId} el={el} idx={idx} editItem={props.editItem} setName={props.setName} setEditId={props.setEditId}  editId={props.editId} removeItem={props.removeItem} />
                            )
                        })}
                    {provided.placeholder}
                    </div>)
                }}
            </Droppable>
            <AddItem keyId={props.keyId} submitData={props.submitData}/>
        </div>)
};