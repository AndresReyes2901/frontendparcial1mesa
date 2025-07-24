import { Route, Routes, Navigate } from "react-router-dom";
import { NavBar } from "./Components/NavBar.jsx";
import { Login } from "./Routes/Login/Login.jsx";
import { Registrar } from "./Routes/Registros/Registrar.jsx";
import { Home } from "./Routes/Home/Home.jsx";
import { Cliente } from "./Routes/Client/Cliente.jsx";
import { Administrador } from "./Routes/Admin/Administrador.jsx";
import { Table_Users } from "./Routes/Admin/Gestion-Usuario/Table_Users.jsx";
import { Table_Products } from "./Routes/Admin/Gestion-Productos/Table_Products.jsx";
import { Table_Delivery } from "./Routes/Admin/Gestion-Delivery/Table_Delivery.jsx";
import { useState } from "react";
import { Reportes } from "./Routes/Admin/Reports/Reportes.jsx";
import { Products } from "./Routes/Client/Shopping/Products.jsx";
import { Carrito } from "./Routes/Client/Shopping/Carrito.jsx";
import { Historial } from "./Routes/Client/History/Historial.jsx";
import { Success } from "./Routes/Client/Success.jsx";

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <>
      <NavBar onLoginClick={() => setMostrarLogin(true)} />
      {mostrarLogin && <Login onClose={() => setMostrarLogin(false)} />}

      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Registers" element={<Registrar />} />
        <Route path="/Success" element={<Success/>}/>

        <Route path="Products" element={<Products />} />

        <Route path="/Client" element={<Cliente />}>
          <Route path="Carrito" element={<Carrito />} />
          <Route path="Ver_Historial" element={<Historial/>}></Route>
        </Route>


        <Route path="/Admin" element={<Administrador />}>
          <Route path="Users" element={<Table_Users />} />
          <Route path="Productos" element={<Table_Products />} />
          <Route path="Pedidos" element={<Table_Delivery />} />
          <Route path="Reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
