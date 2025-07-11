$('#trackForm').on('submit', function (e) {
  e.preventDefault();
  const ip = $('#ipInput').val().trim();
  if (!ip) return toastr.error('Masukkan alamat IP terlebih dahulu!');

  $('#loader').removeClass('d-none');
  $('#resultSection').addClass('d-none');

  $.post('/api/lookup', { ip }, function (res) {
    $('#loader').addClass('d-none');

    if (!res.success) return toastr.error(res.message || 'Terjadi kesalahan');

    const d = res.data;
    const html = `
      <li class="list-group-item"><i class="fas fa-globe text-info me-2"></i><strong>IP:</strong> ${d.query}</li>
      <li class="list-group-item"><i class="fas fa-flag text-warning me-2"></i><strong>Negara:</strong> ${d.country} (${d.countryCode})</li>
      <li class="list-group-item"><i class="fas fa-location-dot text-danger me-2"></i><strong>Kota:</strong> ${d.city}</li>
      <li class="list-group-item"><i class="fas fa-map text-secondary me-2"></i><strong>Wilayah:</strong> ${d.regionName}</li>
      <li class="list-group-item"><i class="fas fa-envelope text-muted me-2"></i><strong>ZIP:</strong> ${d.zip}</li>
      <li class="list-group-item"><i class="fas fa-location-arrow text-success me-2"></i><strong>Koordinat:</strong> ${d.lat}, ${d.lon}</li>
      <li class="list-group-item"><i class="fas fa-clock text-primary me-2"></i><strong>Timezone:</strong> ${d.timezone}</li>
      <li class="list-group-item"><i class="fas fa-network-wired text-dark me-2"></i><strong>ISP:</strong> ${d.isp}</li>
      <li class="list-group-item"><i class="fas fa-server text-secondary me-2"></i><strong>Org / ASN:</strong> ${d.org} / ${d.as}</li>
    `;

    $('#ipDetails').html(html);
    $('#resultSection').removeClass('d-none');

    const mapURL = `https://maps.google.com/maps?q=${d.lat},${d.lon}&z=13&output=embed`;
    $('#mapContainer').html(`<iframe src="${mapURL}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`);
  });
});
