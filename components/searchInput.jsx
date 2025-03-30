import React from 'react'
import CustomInput from './customInput'
import { SearchIcon } from 'lucide-react'

const SearchInput = ({ onChange, value, placeholder }) => {
    return (
        <CustomInput
            type="text"
            placeholder={placeholder}
            icon={<SearchIcon className='text-gray-400' />}
            className="w-[50%]"
            value={value}
            onChange={onChange}
        />
    )
}

export default SearchInput