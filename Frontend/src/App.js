import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom"; 
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FarmerDashboard from "./pages/User/Farmer/farmerdashboard"; 
import DashboardContent from "./pages/User/Farmer/dashboardcontent";
import ProductsContent from "./pages/User/Farmer/productcontent";
import CustomersContent from "./pages/User/Farmer/customerscontent";
import DriverListing from "./pages/User/Farmer/Drivercontnent";
import ConsultantChat from "./pages/User/Farmer/consultant";
import LabourersContent from "./pages/User/Farmer/Labourer";
import Equipments from "./pages/User/Farmer/equipment";
import DriverDashboard from "./pages/User/Driver/dashboard";
import DriverDashboardContent from "./pages/User/Driver/driverdashboardcontent";
import DriverJobs from "./pages/User/Driver/driversjob";
import ConsultantDashboard from "./pages/User/Consultant/dashboard";
import ConsultantDashboardContent from "./pages/User/Consultant/consultantdashboardcontent";
import Consultations from "./pages/User/Consultant/consultations";
import ClientsManagement from "./pages/User/Consultant/clients";
import DriverProfile from "./pages/User/Driver/profile";
import ConsultantProfile from "./pages/User/Consultant/profile";
import AdminDashboard from "./pages/User/Admin/admindashboard";
import AdminDashboardContent from "./pages/User/Admin/dashboardcontent";
import UserManagement from "./pages/User/Admin/usermanagement";
import ProductManagement from "./pages/User/Admin/productmanagement";
import FarmerProfile from "./pages/User/Farmer/profile";
import OrderManagement from "./pages/User/Admin/ordermanagement";
import AdminProfile from "./pages/User/Admin/profile";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <ScrollRestoration />
      <Outlet /> 
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* Main routes */}
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/category/:category" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentgateway" element={<Payment />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      {/* Admin Dashboard routes */}
      <Route path="/admindashboard" element={<AdminDashboard/>}>
        <Route index element={<AdminDashboardContent/>}/>
        <Route path="usermanagement" element={<UserManagement />} />
        <Route path="productmanagement" element={<ProductManagement />} />
        <Route path="ordermanagement" element={<OrderManagement />} />
        <Route path="profile" element={<AdminProfile />} />


      </Route>
      
      {/* Farmer Dashboard routes */}
      <Route path="/farmerdashboard" element={<FarmerDashboard />}>
        <Route index element={<DashboardContent />} />
        <Route path="products" element={<ProductsContent />} />
        <Route path="customers" element={<CustomersContent/>} />        
        <Route path="driver" element={<DriverListing/>} />
        <Route path="consultant" element={<ConsultantChat/>} />
        <Route path="market" element={<Shop/>} />
        <Route path="labourers" element={<LabourersContent/>} />
        <Route path="equipment" element={<Equipments/>} />
        <Route path="profile" element={<FarmerProfile/>} />


        {/* Add more nested routes here if needed */}
      </Route>

      {/* Driver Dashboard routes */}
      <Route path="/driverdashboard" element={<DriverDashboard />}>
        <Route index element={<DriverDashboardContent />} />
        <Route path="jobs" element={<DriverJobs />} />
        <Route path="profile" element={<DriverProfile />} />

      </Route>

      {/* Consultant Dashboard Routes */}
      <Route path="/consultantdashboard" element={<ConsultantDashboard />}>
        <Route index element={<ConsultantDashboardContent />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="clients" element={<ClientsManagement />} />
        <Route path="profile" element={<ConsultantProfile />} />


      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
