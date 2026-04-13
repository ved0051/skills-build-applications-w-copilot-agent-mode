import ResourcePage from './ResourcePage';

// For Codespaces, the Django API endpoint for teams is:
// https://<CODESPACE_NAME>-8000.app.github.dev/api/teams/
function Teams() {
  return <ResourcePage resource="teams" title="Teams" />;
}

export default Teams;
