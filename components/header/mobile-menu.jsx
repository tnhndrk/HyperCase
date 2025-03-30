import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { routes } from '@/constans'
import Link from 'next/link'

const MobileMenu = () => {
    return (
        <div className='lg:hidden flex items-center mr-2'>
            <Sheet>
                <SheetTrigger>
                    <MenuIcon />
                </SheetTrigger>

                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle className='text-center'>Welcome Printfy</SheetTitle>
                    </SheetHeader>
                    <div className='text-center my-4 space-x-8'>
                        {
                            routes.map((item) => {
                                return (
                                    <Link href={item?.href} key={item?.id}>
                                        {
                                            item?.title
                                        }
                                    </Link>

                                )
                            })
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileMenu