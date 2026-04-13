import ResourcePage from './ResourcePage';

// For Codespaces, the Django API endpoint for leaderboard is:
// https://<CODESPACE_NAME>-8000.app.github.dev/api/leaderboard/
function Leaderboard() {
  return <ResourcePage resource="leaderboard" title="Leaderboard" />;
}

export default Leaderboard;
