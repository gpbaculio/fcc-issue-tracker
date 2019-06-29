import { FormProps } from '../Form/Form';

export const create: FormProps = {
  type: 'POST',
  route: '/api/issues/:project_name',
  fields: {
    project_name: '',
    issue_title: '',
    issue_text: '',
    created_by: '',
    assigned_to: '',
    status_text: ''
  },
  title: 'Submit Issue'
};
export const update: FormProps = {
  type: 'PUT',
  route: '/api/issues/:project_name',
  fields: {
    project_name: '',
    id: '',
    issue_title: '',
    issue_text: '',
    created_by: '',
    assigned_to: '',
    status_text: ''
  },
  title: 'Update Issue'
};
export const del: FormProps = {
  type: 'DELETE',
  route: '/api/issues/:project_name',
  fields: { project_name: '', id: '' },
  title: 'Delete Issue'
};
