const slider = document.getElementById('tokenSlider');
const usedToken = document.getElementById('usedToken');
const remainingToken = document.getElementById('remainingToken');
const neededDM = document.getElementById('neededDM');
const toggleDark = document.getElementById('toggleDark');

slider.addEventListener('input', () => {
  let used = parseInt(slider.value);
  let remain = 200 - used;
  let dm = remain * 60;

  usedToken.textContent = used;
  remainingToken.textContent = remain;
  neededDM.textContent = dm;
});

toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleDark.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});