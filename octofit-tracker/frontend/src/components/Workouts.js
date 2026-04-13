import ResourcePage from './ResourcePage';

// For Codespaces, the Django API endpoint for workouts is:
// https://<CODESPACE_NAME>-8000.app.github.dev/api/workouts/
function Workouts() {
  return <ResourcePage resource="workouts" title="Workouts" />;
}

export default Workouts;
