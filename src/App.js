import React, { useEffect, useState } from 'react';
import './App.css';
import QuestionPanel from './components/QuestionPanel';

// https://metmuseum.github.io/

function App({department}) {
  let [objectIds, setObjectIds] = useState()

  useEffect(() => {
      (async () => {
          let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${department}`);
          
          if(!response.ok) {
              setObjectIds(null);
              console.error(response);
              return;
          }

          let resJson = await response.json()

          console.log(resJson);

          setObjectIds(resJson.objectIDs);
      })();
  }, [department]);

  return (
    <div className="App">
      <QuestionPanel
        objectIds={objectIds}
      />
    </div>
  );
}

export default App;
