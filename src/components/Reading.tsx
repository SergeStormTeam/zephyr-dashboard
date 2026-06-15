import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

type ReadingProps = {
    title: string,
    value: number,
    label: string,
}

export const Reading = (props: ReadingProps) => {
    return (
        <div className="flex flex-wrap items-center rounded-lg border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted">
            <h2 className="w-full text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            The People of the Kingdom
            </h2>
        </div>
    )
}