import { createRoot } from "react-dom/client";;
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const root = document.getElementById('root') as HTMLElement;

const component= createRoot(root);

component.render(
    <RouterProvider router={router} />
);
