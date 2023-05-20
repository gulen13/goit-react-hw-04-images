import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  Button,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ handleSubmit }) => {
  const [query, setquery] = useState('');

  const handleChange = event => {
    setquery(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!query) {
      alert('Please fill the search field !');
      return;
    }
    handleSubmit(query);
    setquery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
