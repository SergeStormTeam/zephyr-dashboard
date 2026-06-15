import {Area} from "recharts"


type AreaLineProps = {
    id: string
}

export const AreaLine = (props: AreaLineProps) => {
    return (
        <Area
            yAxisId={`${props.id}`}
            dataKey={`${props.id}`}
            type="natural"
            fill={`url(#fill-${props.id})`}
            stroke={`var(--color-${props.id})`}
        />
    )

}