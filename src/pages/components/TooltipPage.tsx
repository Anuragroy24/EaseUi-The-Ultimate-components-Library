import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage = () => {
  const positionsCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

<Tooltip content="Tooltip on top" position="top">
  <Button variant="primary" size="sm">Top</Button>
</Tooltip>

<Tooltip content="Tooltip on bottom" position="bottom">
  <Button variant="primary" size="sm">Bottom</Button>
</Tooltip>

<Tooltip content="Tooltip on left" position="left">
  <Button variant="primary" size="sm">Left</Button>
</Tooltip>

<Tooltip content="Tooltip on right" position="right">
  <Button variant="primary" size="sm">Right</Button>
</Tooltip>`;

  const variantsCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

<Tooltip content="Dark tooltip" variant="dark">
  <Button variant="dark" size="sm">Dark</Button>
</Tooltip>

<Tooltip content="Light tooltip" variant="light">
  <Button variant="outline" size="sm">Light</Button>
</Tooltip>

<Tooltip content="Primary tooltip" variant="primary">
  <Button variant="primary" size="sm">Primary</Button>
</Tooltip>

<Tooltip content="Outline tooltip" variant="outline">
  <Button variant="ghost" size="sm">Outline</Button>
</Tooltip>`;

  const sizesCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

<Tooltip content="Small tooltip" size="sm">
  <Button variant="secondary" size="sm">Small</Button>
</Tooltip>

<Tooltip content="Medium tooltip" size="md">
  <Button variant="secondary" size="sm">Medium</Button>
</Tooltip>

<Tooltip content="Large tooltip" size="lg">
  <Button variant="secondary" size="sm">Large</Button>
</Tooltip>`;

  const delayCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

<Tooltip content="Appears instantly" delay={0}>
  <Button variant="primary" size="sm">No delay</Button>
</Tooltip>

<Tooltip content="Appears after 500ms" delay={500}>
  <Button variant="primary" size="sm">500ms delay</Button>
</Tooltip>

<Tooltip content="Click me to toggle" trigger="click" delay={0}>
  <Button variant="dark" size="sm">Click trigger</Button>
</Tooltip>`;

  const animationCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

<Tooltip content="Fades in" animation="fadeIn">
  <Button variant="primary" size="sm">Fade In</Button>
</Tooltip>

<Tooltip content="Scales in" animation="scaleIn">
  <Button variant="primary" size="sm">Scale In</Button>
</Tooltip>

<Tooltip content="Slides up" animation="slideUp">
  <Button variant="primary" size="sm">Slide Up</Button>
</Tooltip>

<Tooltip content="Bounces in" animation="bounceIn">
  <Button variant="primary" size="sm">Bounce In</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "-",
      description: "The text or element shown inside the tooltip",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Where the tooltip appears relative to the trigger",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "primary" | "outline"',
      default: '"dark"',
      description: "The visual style variant of the tooltip",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the tooltip content",
    },
    {
      prop: "delay",
      type: "number",
      default: "200",
      description: "Delay in milliseconds before the tooltip appears",
    },
    {
      prop: "trigger",
      type: '"hover" | "click"',
      default: '"hover"',
      description: "How the tooltip is opened — hover or click",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation when the tooltip appears",
    },
    {
      prop: "showArrow",
      type: "boolean",
      default: "true",
      description: "Whether to show the arrow pointing at the trigger",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "When true, the tooltip will not appear",
    },
    {
      prop: "children",
      type: "React.ReactNode",
      default: "-",
      description: "The trigger element the tooltip is attached to",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Tooltip
        </p>
        <p className="text-lg text-gray-600">
          Displays a short message when a user hovers over or clicks an element.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={positionsCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center px-16">
            <Tooltip content="Tooltip on top" position="top">
              <Button variant="primary" size="sm">
                Top
              </Button>
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
              <Button variant="primary" size="sm">
                Bottom
              </Button>
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
              <Button variant="primary" size="sm">
                Left
              </Button>
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
              <Button variant="primary" size="sm">
                Right
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <ComponentDemo code={variantsCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Tooltip content="Dark tooltip" variant="dark">
              <Button variant="dark" size="sm">
                Dark
              </Button>
            </Tooltip>
            <Tooltip content="Light tooltip" variant="light">
              <Button variant="outline" size="sm">
                Light
              </Button>
            </Tooltip>
            <Tooltip content="Primary tooltip" variant="primary">
              <Button variant="primary" size="sm">
                Primary
              </Button>
            </Tooltip>
            <Tooltip content="Outline tooltip" variant="outline">
              <Button variant="ghost" size="sm">
                Outline
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Sizes</h2>
        <ComponentDemo code={sizesCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Tooltip content="Small tooltip" size="sm">
              <Button variant="secondary" size="sm">
                Small
              </Button>
            </Tooltip>
            <Tooltip content="Medium tooltip" size="md">
              <Button variant="secondary" size="sm">
                Medium
              </Button>
            </Tooltip>
            <Tooltip content="Large tooltip" size="lg">
              <Button variant="secondary" size="sm">
                Large
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Delay and Trigger</h2>
        <ComponentDemo code={delayCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Tooltip content="Appears instantly" delay={0}>
              <Button variant="primary" size="sm">
                No delay
              </Button>
            </Tooltip>
            <Tooltip content="Appears after 500ms" delay={500}>
              <Button variant="primary" size="sm">
                500ms delay
              </Button>
            </Tooltip>
            <Tooltip content="Click me to toggle" trigger="click" delay={0}>
              <Button variant="dark" size="sm">
                Click trigger
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Animations</h2>
        <ComponentDemo code={animationCode}>
          <div className="flex gap-4 flex-wrap items-center justify-center">
            <Tooltip content="Fades in" animation="fadeIn">
              <Button variant="primary" size="sm">
                Fade In
              </Button>
            </Tooltip>
            <Tooltip content="Scales in" animation="scaleIn">
              <Button variant="primary" size="sm">
                Scale In
              </Button>
            </Tooltip>
            <Tooltip content="Slides up" animation="slideUp">
              <Button variant="primary" size="sm">
                Slide Up
              </Button>
            </Tooltip>
            <Tooltip content="Bounces in" animation="bounceIn">
              <Button variant="primary" size="sm">
                Bounce In
              </Button>
            </Tooltip>
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

export default TooltipPage;
