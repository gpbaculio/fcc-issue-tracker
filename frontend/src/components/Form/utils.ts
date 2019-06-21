export const placeHolders = {
  id: '*Id',
  issue_title: '*Title',
  issue_text: '*Text',
  created_by: '*Created by',
  assigned_to: '(opt)Assigned to',
  status_text: '(opt)Status text',
  project_name: '*Project name'
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const removeUnderscore = (str: string) => str.replace('_', ' ');

export const requiredKeys = [
  'id',
  'project_name',
  'issue_text',
  'issue_text',
  'created_by'
];
