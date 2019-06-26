import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

interface SearchAutoCompleteProps {
  data: {
    text: string;
    issues: [];
    hasSearched: boolean;
    loading: boolean;
  };
}

const SearchAutoComplete = ({
  data: { text, issues, hasSearched, loading }
}: SearchAutoCompleteProps) => {
  if (!text) return null;
  return (
    <div id='myInputautocomplete-list' className='autocomplete-items'>
      {hasSearched && !issues.length && <div>Project does not exist</div>}
      {issues.map(({ project_name }: { project_name: string }, i) => {
        const projectText = project_name.replace(
          new RegExp(text, 'g'),
          `<strong>${text}</strong>`
        );
        return (
          <Link
            key={i}
            to={`/${project_name}`}
            dangerouslySetInnerHTML={{ __html: `<div>${projectText}</div>` }}
          />
        );
      })}
      {loading && (
        <div className='mx-auto d-flex justify-content-center'>
          <Spinner color='info' className='mr-2' /> Loading...
        </div>
      )}
    </div>
  );
};

export default SearchAutoComplete;
