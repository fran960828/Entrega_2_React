import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./presentation/layout/rootLayout";
import  HomePage  from "./presentation/pages/HomePage";
import CharactersPage from "./presentation/pages/CharactersPage";

import { charactersLoader} from './loaders/loaders.character'

function App() {
  const route=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      //errorElement:<ErrorPage/>,
      children:[
        {
          index:true,
          element:<HomePage/>
        },
        {
          path:'/characters',
          element:<CharactersPage/>,
          loader:charactersLoader
        },
        {
          path:'/characters:id',
          //element:<CharacterDetail/>
            
          
        },
        {
          path:'/episodes',
          //element:<Episodes/>
        },
        {
          path:'/locations',
          //element:<Locations/>
        },
        {
          path:'/favorites',
          //element:<Favorites/>
        },
      ]
    }
  ])



  return <>
   <RouterProvider router={route}/>
  </>;
}

export default App;
