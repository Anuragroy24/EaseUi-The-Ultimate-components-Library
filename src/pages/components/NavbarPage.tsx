import { Navbar } from "@/components/navbar";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const defaultLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const NavbarPage = () => {
  const basicUsageCode = `
import { Navbar } from "@/components/navbar/Navbar"
import { Button } from "@/components/Button/Button"

<Navbar
  logo="EaseUi"
  links={[
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ]}
  actions={<Button variant="primary" size="sm" hoverAnimation="none">Sign Up</Button>}
/>`;

  const variantsCode = `
import { Navbar } from "@/components/navbar/Navbar"
import { Button } from "@/components/Button/Button"

<Navbar variant="light" logo="EaseUi" links={links} actions={<Button variant="primary" size="sm" hoverAnimation="none">Profile</Button>} />
<Navbar variant="dark" logo="EaseUi" links={links} actions={<Button variant="primary" size="sm" hoverAnimation="none">Profile</Button>} />
<Navbar variant="primary" logo="EaseUi" links={links} actions={<Button variant="dark" size="sm" hoverAnimation="none">Profile</Button>} />
<Navbar variant="glass" logo="EaseUi" links={links} actions={<Button variant="outline" size="sm" hoverAnimation="none">Profile</Button>} />`;

  const searchCode = `
import { Navbar } from "@/components/navbar/Navbar"
import { Button } from "@/components/Button/Button"

<Navbar
  logo="EaseUi"
  showSearch
  searchPlaceholder="Search components"
  links={[
    { label: "Components", href: "#", active: true },
    { label: "About", href: "#" },
    { label: "Templates", href: "#" },
  ]}
  actions={<Button variant="primary" size="sm" hoverAnimation="none">Get Started</Button>}
/>`;

  const animatedCode = `
import { Navbar } from "@/components/navbar/Navbar"
import { Button } from "@/components/Button/Button"

<Navbar
  logo="EaseUi"
  animation="slideUp"
  hoverAnimation="shadowPulse"
  links={links}
  actions={<Button variant="primary" size="sm" hoverAnimation="none">Profile</Button>}
/>`;

  const propsData = [
    {
      prop: "logo",
      type: "React.ReactNode",
      default: '"Logo"',
      description: "Brand logo or title displayed on the left",
    },
    {
      prop: "links",
      type: "NavLink[]",
      default: "[]",
      description:
        "Navigation links with label, href, onClick, and optional active state",
    },
    {
      prop: "actions",
      type: "React.ReactNode",
      default: "-",
      description: "Right-side content such as buttons or icons",
    },
    {
      prop: "showSearch",
      type: "boolean",
      default: "false",
      description: "Shows a search input in the navbar",
    },
    {
      prop: "searchPlaceholder",
      type: "string",
      default: '"Search..."',
      description: "Placeholder text for the search input",
    },
    {
      prop: "onSearch",
      type: "(value: string) => void",
      default: "-",
      description: "Callback fired when the search value changes",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "primary" | "glass"',
      default: '"light"',
      description: "The visual style variant of the navbar",
    },
    {
      prop: "size",
      type: '"sm" | "default" | "lg" | "xl"',
      default: '"default"',
      description: "The height and padding of the navbar",
    },
    {
      prop: "sticky",
      type: "boolean",
      default: "false",
      description: "When true, the navbar sticks to the top while scrolling",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation when the navbar mounts",
    },
    {
      prop: "hoverAnimation",
      type: '"none" | "jiggle" | "scale" | "bounce" | "shadowPulse" | "float3D" | "wobbleFollow"',
      default: '"none"',
      description: "GSAP-powered hover animation on the navbar",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Navbar
        </p>
        <p className="text-lg text-gray-600">
          A responsive navigation bar with links, search, actions, and mobile
          menu support.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="w-full max-w-3xl">
            <Navbar
              logo="EaseUi"
              links={defaultLinks}
              actions={
                <Button variant="primary" size="sm" hoverAnimation="none">
                  Sign Up
                </Button>
              }
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <ComponentDemo code={variantsCode}>
          <div className="w-full max-w-3xl space-y-4">
            <Navbar
              variant="light"
              logo="EaseUi"
              links={defaultLinks}
              actions={
                <Button variant="primary" size="sm" hoverAnimation="none">
                  Profile
                </Button>
              }
            />
            <Navbar
              variant="dark"
              logo="EaseUi"
              links={defaultLinks}
              actions={
                <Button variant="primary" size="sm" hoverAnimation="none">
                  Profile
                </Button>
              }
            />
            <Navbar
              variant="primary"
              logo="EaseUi"
              links={defaultLinks}
              actions={
                <Button variant="dark" size="sm" hoverAnimation="none">
                  Profile
                </Button>
              }
            />
            <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <Navbar
                variant="glass"
                logo="EaseUi"
                links={defaultLinks}
                actions={
                  <Button variant="outline" size="sm" hoverAnimation="none">
                    Profile
                  </Button>
                }
              />
            </div>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Search</h2>
        <ComponentDemo code={searchCode}>
          <div className="w-full max-w-3xl">
            <Navbar
              logo="EaseUi"
              showSearch
              searchPlaceholder="Search components"
              links={[
                { label: "Components", href: "#", active: true },
                { label: "About", href: "#" },
                { label: "Templates", href: "#" },
              ]}
              actions={
                <Button variant="primary" size="sm" hoverAnimation="none">
                  Get Started
                </Button>
              }
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Animated</h2>
        <ComponentDemo code={animatedCode}>
          <div className="w-full max-w-3xl">
            <Navbar
              logo="EaseUi"
              animation="slideUp"
              hoverAnimation="shadowPulse"
              links={defaultLinks}
              actions={
                <Button variant="primary" size="sm" hoverAnimation="none">
                  Profile
                </Button>
              }
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default NavbarPage;
