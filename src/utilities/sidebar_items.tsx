import {
    BoxCubeIcon,
    GridIcon,
    GroupIcon,
    AudioIcon,
    DollarIcon,
    CalenderIcon,
    // LocationIcon,
} from "../icons";
import { ROUTES_PATHS } from "../routes/route_paths";

export const SIDEBAR_ITEMS = [
    {
        icon: <GridIcon className="w-6 h-6" />,
        name: "Dashboard",
        path: ROUTES_PATHS?.DASHBOARD?.BASE,
        allowed: ["admin", "user", "artist"],
    },

    {
        icon: <GroupIcon className="w-6 h-6" />,
        name: "Users",
        allowed: ["admin"],
        submenu: [
            {
                name: "Users List",
                path: ROUTES_PATHS?.DASHBOARD?.USER?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add User",
                path: ROUTES_PATHS?.DASHBOARD?.USER?.BASE,
                allowed: ["admin"],
            },
        ],
    },

    {
        icon: <BoxCubeIcon className="w-6 h-6" />,
        name: "Categories",
        allowed: ["admin"],
        submenu: [
            {
                name: "Categories List",
                path: ROUTES_PATHS?.DASHBOARD?.CATEGORY?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add Category",
                path: ROUTES_PATHS?.DASHBOARD?.CATEGORY?.BASE(""),
                allowed: ["admin"],
            },
        ],
    },


    {
        icon: <AudioIcon className="w-6 h-6" />,
        name: "Artists",
        allowed: ["admin"],
        submenu: [
            {
                name: "Artists List",
                path: ROUTES_PATHS?.DASHBOARD?.ARTIST?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add Artist",
                path: ROUTES_PATHS?.DASHBOARD?.ARTIST?.BASE(""),
                allowed: ["admin"],
            },
        ],
    },
    {
        icon: <DollarIcon className="w-6 h-6" />,
        name: "Packages",
        allowed: ["admin"],
        submenu: [
            {
                name: "Packagaes List",
                path: ROUTES_PATHS?.DASHBOARD?.PACKAGE?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add Package",
                path: ROUTES_PATHS?.DASHBOARD?.PACKAGE?.BASE(""),
                allowed: ["admin"],
            },
        ],
    },
    {
        icon: <CalenderIcon className="w-6 h-6" />,
        name: "Bookings",
        allowed: ["admin", "user", "artist"],
        submenu: [
            {
                name: "Bookings List",
                path: ROUTES_PATHS?.DASHBOARD?.BOOKING?.LIST,
                allowed: ["admin"],
            },

            {
                name: "Add Booking",
                path: ROUTES_PATHS?.DASHBOARD?.BOOKING.BASE,
                allowed: ["admin"],
            },

            //   {
            //     name: "Artist Bookings",
            //     path: ROUTES_PATHS?.DASHBOARD?.BOOKING?.ARTIST,
            //     allowed: ["artist"],
            //   },

            //   {
            //     name: "My Bookings",
            //     path: ROUTES_PATHS?.DASHBOARD?.BOOKING?.MY_BOOKINGS,
            //     allowed: ["admin", "user", "artist"],
            //   },


        ],
    },
    {
        icon: <DollarIcon className="w-6 h-6" />,
        name: "Payments",
        allowed: ["admin"],
        submenu: [
            {
                name: "Payments List",
                path: ROUTES_PATHS?.DASHBOARD?.PAYMENT?.LIST,
                allowed: ["admin"],
            },
            {
                name: "Add Payment",
                path: ROUTES_PATHS?.DASHBOARD?.PAYMENT?.BASE,
                allowed: ["admin"],
            },
        ],
    },

];
