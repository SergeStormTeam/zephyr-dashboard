type GraphProps = {
    id: string
}

export const GraphGradient = (props: GraphProps) => {
    return (
        <linearGradient id={`fill-${props.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop
                offset="5%"
                stopColor={`var(--color-${props.id})`}
                stopOpacity={1}
            />
            <stop
                offset="40%"
                stopColor={`var(--color-${props.id})`}
                stopOpacity={0}
            />
        </linearGradient>
    )
}