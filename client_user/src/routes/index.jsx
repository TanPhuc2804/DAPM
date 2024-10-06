import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";

const publicRoutes =[
    {path:'/',component:Home},
    {path:'/profile',component:Profile}
]

const privateRoutes =[

]

export {publicRoutes,privateRoutes}
