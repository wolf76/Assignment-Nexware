import Register from "./components/MainPages/Register";
import Login from "./components/MainPages/Login";
import MainPage from "./components/MainPages/MainPage";
import Customer from "./components/Customers/Customer";
import { store } from "./store";

export default [
  { path: "/", redirect: { name: "login" } },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  {
    path: "/customers-list",
    name: "customers-list",
    component: MainPage,
    beforeEnter: (to, from, next) => {
      if (
        store.state.user === 'null' ||
        (store.state.user.id === 'null' && store.state.user.id == undefined)
      ) {
        next("/login");
      } else {
        next();
      }
    },
    children: [
      { path: "/customer/:custId", name: "customer", component: Customer },
    ],
  },
];
