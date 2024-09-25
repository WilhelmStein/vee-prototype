import Image from "next/image";
import Logo from "@/app/public/logo.svg"
import { Button, NavbarBrand, NavbarContent, NavbarItem, Navbar as NavBarNextUI, Link } from "@nextui-org/react";

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
