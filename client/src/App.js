import './App.css';
import { IoAddCircleOutline, IoPencil, IoTrashSharp, } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { Popup } from 'reactjs-popup';

import ProductTableHook from './components/ProductTableHook';

function App() {
  return(
    <div className="Container">
      <div className ="sidebar">
        <span id ="title"><h1>inventory tracker</h1></span>
        <span id = "sidecontent">
          Hello!
        </span>
       
      </div>
    
      <div className ="nav">
       
        <ul>

          <li id = 'first'>
              HOME
          </li>
          <li>
            <Popup trigger =
              {
                <button>
                    <IconContext.Provider
                      value ={{ color: '#FFFFFFFF', size:'44px'}}
                    >
                    <IoAddCircleOutline />
                  </IconContext.Provider>
                </button>
              } >
                <div className = 'add'>
                  <h1>ADD</h1>
                </div>
              </Popup>
                
           </li>
           <li>
            <Popup trigger = 
              {  
              <button>
                <IconContext.Provider
                  value ={{ color: '#FFFFFFFF', size:'44px'}}
                >
                  <IoPencil />
                </IconContext.Provider>
              </button>
              } >
                <div className = 'edit'>
                  <h1>TEST</h1>
                </div>
            </Popup>
          </li>
          <a href=''>
            <li>
              <IconContext.Provider
                value ={{ color: '#FFFFFFFF', size:'44px'}}
              >
                <IoTrashSharp />
            </IconContext.Provider>
            </li>
          </a>
        </ul>
        
      </div>
      
      <main className ="content">
        
        <ProductTableHook />
        
      </main>
    </div>
  );
}
export default App;

