import Products from './Components/Sidebar/Products/Products'
import Comments from './Components/Sidebar/Comments/Comments'
import Users from './Components/Sidebar/Users/Users'
import Orders from './Components/Sidebar/Orders/Orders'
import Offs from './Components/Sidebar/Offs/Offs'

const routes = [
    {path: "/products" , element: <Products/>},
    {path: "/comments" , element: <Comments/>},
    {path: "/users" , element: <Users/>},
    {path: "/orders" , element: <Orders/>},
    {path: "/offs" , element: <Offs/>},

];

export default routes