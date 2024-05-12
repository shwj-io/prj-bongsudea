import { useEffect, useState } from 'react';

const useForm = ({ initValue, onSubmit, validate }) => {
  const [value, setValue] = useState(initValue);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setErrors(validate(value));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target;
    setValue(prevValue => ({ ...prevValue, [name]: value }));
  };

  useEffect(() => {
    if (isLoading) {
      if (Object.keys(errors).length === 0) {
        onSubmit(value);
      }
      setIsLoading(false);
    }
  }, [isLoading, errors]);

  return { value, errors, isLoading, handleSubmit, handleChange };
};

export default useForm;
