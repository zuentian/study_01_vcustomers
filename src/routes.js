import Customers from './components/Customers.vue'
import About from './components/About.vue'
import Add from './components/Add.vue'
import CustomerDetails from './components/CustomerDetails.vue'
import Edit from './components/Edit.vue'
import AddressListAdd from './components/AddressListAdd.vue'
import Login from './components/Login.vue'
export default[
    {path:"/",component:Customers},
    {path:"/about",component:About},
    {path:"/add",component:Add},
    {path:"/customer/:userId",component:CustomerDetails},
    {path:"/edit/:userId",component:Edit},
    {path:"/addressListAdd",component:AddressListAdd}
]