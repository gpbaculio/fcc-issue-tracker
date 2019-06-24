import React, { Component } from 'react';
import { Form, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import SearchAutoComplete from './SearchAutoComplete';
import Loader from './Loader';

interface SearchIssuesProps {}
interface SearchIssuesState {
  [key: string]: string | boolean | [];
  text: string;
  loading: boolean;
  issues: [];
  message: string;
  error: boolean;
}
class SearchIssues extends Component<SearchIssuesProps, SearchIssuesState> {
  private initialFields: number | null;
  constructor(props: SearchIssuesProps) {
    super(props);
    this.state = {
      text: '',
      issues: [],
      loading: false,
      message: '',
      error: false
    };
    this.initialFields = null;
  }
  searchProject = async () => {
    console.log('search fire!');
    const { text: project_name } = this.state;
    try {
      this.setState({ loading: true });
      const { data } = await axios({
        method: 'GET',
        url: 'api/projects',
        data: {
          params: project_name
        }
      });
      console.log('data ', data);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        message: error.response.data,
        loading: false,
        error: true
      });
    }
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    clearTimeout(this.initialFields as number);
    this.initialFields = window.setTimeout(() => {
      this.searchProject();
    }, 1000);
  };
  render() {
    const { loading } = this.state;
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
              {loading ? <Loader /> : <SearchAutoComplete />}
            </div>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SearchIssues;
