import { Leads, MainContainer, Opportunities } from "./components";
import { ApiProvider } from "./context/ApiContext";

function App() {
  return (
    <ApiProvider>
      <MainContainer>
        <Leads />
        <Opportunities />
      </MainContainer>
    </ApiProvider>
  );
}

export default App;
