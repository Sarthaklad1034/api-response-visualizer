import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/theme-context';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const { theme } = useTheme();

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className={`h-4 w-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
        }`} />
      </div>
      <Input
        type="text"
        value={searchValue}
        className={`pl-10 pr-10 w-full transition-all ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-700'
            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        }`}
        placeholder="Search in visualization..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchValue && (
        <Button
          variant="ghost"
          size="sm"
          className={`absolute inset-y-0 right-0 px-3 ${
            theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
              : 'hover:bg-transparent text-gray-400 hover:text-gray-600'
          }`}
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;