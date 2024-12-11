function addAlert(message, type = "info", timeout = 5000) {
  const alertContainer = document.getElementById("main-alert");

  // Buat elemen div untuk alert baru
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert-base"); // Menggunakan class statis dari CSS

  // Tambahkan class berdasarkan tipe alert
  switch (type) {
    case "success":
      alertDiv.classList.add("alert-success");
      break;
    case "error":
      alertDiv.classList.add("alert-error");
      break;
    case "warning":
      alertDiv.classList.add("alert-warning");
      break;
    case "info":
    default:
      alertDiv.classList.add("alert-info");
      break;
  }

  // Buat elemen span untuk teks
  const alertText = document.createElement("span");
  alertText.classList.add("alert-text"); // Class untuk teks
  alertText.innerText = message;

  // Tambahkan teks ke alert
  alertDiv.appendChild(alertText);

  // Buat progress bar div
  const progressBar = document.createElement("div");
  progressBar.classList.add("alert-progress");
  progressBar.style.width = "100%"; // Mulai dari penuh (100%)

  // Tambahkan alert ke container
  alertContainer.appendChild(alertDiv);

  // Tampilkan alert dengan animasi fade-in
  setTimeout(() => {
    alertDiv.classList.add("alert-show"); // Animasi muncul
  }, 10); // Timeout kecil agar transisi terlihat

  // Jika timeout = 0, jangan jalankan auto-close
  if (timeout === 0) {
    // tambahkan span close
    const span = document.createElement("span");
    span.classList.add("alert-close");
    alertDiv.appendChild(span);
    span.onclick = function () {
      closeAlert(alertDiv);
    };
    return alertDiv; // Kembalikan elemen agar bisa ditutup manual
  }

  // Tambahkan progress bar ke dalam alert jika timeout > 0
  alertDiv.appendChild(progressBar);

  // Hitung interval progress bar
  let interval = 10; // Setiap 10ms update
  let width = 100;
  const progressInterval = setInterval(() => {
    width -= 100 / (timeout / interval); // Kurangi lebar sesuai waktu
    if (width <= 0) {
      clearInterval(progressInterval);
      // Animasi menghilang
      alertDiv.classList.remove("alert-show");
      alertDiv.classList.add("alert-hide");
      setTimeout(() => {
        alertDiv.remove(); // Hapus alert setelah animasi keluar selesai
      }, 300); // Durasi animasi keluar sama dengan CSS (300ms)
    }
    progressBar.style.width = width + "%"; // Update lebar progress bar
  }, interval);

  // Auto hapus alert setelah waktu timeout (default 5 detik)
  setTimeout(() => {
    clearInterval(progressInterval); // Pastikan interval dihentikan
    // Animasi menghilang
    alertDiv.classList.remove("alert-show");
    alertDiv.classList.add("alert-hide");
    setTimeout(() => {
      alertDiv.remove(); // Hapus alert setelah animasi keluar selesai
    }, 300); // Durasi animasi keluar sama dengan CSS (300ms)
  }, timeout);

  return alertDiv; // Kembalikan elemen alert yang baru dibuat
}

// Fungsi untuk trigger close alert
function closeAlert(el) {
  if (!el) {
    return;
  }
  el.classList.remove("alert-show"); // Hapus class show
  el.classList.add("alert-hide"); // Tambah class hide
  setTimeout(() => {
    el.remove(); // Hapus elemen dari DOM setelah animasi selesai
  }, 300); // Delay 300ms untuk animasi keluar
}
// Fungsi untuk auto-close alert
function autoCloseAlerts() {
  // Cari semua elemen dengan class 'alert-auto-close'
  const alerts = document.querySelectorAll(".alert-auto-close");

  // Loop melalui setiap elemen alert
  alerts.forEach((alert) => {
    // Cek apakah elemen memiliki atribut data-time
    let closeTime = alert.getAttribute("data-time");

    // Jika data-time tidak ada, gunakan default 5000ms (5 detik)
    if (!closeTime) {
      closeTime = 5000;
    }

    // Ubah menjadi angka (milidetik)
    closeTime = parseInt(closeTime, 10);

    // Tambahkan animasi menghilang setelah durasi yang diatur
    setTimeout(() => {
      alert.style.transition = "opacity 0.5s ease, transform 0.5s ease"; // Transisi untuk animasi smooth
      alert.style.opacity = "0"; // Ubah opacity menjadi 0
      alert.style.transform = "scale(0.9)"; // Beri efek mengecil sebelum hilang

      // Hapus elemen dari DOM setelah animasi selesai (500ms delay untuk transisi smooth)
      setTimeout(() => {
        alert.remove();
      }, 500); // Delay 500ms untuk menghapus setelah transisi
    }, closeTime); // Durasi waktu sebelum alert mulai menghilang
  });
}

// Panggil fungsi auto-close ketika DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
  const alertContainer = document.createElement("div");
  alertContainer.id = "main-alert";
  document.body.appendChild(alertContainer);
  autoCloseAlerts();
});
