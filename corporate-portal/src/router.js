import {createRouter, createWebHistory} from "vue-router";
import Home from "./views/Home.vue";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/projects",
        component: () => import('./views/Projects.vue')
    },
    {
        path: "/tasks",
        component: () => import("./views/Tasks")
    },
    {
        path: "/postings",
        component: () => import("./views/Postings")
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;

