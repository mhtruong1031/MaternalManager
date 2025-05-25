// import ListGroup from './components/RecentConcerns.tsx'
//import Alert from "./components/Alerts";
import Button from "./components/Button";


function App(){
  /*
  let  concerns = ["Concern 1", "Concern 2", "Concern 3"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  }
  
  return <div><ListGroup items={concerns} heading="Recent Concerns" onSelectItem={handleSelectItem}/></div>;
  */
 return (
  <div>
    <Button color="secondary" onClick={() => console.log('Clicked')}children="Hi"/>
  </div>
 )
}

export default App;