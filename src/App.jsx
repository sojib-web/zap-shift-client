import toast, { Toaster } from "react-hot-toast";
import AddParcel from "./Components/AddParcel/AddParcel"; // adjust path as needed

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <AddParcel />
      <button onClick={() => toast.success("It works!")}>Show Toast</button>
    </>
  );
}

export default App;
