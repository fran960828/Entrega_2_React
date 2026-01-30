/** * PAGE: HomePage
 * Punto de entrada de la ruta principal.
 * Actúa como un "Wrapper" agnóstico que renderiza el contenedor del Dashboard.
 */

import { Dashboard } from "../container/dashboard/Dashboard";

export default function HomePage
 (){
    return (
        <Dashboard/>
    )
}