const DEFAULT_ACTIVITY = [
  { type: 'Deposit', amount: 250, detail: 'Deposit note consumed by private-bank.demo', time: '2 min ago' },
  { type: 'Deposit', amount: 500, detail: 'Deposit note consumed by private-bank.demo', time: '18 min ago' },
  { type: 'Withdraw', amount: 100, detail: 'Withdrawal request produced an output note', time: '41 min ago' },
  { type: 'Deposit', amount: 600, detail: 'Deposit note consumed by private-bank.demo', time: '1 hr ago' }
];

let mode = 'deposit';
let balance = 1250;
let deposits = 3;
let withdrawals = 1;
let activity = [...DEFAULT_ACTIVITY];

const balanceMetric = document.querySelector('#balanceMetric');
const depositMetric = document.querySelector('#depositMetric');
const withdrawMetric = document.querySelector('#withdrawMetric');
const activityList = document.querySelector('#activityList');
const bankForm = document.querySelector('#bankForm');
const amountInput = document.querySelector('#amount');
const recipientInput = document.querySelector('#recipient');
const submitButton = bankForm.querySelector('button[type="submit"]');

function renderMetrics() {
  balanceMetric.textContent = balance.toLocaleString('en-US');
  depositMetric.textContent = deposits;
  withdrawMetric.textContent = withdrawals;
}

function renderActivity() {
  activityList.innerHTML = activity.map((item) => {
    const icon = item.type === 'Deposit' ? '↓' : '↑';
    const sign = item.type === 'Deposit' ? '+' : '-';
    return `
      <div class="activity">
        <div class="activity-icon">${icon}</div>
        <div>
          <strong>${item.type} · ${sign}${Number(item.amount).toLocaleString('en-US')} units</strong>
          <small>${item.detail}</small>
        </div>
        <time>${item.time}</time>
      </div>`;
  }).join('');
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === mode);
  });
  submitButton.textContent = mode === 'deposit' ? 'Generate deposit note' : 'Generate withdrawal request';
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => setMode(tab.dataset.tab));
});

bankForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = Number(amountInput.value);
  const recipient = recipientInput.value.trim() || 'private-bank.demo';
  if (!Number.isFinite(amount) || amount <= 0) return;

  if (mode === 'withdraw' && amount > balance) {
    submitButton.textContent = 'Insufficient demo balance';
    setTimeout(() => setMode('withdraw'), 1200);
    return;
  }

  if (mode === 'deposit') {
    balance += amount;
    deposits += 1;
    activity.unshift({
      type: 'Deposit',
      amount,
      detail: `Deposit note prepared for ${recipient}`,
      time: 'just now'
    });
  } else {
    balance -= amount;
    withdrawals += 1;
    activity.unshift({
      type: 'Withdraw',
      amount,
      detail: `Withdrawal request created for ${recipient}`,
      time: 'just now'
    });
  }

  renderMetrics();
  renderActivity();
  amountInput.value = '100';
});

document.querySelector('#clearActivity').addEventListener('click', () => {
  mode = 'deposit';
  balance = 1250;
  deposits = 3;
  withdrawals = 1;
  activity = [...DEFAULT_ACTIVITY];
  setMode('deposit');
  renderMetrics();
  renderActivity();
});

renderMetrics();
renderActivity();
