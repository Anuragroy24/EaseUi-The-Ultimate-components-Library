import { Carousel } from "@/components/Carousel/Carousel";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const sampleSlides = [
  {
    id: 1,
    title: "Build Faster",
    description: "Create beautiful UIs with ready-made EaseUi components.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1015",
  },
  {
    id: 2,
    title: "Animate Smoothly",
    description: "GSAP-powered animations for polished interactions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1015",
  },
  {
    id: 3,
    title: "Ship with Confidence",
    description: "Consistent design tokens and accessible components.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1015",
  },
];

const CarouselPage = () => {
  const basicUsageCode = `
import { Carousel } from "@/components/Carousel/Carousel"

const slides = [
  {
    id: 1,
    title: "Build Faster",
    description: "Create beautiful UIs with ready-made EaseUi components.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1015",
  },
  {
    id: 2,
    title: "Animate Smoothly",
    description: "GSAP-powered animations for polished interactions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1015",
  },
  {
    id: 3,
    title: "Ship with Confidence",
    description: "Consistent design tokens and accessible components.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1015",
  },
]

<Carousel items={slides} showArrows showDots />`;

  const variantsCode = `
import { Carousel } from "@/components/Carousel/Carousel"

<Carousel items={slides} variant="light" />
<Carousel items={slides} variant="dark" />
<Carousel items={slides} variant="primary" />`;

  const autoplayCode = `
import { Carousel } from "@/components/Carousel/Carousel"

<Carousel
  items={slides}
  autoplay
  interval={2500}
  slideAnimation="fade"
  animation="scaleIn"
/>`;

  const customContentCode = `
import { Carousel } from "@/components/Carousel/Carousel"
import { Button } from "@/components/Button/Button"

<Carousel
  items={[
    {
      id: 1,
      content: (
        <div className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Welcome to EaseUi</h3>
          <p className="text-gray-600">A modern React component library.</p>
          <Button variant="primary" size="sm" hoverAnimation="none">Get Started</Button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Fully Customizable</h3>
          <p className="text-gray-600">Mix variants, sizes, and animations easily.</p>
        </div>
      ),
    },
  ]}
  size="lg"
/>`;

  const propsData = [
    {
      prop: "items",
      type: "CarouselItem[]",
      default: "-",
      description:
        "Array of slides with title, description, image, or custom content",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "primary"',
      default: '"light"',
      description: "The visual style variant of the carousel",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg" | "full"',
      default: '"md"',
      description: "The maximum width of the carousel",
    },
    {
      prop: "autoplay",
      type: "boolean",
      default: "false",
      description: "Automatically advances slides on an interval",
    },
    {
      prop: "interval",
      type: "number",
      default: "3000",
      description: "Autoplay delay in milliseconds",
    },
    {
      prop: "showArrows",
      type: "boolean",
      default: "true",
      description: "Shows previous and next navigation arrows",
    },
    {
      prop: "showDots",
      type: "boolean",
      default: "true",
      description: "Shows dot indicators for each slide",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "true",
      description: "When true, navigation wraps from last to first slide",
    },
    {
      prop: "slideAnimation",
      type: '"slide" | "fade"',
      default: '"slide"',
      description: "Transition animation between slides",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation when the carousel mounts",
    },
    {
      prop: "onSlideChange",
      type: "(index: number) => void",
      default: "-",
      description: "Callback fired when the active slide changes",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Carousel
        </p>
        <p className="text-lg text-gray-600">
          A responsive image and content carousel with arrows, dots, autoplay,
          and GSAP animations.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="w-full flex justify-center">
            <Carousel items={sampleSlides} showArrows showDots />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <ComponentDemo code={variantsCode}>
          <div className="w-full space-y-6">
            <Carousel items={sampleSlides} variant="light" />
            <Carousel items={sampleSlides} variant="dark" />
            <Carousel items={sampleSlides} variant="primary" />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Autoplay</h2>
        <ComponentDemo code={autoplayCode}>
          <div className="w-full flex justify-center">
            <Carousel
              items={sampleSlides}
              autoplay
              interval={2500}
              slideAnimation="fade"
              animation="scaleIn"
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Content</h2>
        <ComponentDemo code={customContentCode}>
          <div className="w-full flex justify-center">
            <Carousel
              size="lg"
              items={[
                {
                  id: 1,
                  content: (
                    <div className="p-8 text-center space-y-4">
                      <h3 className="text-2xl font-bold">Welcome to EaseUi</h3>
                      <p style={{ color: "var(--preview-text)" }}>
                        A modern React component library.
                      </p>
                    </div>
                  ),
                },
                {
                  id: 2,
                  content: (
                    <div className="p-8 text-center space-y-4">
                      <h3 className="text-2xl font-bold">
                        Fully Customizable
                      </h3>
                      <p style={{ color: "var(--preview-text)" }}>
                        Mix variants, sizes, and animations easily.
                      </p>
                    </div>
                  ),
                },
              ]}
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

export default CarouselPage;
