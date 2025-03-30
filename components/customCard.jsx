import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const CustomCard = (props) => {
    const { cardTitle,
        cardDesc,
        cardContent,
        cardFooter,
    } = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDesc}</CardDescription>
            </CardHeader>
            <CardContent>
                {cardContent}
            </CardContent>
            <CardFooter>
                {cardFooter}
            </CardFooter>
        </Card>

    )
}

export default CustomCard

