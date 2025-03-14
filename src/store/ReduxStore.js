import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import {thunk} from "redux-thunk";
  import { reducers } from "../reducers";
  
  function saveToLocalStorage(store) {
    try {
        // Add logging to see the store data before it's saved
     //   console.log("Saving data to localStorage:", store);

        // Serialize the store to a JSON string
        const serializedStore = JSON.stringify(store);
      //  console.log("Serialized store data:", serializedStore); // This will show the serialized data

        // Save to localStorage with the key 'store'
        window.localStorage.setItem('store', serializedStore);
      //  console.log("Data successfully saved to localStorage!");
    } catch(e) {
        // Log any errors that occur during the save process
        console.log("Error saving to localStorage:", e);
    }
}

  
  function loadFromLocalStorage() {
   // console.log("loadFromLocalStorage called!");
    try {
        const serializedStore = window.localStorage.getItem('store');
      //  console.log("loadFromStroge",serializedStore)
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 // console.log("About to call loadFromLocalStorage");
  const persistedState = loadFromLocalStorage();
//  console.log("persistedState",persistedState)
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
  
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;