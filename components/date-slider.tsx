import { cn, getMaxSlider } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof Slider>

export function DateSlider({ className, ...props }: SliderProps) {
    return (
        <Slider
            defaultValue={[0]}
            min={0}
            max={getMaxSlider()}
            step={1}
            className={cn("w-full", className)}
            {...props}
        />
    )
}
