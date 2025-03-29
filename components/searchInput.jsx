import React from 'react'
import CustomInput from './customInput'
import { SearchIcon } from 'lucide-react'

const SearchInput = ({ onChange, value }) => {
    return (
        <CustomInput
            type="text"
            placeholder="Ara..."
            icon={<SearchIcon className='text-gray-400' />}
            className="w-[50%]"
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchInput