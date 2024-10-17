import Router from "./Routes/RouteConfig";
import Toast from "./Utils/CustomToasts/Toast";
import UserSearchContext from "./Context/UserSearchContext";
import DriverLocation from "./Context/DriverLocation";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <Toast />
       <DriverLocation>
         <UserSearchContext>
           <ChatProvider>
             <Router />
           </ChatProvider>
         </UserSearchContext>
      </DriverLocation>
    </div>
  );
}

export default App;
