import ResourcePage from './ResourcePage';

// For Codespaces, the Django API endpoint for activities is:
// https://<CODESPACE_NAME>-8000.app.github.dev/api/activities/
function Activities() {
  return <ResourcePage resource="activities" title="Activities" />;
}

export default Activities;
