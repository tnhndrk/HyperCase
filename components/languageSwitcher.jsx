'use client';

import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import Image from 'next/image'; import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'tr' ? 'en' : 'tr';
        i18n.changeLanguage(newLang);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                    <Image
                        alt='langFlag'
                        src={i18n.language === "tr" ? '/icons/tr.png' : '/icons/uk.png'}
                        width={64}
                        height={64}
                        className='w-5 h-5 object-contain'
                        priority
                    />
                    {i18n.language === 'tr' ? 'TR' : 'EN'}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-28">
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => toggleLanguage('tr')}>
                        <Image
                            alt='langFlag'
                            src='/icons/tr.png'
                            width={64}
                            height={64}
                            className='w-5 h-5 object-contain'
                            priority
                        />
                        <span>TR</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => toggleLanguage('en')}>
                        <Image
                            alt='langFlag'
                            src='/icons/uk.png'
                            width={64}
                            height={64}
                            className='w-5 h-5 object-contain'
                            priority
                        />
                        <span>EN</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
