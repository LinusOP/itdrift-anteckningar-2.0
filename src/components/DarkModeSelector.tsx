import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Laptop, Moon, Sun } from "lucide-react";

const DarkModeSelector = () => {
  const darkMode = localStorage.getItem("darkMode");

  return (
    <ToggleGroup.Root
      type="single"
      orientation="vertical"
      className="flex flex-col items-center justify-center"
      defaultValue={darkMode ?? "device"}
      onValueChange={(val) => {
        const body = document.querySelector("body");
        if (val === "device") {
          localStorage.removeItem("darkMode");
          if (body)
            body.dataset.darkMode = String(
              window.matchMedia("(prefers-color-scheme: dark)").matches,
            );
        } else {
          localStorage.setItem("darkMode", val);
          if (body) body.dataset.darkMode = val;
        }
      }}
    >
      <ToggleGroup.Item
        value="false"
        className="inline-flex aspect-square w-full items-center justify-center rounded-t-lg border-b border-neutral-300 bg-neutral-200 shadow-black data-[state=on]:bg-neutral-400"
      >
        <Sun />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="true"
        className="inline-flex aspect-square w-full items-center justify-center border-b border-neutral-300 bg-neutral-200 shadow-black data-[state=on]:bg-neutral-400"
      >
        <Moon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="device"
        className="inline-flex aspect-square w-full items-center justify-center rounded-b-lg bg-neutral-200 data-[state=on]:bg-neutral-400"
      >
        <Laptop />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default DarkModeSelector;
