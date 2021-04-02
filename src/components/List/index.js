import ItemsContainer from "../../containers/ItemsContainer";

export default function List(props){
    console.log('in list',props)
    const {name, items} = props.list;
return(
<div className="rounded bg-gray-200 flex-no-shrink w-6/12 p-2 mr-3">
<div className="flex-none justify-between py-1">
    <h3 className="text-sm font-bold">{name}</h3> <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
</div>
<div className="text-sm mt-2">
    {/* <ItemsContainer items={items} /> */}
    <p className="mt-3 text-grey-dark">Add a card...</p>
</div>
</div>)
};