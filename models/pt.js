var mongoose = require('mongoose');

var Ptschema = new mongoose.Schema({
  nama_pt: String,
  penanggungjawab_pt: String,
  telepon_pt: String,
  alamat_pt: String,
  alamat_pengiriman: String,
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pt', Ptschema);
