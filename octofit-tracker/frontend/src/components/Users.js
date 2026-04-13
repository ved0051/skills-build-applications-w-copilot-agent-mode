import ResourcePage from './ResourcePage';

// For Codespaces, the Django API endpoint for users is:
// https://<CODESPACE_NAME>-8000.app.github.dev/api/users/
function Users() {
  return <ResourcePage resource="users" title="Users" />;
}

export default Users;
