fetch("https://sheetdb.io/api/v1/xxx")
      .then(res => res.json())
      .then(data => {

        // Urutkan berdasarkan tanggal (terbaru di atas)
        data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

        const container = document.getElementById("news-container");
        data.forEach(item => {
          const card = `
            <div class="release-card">
              <div class = "thumbnail">
                <img src="${item.thubnail || 'img/note.jpg'}" class="release-thumb" alt="Thumbnail">
              </div>
              <div class="release-content">
                <h5 class="release-title">${item.judul}</h5>
                <div class="release-meta">${item.tanggal} | Penulis: ${item.penulis}</div>
              </div>
            </div>
          `;
          container.innerHTML += card;
        });
      })
      .catch(err => {
        console.error("Gagal memuat data:", err);
      });
