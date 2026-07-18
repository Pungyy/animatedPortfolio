import Badge from "../../ui/Badge";

export default function HeroVisual() {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative w-full max-w-[520px]">

        <div className="aspect-[4/5] rounded-[42px] border border-neutral-200 bg-neutral-100 shadow-xl" />

        <div className="absolute -left-6 top-10">
          <Badge>React</Badge>
        </div>

        <div className="absolute -right-5 top-28">
          <Badge>Laravel</Badge>
        </div>

        <div className="absolute -left-4 bottom-24">
          <Badge>Supabase</Badge>
        </div>

        <div className="absolute right-0 bottom-10">
          <Badge>TypeScript</Badge>
        </div>

      </div>
    </div>
  );
}