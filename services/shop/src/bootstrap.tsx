import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const root = document.getElementById('root') as HTMLElement;

const container = createRoot(root);

container.render(
    <RouterProvider router={router} />
);
