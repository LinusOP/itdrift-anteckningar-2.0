import * as Accordion from "@radix-ui/react-accordion";
import type { CollectionEntry } from "astro:content";
import { ChevronDown } from "lucide-react";
import React from "react";
import { courseCodes } from "../config";

const NavMenu = ({ notes }: { notes: CollectionEntry<"notes">[] }) => {
  const course = location.pathname.split("/")[2];

  const notesByCourse = Object.entries(courseCodes).map(
    ([courseCode, courseName]) => ({
      name: courseName,
      code: courseCode,
      notes: notes
        .filter((note) => note.slug.split("/")[0] === courseCode)
        .sort((a, b) => a.data.order - b.data.order),
    }),
  );

  return (
    <Accordion.Root
      type="multiple"
      className="flex flex-col gap-3"
      defaultValue={[course]}
    >
      {notesByCourse.map((course) => (
        <AccordionItem value={course.code} key={course.code}>
          <AccordionTrigger>{course.name}</AccordionTrigger>
          <AccordionContent>
            {course.notes.length > 0 ? (
              course.notes.map((note) => (
                <a href={`/notes/${note.slug}`} key={note.slug}>
                  {note.data.title}
                </a>
              ))
            ) : (
              <span>Här finns inga anteckningar än</span>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Item
    ref={forwardedRef}
    {...props}
    className="group overflow-hidden rounded-lg bg-neutral-200 p-2 focus-within:relative focus-within:z-10"
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Accordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Header>
    <Accordion.Trigger
      ref={forwardedRef}
      {...props}
      className="flex w-full items-center gap-2 py-2 text-left text-lg leading-none md:text-xl"
    >
      <ChevronDown
        className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
        size={16}
      />
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof Accordion.Content>,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, ...props }, forwardedRef) => (
  <Accordion.Content
    ref={forwardedRef}
    {...props}
    className="w-[var(--radix-accordion-content-width)] overflow-hidden text-base data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown md:text-lg"
  >
    <div className="ml-6 flex flex-col gap-2">{children}</div>
  </Accordion.Content>
));

export default NavMenu;
