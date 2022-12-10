import { useState } from 'react';
import { Form, Input, Button, Header } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const formSubmit = e => {
    e.preventDefault();

    onSubmit(text);
    setText('');
  };

  return (
    <Header>
      <Form onSubmit={formSubmit}>
        <Button type="submit">
          <span>Search</span>
        </Button>

        <Input
          type="text"
          name="text"
          value={text}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
        />
      </Form>
    </Header>
  );
}
