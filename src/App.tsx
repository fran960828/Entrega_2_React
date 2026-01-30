import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./presentation/layout/rootLayout";
import  HomePage  from "./presentation/pages/HomePage";
import CharactersPage from "./presentation/pages/CharactersPage";
import ErrorPage from "./presentation/components/ErrorAlert";

import { charactersLoader} from './loaders/loaders.character'
import LocationsPage from "./presentation/pages/LocationsPage";
import { locationsLoader } from "./loaders/loaders.location";
import { EpisodesPage } from "./presentation/pages/EpisodesPage";
import { episodesLoader } from "./loaders/loaders.episode";
import { CharacterDetailPage } from "./presentation/pages/CharactersDetailPage";
import { characterIdLoader } from "./loaders/loaders.CharacterDetail";
import { FavoritesPage } from "./presentation/pages/FavoritesPage";

function App() {
  const route=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      errorElement:<ErrorPage/>,
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
          path:'/characters/:id',
          element:<CharacterDetailPage/>,
          loader:characterIdLoader
            
          
        },
        {
          path:'/episodes',
          element:<EpisodesPage/>,
          loader:episodesLoader
        },
        {
          path:'/locations',
          element:<LocationsPage/>,
          loader:locationsLoader
        },
        {
          path:'/favorites',
          element:<FavoritesPage/>
        },
      ]
    }
  ])



  return <>
   <RouterProvider router={route}/>
  </>;
}

export default App;
