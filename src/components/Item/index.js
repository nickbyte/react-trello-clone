export default function Item(props){
let {item} = props;
return(<div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter shadow-lg">
   {item.name}
</div>)
}