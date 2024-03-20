import {
    HomePage, DetailEventPage, LoginPage, ErrorPage
} from '../pages';
import { DefaultLayout } from '../layouts';


export const public_router = [
    {
        element: <HomePage />,
        path: '/',
        layout: DefaultLayout
    },
    {
        element: <DetailEventPage />,
        path: '/detail/events/:eventSlug',
        layout: DefaultLayout
    },
    {
        element: <LoginPage />,
        path: '/login',
        layout: DefaultLayout
    },
    {
        element: <ErrorPage />,
        path: '*',
        layout: null
    }
]