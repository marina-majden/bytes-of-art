import { NavLink } from "react-router";

export default function NavBar() {
    return (
        <nav className='bg-blue-500 p-4'>
            <ul className='flex space-x-6'>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive, isPending }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                            ].join(" ")
                        }>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/portraits'
                        className={({ isActive, isPending }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                            ].join(" ")
                        }>
                        Portraits
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/symbolism'
                        className={({ isActive, isPending }) =>
                            [
                                isPending ? "pending" : "",
                                isActive ? "active" : "",
                            ].join(" ")
                        }>
                        Symbols
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
