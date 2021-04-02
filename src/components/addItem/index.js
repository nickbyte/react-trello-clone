import { useState } from "react";
import * as uuid from 'uuid'; 

export default function AddItem(props){
    const [name, setName] = useState('');
    const handleChange = event => setName(event.target.value);
    const handleSubmit = () => {
        if(name){
        let obj = {
            id:uuid.v4(),
            name
        }
        props.submitData(obj,props.keyId);
        setName('');
    } else {
        alert('Please type something');
    } 
    }
    return (
     <>   
    <input value={name} onChange={handleChange} placeholder="Add an item" className="mt-3 text-grey-dark w-full bg-transparent p-2" onKeyDown={(event) => event.key === 'Enter' ? handleSubmit() : null}/>
    {name && name.length > 0  ? <><button onClick={handleSubmit} className="bg-green-600 text-white p-2 mt-2 rounded">Save</button>  <button type="reset" onClick={() => setName('')} className="bg-green-600 text-white p-2 mt-2 rounded">Clear</button></>
 : null}
    </>
    )
}