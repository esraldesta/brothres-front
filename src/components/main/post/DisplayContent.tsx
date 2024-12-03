import { cn } from "@/lib/utils";
import parse from "html-react-parser";

interface DsiplayContentProps {
  content: string;
  line?: number;
}

export default function DisplayContent({ content, line }: DsiplayContentProps) {
  // Creating a DOM representation of the HTML string
  if (typeof content !== "string") {
    return;
  }
  const reactElement = parse(content);
  return (
    <section className={cn({ line: `line-clamp-${line}` }, "leading-7")}>
      {reactElement}
    </section>
  );
}
