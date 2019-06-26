import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import {
  capitalize,
  removeUnderscore,
  placeHolders,
  requiredKeys
} from './utils';
import { FormKeys, reqMethodType } from './Form';

interface FormInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  stateKey: FormKeys;
  type: reqMethodType;
  disable?: boolean;
}

const FormInput = ({
  handleChange,
  value,
  stateKey,
  type,
  disable
}: FormInputProps) => {
  const placeholder = placeHolders[stateKey];
  return (
    <FormGroup className='mb-1'>
      <Label className='mb-1 col-form-label-sm' for={stateKey}>
        {capitalize(removeUnderscore(stateKey))}
      </Label>
      <Input
        disabled={disable}
        bsSize='sm'
        required={
          type === 'POST'
            ? requiredKeys.includes(stateKey)
            : stateKey === 'id' || stateKey === 'project_name'
        }
        type='text'
        value={value}
        onChange={handleChange}
        name={stateKey}
        id={stateKey}
        placeholder={
          type === 'PUT' && !['id', 'project_name'].includes(stateKey)
            ? placeholder.replace('*', '')
            : placeholder
        }
      />
    </FormGroup>
  );
};

export default FormInput;
