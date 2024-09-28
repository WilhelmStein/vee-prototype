import Logo from "@/app/public/logo.svg";
import { Link, NavbarContent, NavbarItem, Navbar as NavBarNextUI } from "@nextui-org/react";
import Image from "next/image";

const NavBar = () => {
    return (
        <NavBarNextUI isBordered>

            <Link href="/">
                <Image
                    src={Logo}
                    alt=""
                    height={32}
                    width={32}
                    style={{
                        marginRight: '80px'
                    }}
                />
            </Link>

            <NavbarContent justify="start">
                <NavbarItem >
                    <Link isDisabled color="foreground" href="/social-media">
                        Social Media
                    </Link>
                </NavbarItem>

                <NavbarItem isActive>
                    <Link color="foreground" href="/grants">
                        Grants
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </NavBarNextUI>
    );
}

export default NavBar;
