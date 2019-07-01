import React, { Component } from 'react';
import { Form, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import SearchAutoComplete from './SearchAutoComplete';

interface SearchProjectProps {}
interface SearchProjectState {
  [key: string]: string | boolean | [];
  text: string;
  loading: boolean;
  issues: [];
  message: string;
  error: boolean;
  hasSearched: boolean;
}
class SearchIssues extends Component<SearchProjectProps, SearchProjectState> {
  public timeOut: NodeJS.Timeout | null;
  constructor(props: SearchProjectProps) {
    super(props);
    this.state = {
      text: '',
      issues: [],
      loading: false,
      message: '',
      error: false,
      hasSearched: false
    };
    this.timeOut = null;
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState(
      {
        [name]: value
      },
      async () => {
        if (this.state.text) {
          const { text: project_name } = this.state;
          try {
            this.setState({ loading: true });
            const {
              data: { issues }
            } = await axios.get('/api/projects', { params: { project_name } });
            this.setState({ loading: false, issues, hasSearched: true });
          } catch (error) {
            this.setState({
              message: error.response.data,
              loading: false,
              error: true
            });
          }
        }
      }
    );
  };
  render() {
    const { loading, text, issues, hasSearched } = this.state;
    return (
      <div className='search-container w-100 p-3 d-flex justify-content-center'>
        <Form inline className='d-flex w-50 justify-content-around'>
          <FormGroup className='flex-grow-1'>
            <Label for='searchText' className='mr-3 col-form-label-lg'>
              Search Project
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
              <SearchAutoComplete
                data={{ loading, text, issues, hasSearched }}
              />
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SearchIssues;
