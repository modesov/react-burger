import { ChangeEvent, useState } from "react";

export function useForm<T = {[name: string]: string;}>(inputValues: T) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setValues({
      ...values,
      [name]: value
    });
  }

  return { values, handleChange, setValues };
}