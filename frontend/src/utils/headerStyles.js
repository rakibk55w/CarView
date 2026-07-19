export const searchBarStyle = 
    `w-full 
    rounded-full 
    border 
    border-gray-300 
    bg-white 
    py-2 
    pl-11 
    pr-4 
    text-gray-800 
    outline-none 
    transition 
    focus:border-primary-500 
    focus:ring-2 
    focus:ring-primary-300`;

export const headerButtonStyle = 
    `rounded-lg 
    bg-white 
    px-4 
    py-2 
    text-primary-700 
    shadow-sm 
    transition-colors 
    duration-200 
    cursor-pointer
    hover:bg-primary-100 
    hover:text-primary-800 
    active:bg-primary-200 
    active:scale-95`;

export const profileDropdownStyle = 
    `absolute
    top-full
    z-50
    w-36
    overflow-hidden
    rounded-lg
    border
    border-gray-200
    bg-white
    text-gray-800
    shadow-lg

    dark:border-gray-700
    dark:bg-gray-800
    dark:text-white`;

export const profileDropdownItemStyle = 
    `block
    border-b
    border-gray-200
    px-4
    py-3
    transition-colors
    duration-150

    last:border-b-0

    hover:bg-primary-800
    hover:text-white

    dark:border-gray-700
    dark:hover:bg-white
    dark:hover:text-gray-900`;

export const navLinkStyle = ({ isActive }) =>
    `border-b-2 
    pb-1 
    transition-colors 
    duration-200
    ${
        isActive
            ? "border-black text-white"
            : "border-transparent text-white hover:border-white hover:text-black"
    }`;