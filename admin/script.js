const quill = new Quill('#isi', {
    theme: 'snow'
  });

  document.getElementById("release-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;

    // Ambil semua data dari SheetDB
    fetch("https://sheetdb.io/api/v1/jtll0a7sdmup2") //jangan lupa ganti ID Sheet DB !!!
     .then(response => response.json())
     .then(dataSheet => {
      // Ambil ID terakhir (misalnya 'BR-005'), lalu ambil bagian angkanya
      let lastNumber = 0;
      for (let row of dataSheet) {
        if (row.id) {
          const match = row.id.match(/BR-(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
        if (num > lastNumber) lastNumber = num;
        }
        }
      }


      // Tambahkan 1 dan format jadi 3 digit
      const newId = 'BR-' + String(lastNumber + 1).padStart(3, '0');

      // Data yang akan dikirim
      const data = {
        data: {
          id: newId,
          judul: form.judul.value,
          tanggal: form.tanggal.value,
          isi: form.isi.value,
          penulis: form.penulis.value,
          thumbnail: form.thumbnail.value||"https://raw.githubusercontent.com/up2kntb/up2kntb/refs/heads/main/img/thumbnail.jpg",
          gambar_1: form.gambar_1.value,
          gambar_2: form.gambar_2.value,
          gambar_3: form.gambar_3.value,
          gambar_4: form.gambar_4.value
        }
      };

      // Kirim ke SheetDB
      // Jangan lupa ganti ID Sheet DB !!!
     fetch("https://sheetdb.io/api/v1/xxx", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => alert("Rilis berita berhasil dikirim dengan ID: " + newId))
      .catch(err => alert("Gagal mengirim data."));
    })
    .catch(err => {
      console.error("Gagal mengambil data:", err);
     alert("Gagal membaca ID terakhir.");
    });
  });
  form.reset()