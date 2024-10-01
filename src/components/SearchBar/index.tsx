import { SyntheticEvent, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import './index.css';

interface FormProps {
  handleSubmit: (
    event: SyntheticEvent<HTMLFormElement>,
    searchEntry: string,
  ) => void;
}

const SearchBar = ({ handleSubmit }: FormProps) => {
  const [searchEntry, setSearchEntry] = useState('');

  // update search text state
  const updateSearchInput = (value: string) => {
    setSearchEntry(value);
  };
  return (
    <form className='search-form' onSubmit={e => handleSubmit(e, searchEntry)}>
      <input
        type='text'
        name='search'
        placeholder='Search artist, title, medium, category...'
        className='search__bar'
        onChange={e => updateSearchInput(e.target.value)}
        value={searchEntry}
      />
      <button
        type='submit'
        className={`search-button ${searchEntry.trim() ? 'active' : null}`}
        disabled={!searchEntry.trim()}
      >
        <GoSearch />
      </button>
    </form>
  );
};

export default SearchBar;
