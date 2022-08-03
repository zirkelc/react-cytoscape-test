import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
// @ts-ignore
import coseBilkent from 'cytoscape-cose-bilkent';import React from 'react';
// @ts-ignore
import cola from 'cytoscape-cola';
const Elements = [
       { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
       { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
       { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];
const layout = { name: 'cola', fit: true, padding: 30 };

Cytoscape.use(coseBilkent);
Cytoscape.use(cola); // https://github.com/cytoscape/cytoscape.js-cola


function App() {
  const [count, setCount] = useState(0)
  const [cyRef, setCyRef] = useState<cytoscape.Core>()
    const layoutRef = React.useRef<cytoscape.Layouts | null>(null);

  const [elements, setElements] = useState<any>(Elements);

  React.useEffect(() => {
    console.log('useEffect')
    cyRef?.layout(layout).run()

  }, [elements]);

  return (
    <div className="App" >

      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          setElements((elements: any) =>
            [...elements, { data: { id: count, label: `Node ${count}` } }]);
        } }
      >
          count is {count}
        </button>
      </div>
<div>
      <CytoscapeComponent cy={(cy) => {
        console.log('setCyRef', { old: cyRef, new: cy, equals: cyRef === cy });
        setCyRef(cy);
        }} elements={elements} layout={layout} style={{ backgroundColor: '#fff', }} />
        </div>
    </div>
  )
}

export default App
