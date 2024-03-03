import React, { useState } from 'react';

function ItemForm() {
  const [item, setItem] = useState({
    name: '',
    description: '',
    price: 0,
    tax: 0
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Item fetched:', data);
      } else {
        console.error('Failed to fetch item');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="number"
        name="tax"
        value={item.tax}
        onChange={handleChange}
        placeholder="Tax"
      />
      <button type="submit">Fetch Item</button>
    </form>
  );
}

export default ItemForm;