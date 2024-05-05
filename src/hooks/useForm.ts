import { useState } from 'react';

const useForm = initValue => {
  const [formValue, setFormValue] = useState(initValue);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setFormValue(formJson);
  }

  const handleChange = (e, name: string) => {
    const { value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return { formValue, handleSubmit, handleChange };
};

export default useForm;
