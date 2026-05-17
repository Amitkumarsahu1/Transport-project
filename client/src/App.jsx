import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import Trucks from "./pages/Trucks";
import Drivers from "./pages/Drivers";
import Shipments from "./pages/Shipments";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import TruckAnalytics from "./pages/TruckAnalytics";
import Maintenance from "./pages/Maintenance";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
        path="/admin/trucks"
        element={
        <ProtectedRoute>
        <Trucks />
         </ProtectedRoute> }/>

          <Route
              path="/admin/drivers"
             element={
             <ProtectedRoute>
               <Drivers />
             </ProtectedRoute> }/>

             <Route
              path="/admin/shipments"
              element={
              <ProtectedRoute>
                <Shipments />
             </ProtectedRoute> }/>

             <Route
              path="/admin/expenses"
              element={
              <ProtectedRoute>
                <Expenses />
             </ProtectedRoute> }/>

             <Route
               path="/admin/reports"
               element={
              <ProtectedRoute>
                   <Reports />
              </ProtectedRoute> }/>

               <Route
                 path="/admin/clients"
                 element={
               <ProtectedRoute>
                 <Clients />
              </ProtectedRoute>}/>

              <Route
                path="/admin/invoices"
                element={
                  <ProtectedRoute>
                    <Invoices />
                  </ProtectedRoute> }/>

              <Route
                path="/admin/truck-analytics"
                element={
                  <ProtectedRoute>
                    <TruckAnalytics />
                  </ProtectedRoute>} />

                  <Route
                  path="/admin/maintenance"
                  element={
                    <ProtectedRoute>
                      <Maintenance />
                    </ProtectedRoute> }/>

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;