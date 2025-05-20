fetch("https://sheetdb.io/api/v1/smomo1mxyt3q5")
      .then(res => res.json())
      .then(data => {

        //hanya pakai yang ada datanya
        const filterData = data.filter(item => item.ID);

        // Urutkan berdasarkan tanggal (terbaru di atas)
        filterData.sort((a, b) => new Date(b.Tanggal) - new Date(a.Tanggal));

        const container = document.getElementById("news-container");
        data.forEach(item => {
          const card = `
            <div class="release-card">
              <div class = "thumbnail">
                <img src="${item.Thumbnail || 'img/note.jpg'}" class="release-thumb" alt="Thumbnail">
              </div>
              <div class="release-content">
                <h5 class="release-title">${item.Judul}</h5>
                <div class="release-meta">${item.Tanggal} | Penulis: ${item.Penulis}</div>
              </div>
            </div>
          `;
          container.innerHTML += card;
        });
      })
      .catch(err => {
        console.error("Gagal memuat data:", err);
      });
