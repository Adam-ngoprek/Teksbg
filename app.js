const firebaseConfig = {
  apiKey: "AIzaSyDH26dzTA0ADkZT-G5zfHGXPXRvWGBIFQY",
  authDomain: "wadukgaring-c794e.firebaseapp.com",
  projectId: "wadukgaring-c794e",
  storageBucket: "wadukgaring-c794e.appspot.com",
  messagingSenderId: "1096178154249",
  appId: "1:1096178154249:web:4284cc11fbb04092bd71d8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById('form-komentar');
const daftarKomentar = document.getElementById('daftar-komentar');
const loading = document.getElementById('loading');
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const isi = document.getElementById('komentar').value.trim();

  if (nama && isi) {
    db.collection("komentar").add({
      nama: nama,
      isi: isi,
      waktu: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      form.reset();
      tampilkanKomentar();
    }).catch(err => {
      alert("Gagal kirim komentar: " + err.message);
    });
  }
});

function tampilkanKomentar() {
  daftarKomentar.innerHTML = "";
  loading.style.display = "flex";

  db.collection("komentar").orderBy("waktu", "desc").get()
    .then(snapshot => {
      loading.style.display = "none";
      if (snapshot.empty) {
        daftarKomentar.innerHTML = "<li>Tidak ada komentar.</li>";
        return;
      }
      snapshot.forEach(doc => {
        const data = doc.data();
        const waktu = data.waktu ? data.waktu.toDate().toLocaleString() : "Baru saja";
        const li = document.createElement("li");
        li.innerHTML = `<b>Dari:</b> ${data.nama}<br><b>Pesan:</b> ${data.isi}<br><b>Waktu:</b> ${waktu}`;
        daftarKomentar.appendChild(li);
      });
    })
    .catch(error => {
      loading.style.display = "none";
      daftarKomentar.innerHTML = `<li>Error memuat komentar: ${error.message}</li>`;
    });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  modeIcon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

modeToggle.addEventListener('click', toggleDarkMode);

window.addEventListener('DOMContentLoaded', () => {
  modeIcon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  tampilkanKomentar();
});
