import React, { Component } from 'react';
import { Form, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import SearchAutoComplete from './SearchAutoComplete';

interface SearchIssuesProps {}
class SearchIssues extends Component<SearchIssuesProps> {
  private initialFields: number | null;
  constructor(props: SearchIssuesProps) {
    super(props);
    this.state = {
      text: '',
      issues: [],
      loading: false
    };
    this.initialFields = null;
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    clearTimeout(this.initialFields as number);
    this.initialFields = window.setTimeout(() => {}, 1000);
  };
  render() {
    return (
      <div className='search-container w-100 p-3 d-flex justify-content-center'>
        <Form inline className='d-flex w-50 justify-content-around'>
          <FormGroup className='flex-grow-1'>
            <Label for='searchText' className='mr-3 col-form-label-lg'>
              Search issues
            </Label>
            <div className='autocomplete flex-grow-1 mr-3'>
              <Input
                autoComplete='off'
                onChange={this.handleChange}
                className='w-100'
                type='text'
                name='text'
                id='searchText'
                placeholder='Project name'
              />
              <SearchAutoComplete />
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SearchIssues;
