"use client"
import { Gamepad2 } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

type InfoProps = {
    title: string;
    description: string;
};

export function Info({ title, description }: InfoProps) {
    return (
        <Alert className="my-2" variant="default">
            <Gamepad2 color="salmon" className="h-6 w-6" />
            <AlertTitle>{title ? title : 'Title'}</AlertTitle>
            <AlertDescription>
                {description ? description : "Description"}
            </AlertDescription>
        </Alert>
    )
}
