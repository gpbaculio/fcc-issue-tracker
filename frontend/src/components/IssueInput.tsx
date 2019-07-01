import React from 'react';
import { Input, Button } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';
interface IssueInputProps {
  editing: string;
  keyVal: string;
  value: string;
  initVal: string;
  setVal: (val: string) => void;
  setEditing: (val: string) => void;
}
const IssueInput = ({
  editing,
  keyVal,
  value,
  setVal,
  setEditing,
  initVal
}: IssueInputProps) => {
  return (
    <React.Fragment>
      {editing === keyVal ? (
        <Input
          value={value}
          onChange={e => {
            setVal(e.target.value);
          }}
        />
      ) : (
        value || initVal
      )}
      {editing !== keyVal && (
        <Button
          className='d-inline-flex align-items-center'
          size='sm'
          color='link'
          onClick={() => {
            setVal(initVal);
            setEditing(keyVal);
          }}>
          <FaEdit />
        </Button>
      )}
    </React.Fragment>
  );
};

export default IssueInput;
