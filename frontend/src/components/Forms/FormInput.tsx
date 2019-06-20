import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {
  capitalize,
  removeUnderscore,
  placeHolders,
  requiredKeys
} from './utils';
import { FormKeys } from './Form';

interface FormInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  stateKey: FormKeys;
}

const FormInput = ({ handleChange, value, stateKey }: FormInputProps) => {
  return (
    <FormGroup className='mb-1'>
      <Label className='mb-1 col-form-label-sm' for={stateKey}>
        {capitalize(removeUnderscore(stateKey))}
      </Label>
      <Input
        bsSize='sm'
        required={requiredKeys.includes(stateKey)}
        type='text'
        value={value}
        onChange={handleChange}
        name={stateKey}
        id={stateKey}
        placeholder={placeHolders[stateKey]}
      />
    </FormGroup>
  );
};

export default FormInput;
