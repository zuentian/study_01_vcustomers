import Customers from './components/Customers.vue'
import About from './components/About.vue'
import Add from './components/Add.vue'
import CustomerDetails from './components/CustomerDetails.vue'
import Edit from './components/Edit.vue'
import AddressListAdd from './components/AddressListAdd.vue'
import Login from './components/Login.vue'
import UpdownFile from './components/UpdownFile.vue'
import EchartsShow from './components/EchartsShow.vue'
import AddMovie from './components/AddMovie.vue'
import MovieInfo from './components/MovieInfo.vue'
import UpdateMovie from './components/UpdateMovie.vue'
import MovieDetail from './components/MovieDetail.vue'
import MoviePicture from './components/MoviePicture.vue'
import MovieReport from './components/MovieReport.vue'
import MovieReport1 from './components/MovieReport1.vue'
import Dict from './components/Dict.vue'
export default[
    {path:"/login",component:Login},
    {path:"/about",component:About},
    {path:"/add",component:Add},
    {path:"/customer/:userId",component:CustomerDetails},
    {path:"/edit/:userId",component:Edit},
    {path:"/addressListAdd",component:AddressListAdd},
    //{path:"/updownFile",component:UpdownFile},
   // {path:"/echartsShow",component:EchartsShow},
    {path:"/addMovie",component:AddMovie},
    {path:"/",component:MovieInfo},
    {path:"/updateMovie/:movieId",component:UpdateMovie},
    {path:"/movieDetail/:movieId",component:MovieDetail},
    {path:"/moviePicture/:movieId",component:MoviePicture},
    {path:"/movieReport",component:MovieReport},
    {path:"/movieReport1",component:MovieReport1},
    {path:"/dict",component:Dict},
]