import { updateChart } from './chart.js';
import Auth from '../services/auth.js';

const tbody = document.querySelector('tbody');

const form = document.querySelector('form');

const createHostModal = new bootstrap.Modal(
  document.getElementById('createHostModal'),
  {
    keyboard: false,
  }
);

function toogleSpinner(hostId) {
  const spinner = document.querySelector(`#host-${hostId} .spinner-border`);

  spinner.classList.toggle('invisible');
}

export function loadHostsTable(hosts) {
  for (const host of hosts) {
    createHostRow(host);
  }
}

export function createHostRow(host) {
  const view = `<tr id="host-${host.id}">
    <td>${host.name}</td>
    <td>${host.address}</td>
    <td class="align-middle" width="6rem">
      <div class="d-flex justify-content-between">
        <i
          class="fas fa-trash-alt me-2"
          onclick="removeHost(${host.id})"
        >
        </i>
        <i
          class="fas fa-stopwatch me-2"
          onclick="showLatency(${host.id})"
        >
        </i>
        <div class="spinner-border spinner-border-sm invisible" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

      </div>
    </td>
  </tr>`;

  tbody.insertAdjacentHTML('beforeend', view);
}

export function removeHost(id) {
  const tr = document.querySelector(`#host-${id}`);

  tr.remove();

  const configRequest = {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };

  fetch(`/hosts/${id}`, configRequest);
}

export function loadCreateHostSubmit() {
  form.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;

    const host = { name, address };

    createHostRow(host);

    const configRequest = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(host),
    };

    fetch('/hosts', configRequest);

    createHostModal.hide();
  };
}

export async function loadHosts() {
  try {
    const configRequest = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    };

    const hosts = await (await fetch('/hosts', configRequest)).json();

    loadHostsTable(hosts);
  } catch (error) {
    location.href = '/signin.html';
  }
}

export async function showLatency(hostId) {
  toogleSpinner(hostId);

  const url = `/hosts/${hostId}/times`;

  const configRequest = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };

  const { times } = await (await fetch(url, configRequest)).json();

  updateChart(times);

  toogleSpinner(hostId);
}