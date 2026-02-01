/** * APP: Entry Point
 * Solo se encarga de proveer el Router a la aplicación.
 */
import { RouterProvider } from "react-router-dom";
import { router } from "./App.router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
