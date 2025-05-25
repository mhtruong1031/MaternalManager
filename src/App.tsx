import ListGroup from './components/RecentConcerns.tsx'
//import Alert from "./components/Alerts";
//import Button from "./components/Button";
import React from 'react';
import Gradient from "./LoadingPage";


function App(){
  let  concerns = ["Concern 1", "Concern 2", "Concern 3"];

  
  

  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
      setLoading(false)
      }, 3000)
  }, [])
 return (
  <div className="flex justify-center items-center absolute z-0">
    {loading ? (
      <Gradient 
        className={ 
        "h-screen w-screen" } 
      >
        <p className={ "text-white h-screen justify-center items-center" }>Guardian Angel</p>
      </Gradient>) : (

      <div><ListGroup items={concerns} heading="Recent Concerns" onSelectItem={handleSelectItem}/></div>;
      )}

  </div>
    
  
 );
}

export default App;