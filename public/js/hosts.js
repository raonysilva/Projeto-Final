import { showChart } from './lib/chart.js';
import {
  loadHosts,
  removeHost,
  showLatency,
  loadCreateHostSubmit,
} from './lib/hosts.js';
import Auth from './services/auth.js';

if (Auth.isAuthenticated()) {
  loadCreateHostSubmit();

  loadHosts();

  showChart();
}

window.removeHost = removeHost;
window.showLatency = showLatency;