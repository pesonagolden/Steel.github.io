/**
 * SEO Page Generator - PT. Pesona Golden Steel
 * Generates 300+ unique SEO HTML pages
 * Run: node generate-seo.js
 */

const fs = require('fs');
const path = require('path');

// ==================== CONFIGURATION ====================
const OUTPUT_DIR = './seo-pages';
const BASE_URL = 'https://pesonagolden.netlify.app';
const COMPANY = 'PT. Pesona Golden Steel';
const PHONE = '628989619222';
const EMAIL = 'pesona.golden@gmail.com';
const ADDRESS = 'Jakarta Utara, Indonesia';
const YEAR = new Date().getFullYear();

// ==================== DATA ====================

const locations = {
    'medan': { city: 'Medan', province: 'Sumatera Utara', region: 'Sumatera', kecamatan: ['Medan Kota','Medan Area','Medan Amplas','Medan Denai','Medan Helvetia','Medan Johor','Medan Maimun','Medan Perjuangan','Medan Petisah','Medan Selayang','Medan Sunggal','Medan Tembung','Medan Timur','Medan Barat','Medan Selatan','Medan Utara','Medan Polonia','Medan Tuntungan'], industri: ['perkebunan kelapa sawit','pengolahan CPO','industri makanan dan minuman','pabrik karet','pengolahan tembakau','industri farmasi'], desc: 'Medan sebagai ibukota Sumatera Utara merupakan pusat industri terbesar di wilayah Sumatera. Sektor perkebunan kelapa sawit dan pengolahan CPO mendominasi kebutuhan material perpipaan stainless steel di kota ini.' },
    'lampung': { city: 'Lampung', province: 'Lampung', region: 'Sumatera', kecamatan: ['Teluk Betung Selatan','Teluk Betung Utara','Teluk Betung Barat','Panjang','Tanjung Karang Pusat','Tanjung Karang Timur','Tanjung Karang Barat','Enggal','Kedaton','Kemiling','Sukabumi','Way Halim'], industri: ['perkebunan kelapa sawit','pengolahan CPO','industri batubara','pembangkit listrik','industri kertas','pertambangan'], desc: 'Provinsi Lampung memiliki sektor perkebunan dan pertambangan yang kuat. Kebutuhan material stainless steel untuk pabrik kelapa sawit dan pembangkit listrik terus meningkat di wilayah ini.' },
    'kec-serpong': { city: 'Kecamatan Serpong', province: 'Banten', region: 'Jabodetabek', kecamatan: ['Serpong','Serpong Utara','Serpong Selatan','Pagedangan','Cisauk','Gunung Sindur','Parung Panjang'], industri: ['industri manufaktur','pabrik elektronik','industri makanan','perumahan dan konstruksi','teknologi informasi','logistik'], desc: 'Kecamatan Serpong di Tangerang Selatan merupakan kawasan industri dan teknologi yang berkembang pesat. Banyak pabrik dan manufaktur yang membutuhkan material perpipaan berkualitas tinggi.' },
    'karawang-regency': { city: 'Karawang Regency', province: 'Jawa Barat', region: 'Jawa', kecamatan: ['Karawang Barat','Karawang Timur','Telukjambe Barat','Telukjambe Timur','Klari','Ciampel','Purwasari','Kotabaru','Tegalwaru','Cikampek','Pangkalan','Rawamerta'], industri: ['industri otomotif','manufaktur komponen','pabrik makanan','industri tekstil','pabrik elektronik','industri farmasi'], desc: 'Kabupaten Karawang dikenal sebagai kawasan industri otomotif terbesar di Indonesia. Kehadiran pabrik-pabrik besar menciptakan permintaan tinggi untuk pipe, valve, dan fitting stainless steel.' },
    'aceh': { city: 'Aceh', province: 'Aceh', region: 'Sumatera', kecamatan: ['Banda Aceh','Aceh Besar','Sabang','Langsa','Lhokseumawe','Subulussalam','Meulaboh','Sigli','Calang','Takengon'], industri: ['pengolahan gas alam (LNG)','perkebunan','pembangkit listrik','industri perikanan','pertambangan'], desc: 'Aceh memiliki cadangan gas alam yang besar dengan kompleks LNG Arun. Kebutuhan material perpipaan untuk sektor oil & gas dan pembangkit listrik sangat tinggi di wilayah ini.' },
    'kota-jakarta-timur': { city: 'Kota Jakarta Timur', province: 'DKI Jakarta', region: 'Jabodetabek', kecamatan: ['Matraman','Jatinegara','Duren Sawit','Cakung','Cipayung','Makasar','Kramat Jati','Pasar Rebo','Ciracas','Pulo Gadung'], industri: ['industri manufaktur','gudang dan logistik','pabrik makanan','industri konstruksi','perdagangan besar','jasa pengolahan'], desc: 'Jakarta Timur memiliki kawasan industri Cakung dan Pulo Gadung yang menjadi pusat manufaktur. Banyak pabrik besar membutuhkan pasokan rutin material perpipaan dan stainless steel.' },
    'kota-surakarta': { city: 'Kota Surakarta (Solo)', province: 'Jawa Tengah', region: 'Jawa', kecamatan: ['Laweyan','Serengan','Pasar Kliwon','Jebres','Banjarsari'], industri: ['industri tekstil dan batik','manufaktur mebel','pabrik makanan','industri kerajinan','pengolahan tembakau','pariwisata'], desc: 'Surakarta atau Solo merupakan pusat industri tekstil dan batik di Jawa Tengah. Kebutuhan material stainless steel untuk mesin produksi dan sistem perpipaan industri terus tumbuh.' },
    'daerah-khusus-ibukota-jakarta': { city: 'DKI Jakarta', province: 'DKI Jakarta', region: 'Jabodetabek', kecamatan: ['Menteng','Tanah Abang','Gambir','Senen','Cempaka Putih','Kemayoran','Kelapa Gading','Penjaringan','Pancoran','Kebayoran Baru','Kebayoran Lama','Mampang Prapatan','Setiabudi','Tebet','Jatinegara','Duren Sawit','Cakung','Cilincing','Kali Deres','Grogol','Palmerah','Tambora','Pademangan','Penjaringan'], industri: ['perkantoran','industri jasa','konstruksi bangunan','hospitality','industri makanan','perdagangan','teknologi','keuangan'], desc: 'DKI Jakarta sebagai ibukota negara memiliki kebutuhan material industri yang sangat besar. Proyek konstruksi gedung bertingkat, sistem MEP, dan infrastruktur menjadi penggerak utama permintaan stainless steel.' },
    'banten': { city: 'Banten', province: 'Banten', region: 'Jabodetabek', kecamatan: ['Cilegon','Serang','Tangerang','Tangerang Selatan','Pandeglang','Lebak','Cikeusik','Cadasari','Cimarga','Curugbitung','Maja','Muncang','Panggarangan','Sajira','Sobang','Wanasalam','Walantaka','Kasemen','Taktakan'], industri: ['industri baja (Krakatau Steel)','pabrik kimia','industri otomotif','pembangkit listrik','industri makanan','petrokimia','logistik'], desc: 'Banten merupakan kawasan industri strategis dengan kehadiran Krakatau Steel dan berbagai pabrik petrokimia. Kebutuhan material baja dan stainless steel di Banten sangat tinggi dari sektor manufaktur dan konstruksi.' },
    'kota-jakarta-barat': { city: 'Kota Jakarta Barat', province: 'DKI Jakarta', region: 'Jabodetabek', kecamatan: ['Cengkareng','Grogol Petamburan','Kalideres','Kebon Jeruk','Palmerah','Penjaringan','Tambora','Kembangan'], industri: ['industri makanan','gudang dan logistik','pabrik plastik','industri konstruksi','perdagangan','pengolahan','industri garment'], desc: 'Jakarta Barat memiliki kawasan industri di Cengkareng dan Kalideres. Banyak pabrik makanan dan minuman yang memerlukan sistem perpipaan stainless steel sesuai standar food grade.' },
    'bekasi': { city: 'Bekasi', province: 'Jawa Barat', region: 'Jabodetabek', kecamatan: ['Bekasi Barat','Bekasi Timur','Bekasi Selatan','Bekasi Utara','Pondok Gede','Jatiasih','Jatisampurna','Mustika Jaya','Bantargebang','Rawalumbu','Medan Satria','Cikarang Utara','Cikarang Selatan','Cikarang Pusat','Cibitung','Sukatani'], industri: ['industri elektronik','manufaktur otomotif','pabrik makanan','industri garment','pabrik sepatu','industri plastik','logistik'], desc: 'Bekasi dan Cikarang merupakan kawasan industri terbesar di Indonesia. Ribuan pabrik beroperasi di sini menciptakan permintaan masif untuk material perpipaan dan stainless steel.' },
    'cikarang': { city: 'Cikarang', province: 'Jawa Barat', region: 'Jabodetabek', kecamatan: ['Cikarang Utara','Cikarang Selatan','Cikarang Pusat','Cikarang Timur','Cikarang Barat','Sukaresmi','Cibatu','Karang Asih','Sukadarma','Telaga Asih','Hegarmukti','Mekarmukti','Waluya','Sertajaya','Tanjuang Baru'], industri: ['industri elektronik (Samsung, LG)','otomotif (Honda, Astra)','pabrik makanan (Nestle, Indofood)','industri farmasi','manufaktur komponen','industri kimia'], desc: 'Cikarang adalah jantung industri manufaktur Indonesia dengan banyak perusahaan multinasional. Kebutuhan material perpipaan berkualitas tinggi untuk pabrik-pabrik di kawasan ini sangat besar dan berkesinambungan.' },
    'kec-cakung': { city: 'Kecamatan Cakung', province: 'DKI Jakarta', region: 'Jabodetabek', kecamatan: ['Cakung Barat','Cakung Timur','Jatinegara','Penggilingan','Rawa Terate','Cakung','Pulo Gebang','Ujung Menteng'], industri: ['kawasan industri pulogaduk','pabrik makanan','industri logam','gudang distribusi','industri kimia','manufaktur'], desc: 'Kecamatan Cakung memiliki kawasan industri Pulogaduk yang berisi ratusan pabrik. Lokasi strategis dekat pelabuhan Tanjung Priok menjadikan Cakung sebagai pusat distribusi material industri.' },
    'cikampek': { city: 'Cikampek', province: 'Jawa Barat', region: 'Jawa', kecamatan: ['Cikampek','Kotabaru','Pangkalan','Karawang Barat','Telukjambe','Ciampel','Klari'], industri: ['industri manufaktur','pabrik komponen otomotif','industri makanan','logistik dan distribusi','industri kemasan'], desc: 'Cikampek merupakan simpul logistik strategis di jalur utama Jakarta-Bandung. Kawasan industri di sekitar Cikampek terus berkembang dengan kebutuhan material perpipaan yang stabil.' },
    'indonesia': { city: 'Indonesia', province: 'Seluruh Indonesia', region: 'Nasional', kecamatan: [], industri: ['oil & gas','pembangkit listrik','industri petrokimia','manufaktur','konstruksi','pertambangan','perkebunan','pengolahan makanan','farmasi','industri tekstil','kelautan','infrastruktur'], desc: 'Indonesia sebagai negara kepulauan terbesar di dunia memiliki kebutuhan material industri yang sangat besar di berbagai sektor. PT. Pesona Golden Steel melayani distribusi material perpipaan dan stainless steel ke seluruh provinsi di Indonesia.' },
    'kecamatan-cengkareng': { city: 'Kecamatan Cengkareng', province: 'DKI Jakarta', region: 'Jabodetabek', kecamatan: ['Cengkareng Barat','Cengkareng Timur','Duri Kosambi','Kapuk','Kedaung Kali Angke','Rawa Buaya','Cengkareng Garden','Tegal Alur'], industri: ['industri makanan dan minuman','gudang logistik','pabrik plastik','industri farmasi','cold storage','pengolahan ikan','industri kemasan'], desc: 'Kecamatan Cengkareng memiliki kawasan industri dan pergudangan yang luas. Banyak perusahaan food & beverage yang membutuhkan sistem perpipaan stainless steel food grade.' },
    'kabupaten-klaten': { city: 'Kabupaten Klaten', province: 'Jawa Tengah', region: 'Jawa', kecamatan: ['Klaten Tengah','Klaten Selatan','Klaten Utara','Klaten Barat','Klaten Timur','Jogonalan','Delanggu','Ceper','Gantiwarno','Karangdowo','Karanganom','Ngawen','Polanharjo','Trucuk','Wedi','Bayat','Cawas','Kemalang','Manisrenggo','Prambanan','Tulung','Jatinom','Pedan','Karangpandan','Tegalyoso'], industri: ['industri tembakau','pabrik gula','pertanian','industri kerajinan','peternakan','industri makanan','pengolahan hasil pertanian'], desc: 'Kabupaten Klaten terletak di antara Solo dan Yogyakarta dengan ekonomi yang didorong oleh sektor pertanian dan industri pengolahan. Kebutuhan material stainless steel untuk pabrik gula dan industri pengolahan terus meningkat.' },
    'kota-tangerang-selatan': { city: 'Kota Tangerang Selatan', province: 'Banten', region: 'Jabodetabek', kecamatan: ['Serpong','Serpong Utara','Serpong Selatan','Ciputat','Ciputat Timur','Pamulang','Pondok Aren','Bintaro','Setu','Kelapa Dua'], industri: ['teknologi informasi','industri makanan','manufaktur','pendidikan','perumahan','industri kreatif','logistik','konstruksi'], desc: 'Tangerang Selatan berkembang pesat sebagai kawasan pendidikan, teknologi, dan industri modern. Pembangunan infrastruktur dan perumahan terus meningkatkan permintaan material stainless steel.' },
    'palembang': { city: 'Palembang', province: 'Sumatera Selatan', region: 'Sumatera', kecamatan: ['Ilir Barat I','Ilir Barat II','Ilir Timur I','Ilir Timur II','Seberang Ulu I','Seberang Ulu II','Kertapati','Plaju','Sako','Kalidoni','Alang-Alang Lebar','Gandus','Bukit Kecil','Lautan','Sematang Borang','Sukarame'], industri: ['pengolahan minyak bumi (Pertamina)','pabrik pupuk (Pusri)','industri karet','pembangkit listrik','industri plywood','pertambangan batubara','industri makanan'], desc: 'Palembang memiliki kilang minyak Pertamina Plaju dan pabrik pupuk Pusri yang menjadi penggerak utama kebutuhan material perpipaan. Kebutuhan pipe dan valve untuk sektor oil & gas dan petrokimia sangat dominan.' },
    'purwakarta': { city: 'Purwakarta', province: 'Jawa Barat', region: 'Jawa', kecamatan: ['Purwakarta','Campaka','Cibatu','Darangdan','Jatiluhur','Maniis','Pasawahan','Plered','Sukasari','Tegalwaru','Bojong','Bungursari','Kiarapedes',' Pondok Salam'], industri: ['pembangkit listrik (PLTA Jatiluhur)','industri manufaktur','pertanian','perikanan','industri makanan','konstruksi'], desc: 'Purwakarta terkenal dengan waduk Jatiluhur yang merupakan pembangkit listrik tenaga air terbesar di Jawa Barat. Kebutuhan material stainless steel untuk sektor energi dan infrastruktur terus bertambah.' },
    'dki-jakarta': { city: 'DKI Jakarta', province: 'DKI Jakarta', region: 'Jabodetabek', kecamatan: ['Setiabudi','Menteng','Tanah Abang','Gambir','Senen','Cempaka Putih','Kemayoran','Kelapa Gading','Penjaringan','Pancoran','Kebayoran Baru','Kebayoran Lama','Mampang Prapatan','Tebet','Jatinegara','Duren Sawit','Cakung','Cilincing','Kali Deres','Grogol','Palmerah','Tambora','Pademangan'], industri: ['perkantoran','konstruksi gedung','industri jasa','hospitality','industri makanan','keuangan','teknologi','perdagangan','infrastructure'], desc: 'DKI Jakarta sebagai pusat pemerintahan dan bisnis Indonesia memiliki proyek konstruksi besar yang membutuhkan material stainless steel berkualitas tinggi untuk sistem MEP gedung-gedung bertingkat.' },
    'cibitung': { city: 'Cibitung', province: 'Jawa Barat', region: 'Jabodetabek', kecamatan: ['Cibitung','Sukaresmi','Cibarusah','Jatiasih','Setu','Seri','Tambun','Simpangan','Wanasari','Mekarsari'], industri: ['industri manufaktur','pabrik makanan','gudang logistik','industri elektronik','pabrik komponen','industri kemasan'], desc: 'Cibitung merupakan kawasan industri yang terintegrasi dengan Cikarang. Banyak pabrik manufaktur yang membutuhkan pasokan rutin material perpipaan stainless steel.' },
    'jawa-tengah': { city: 'Jawa Tengah', province: 'Jawa Tengah', region: 'Jawa', kecamatan: ['Semarang','Solo','Surakarta','Pekalongan','Tegal','Salatiga','Magelang','Kudus','Demak','Jepara','Kendal','Batang','Pekalongan','Brebes','Slawi','Purwokerto','Cilacap','Klaten','Boyolali','Karanganyar','Sragen','Wonogiri','Sukoharjo','Blora','Pati','Rembang','Kudus','Jepara'], industri: ['industri tekstil dan batik','manufaktur rokok','pabrik gula','industri makanan','pembangkit listrik','industri furnitur (Jepara)','industri sepeda motor','pertanian','peternakan'], desc: 'Jawa Tengah merupakan provinsi industri dengan sektor manufaktur yang sangat beragam. Dari industri rokok di Kudus, furnitur di Jepara, hingga tekstil di Solo, semuanya membutuhkan material perpipaan dan stainless steel.' },
    'kerawang': { city: 'Karawang', province: 'Jawa Barat', region: 'Jawa', kecamatan: ['Karawang Barat','Karawang Timur','Telukjambe Barat','Telukjambe Timur','Klari','Ciampel','Purwasari','Kotabaru','Tegalwaru','Cikampek','Pangkalan','Rawamerta','Tempuran','Kutawaluya','Cilebar','Pakisjaya','Batujaya','Tirtajaya','Tanjung Pura'], industri: ['industri otomotif','manufaktur komponen','pabrik makanan','industri tekstil','pabrik elektronik','industri farmasi','pertanian'], desc: 'Karawang merupakan salah satu kawasan industri terbesar di Indonesia dengan ribuan pabrik. Kebutuhan material perpipaan dan stainless steel sangat tinggi dari sektor otomotif dan manufaktur.' }
};

const products = {
    'stainless-steel': {
        name: 'Stainless Steel',
        nameLong: 'Besi Stainless Steel Anti Karat',
        items: ['Pipe Stainless Steel SS304/SS316','Plat Stainless Steel','Elbow Stainless Steel','Tee Stainless Steel','Reducer Stainless Steel','Flange Stainless Steel','Coupling Stainless Steel','Union Stainless Steel','Cap Stainless Steel','Nipple Stainless Steel'],
        desc: 'Stainless steel merupakan material logam paduan yang mengandung minimal 10.5% kromium, memberikan sifat anti karat yang excellent. Material ini banyak digunakan di industri makanan, farmasi, kimia, dan konstruksi karena daya tahan terhadap korosi yang superior.'
    },
    'pipe,valve,fitting,plat-stainless-steel': {
        name: 'Pipe, Valve, Fitting, Plat Stainless Steel',
        nameLong: 'Pipe, Valve, Fitting, dan Plat Stainless Steel',
        items: ['Ball Valve','Gate Valve','Globe Valve','Check Valve','Butterfly Valve','Safety Valve','Knife Gate Valve','Pipe SS304/SS316','Elbow','Tee','Reducer','Flange','Plat Stainless Steel','Gasket','Y Strainer','Pressure Gauge','Foot Valve','Flexible Joint','Sight Glass','Pressure Relief Valve','Pressure Reducing Valve','Coupling Chicago','Basket Strainer','Hydrant'],
        desc: 'Pipe, valve, fitting, dan plat stainless steel adalah komponen esensial dalam sistem perpipaan industri. Pipe berfungsi sebagai saluran fluida, valve sebagai pengatur aliran, fitting sebagai penyambung, dan plat stainless steel untuk fabrikasi tangki dan struktur.'
    }
};

const keywordTypes = {
    'daftar-harga': {
        label: 'Daftar Harga',
        articleFocus: 'priceList',
        verb: 'menampilkan daftar harga',
        ctaText: 'Minta Daftar Harga'
    },
    'distributor': {
        label: 'Distributor',
        articleFocus: 'distributor',
        verb: 'mendistribusikan',
        ctaText: 'Hubungi Distributor'
    },
    'jual': {
        label: 'Jual',
        articleFocus: 'sell',
        verb: 'menjual',
        ctaText: 'Beli Sekarang'
    },
    'pricelist': {
        label: 'Pricelist',
        articleFocus: 'priceList',
        verb: 'memberikan pricelist',
        ctaText: 'Lihat Pricelist'
    }
};

const adjectives = {
    'murah': { label: 'Murah', emphasis: 'harga yang sangat kompetitif dan terjangkau', alt: 'terjangkau', comparative: 'lebih murah' },
    'terdekat': { label: 'Terdekat', emphasis: 'layanan terdekat dengan pengiriman cepat ke lokasi Anda', alt: 'paling mudah dijangkau', comparative: 'paling dekat' },
    'anti-karat': { label: 'Anti Karat', emphasis: 'material anti karat dengan daya tahan korosi maksimal', alt: 'tahan karat', comparative: 'paling tahan karat' },
    'berkualitas': { label: 'Berkualitas', emphasis: 'produk berkualitas tinggi dengan sertifikat standar internasional', alt: 'berkualitas tinggi', comparative: 'berkualitas terbaik' },
    'terbaik': { label: 'Terbaik', emphasis: 'layanan dan produk terbaik di kelasnya dengan garansi kepuasan', alt: 'paling unggul', comparative: 'terbaik' }
};

// Product images for cards
const productImages = [
    { img: 'pict1.jpeg', name: 'Ball Valve' },
    { img: 'prod-2.jpg', name: 'Gate Valve' },
    { img: 'IMG-20250610-WA0801.jpg', name: 'Ball Valve A105' },
    { img: 'IMG-20250610-WA0796.jpg', name: 'Ball Valve Actuator' },
    { img: 'IMG-20250610-WA0794.jpg', name: 'Safety Valve' },
    { img: 'Gambar WhatsApp 2025-02-05 pukul 14.06.38_292e4509.jpg', name: 'Knife Gate Valve' },
    { img: 'IMG-20250610-WA0800.jpg', name: 'Pompa Ebara' },
    { img: 'Gambar WhatsApp 2025-02-05 pukul 14.06.38_0f231f03.jpg', name: 'Gate Valve' },
    { img: 'Gambar WhatsApp 2025-02-05 pukul 14.06.38_ffb063ba.jpg', name: 'Check Valve' },
    { img: 'IMG-20250610-WA0803.jpg', name: 'Butterfly Valve' },
    { img: 'IMG-20250623-WA0698.jpg', name: 'Flange' },
    { img: 'IMG-20250610-WA0798.jpg', name: 'Sight Glass Valve' },
    { img: 'pict3.jpeg', name: 'Y Strainer' },
    { img: 'IMG-20250623-WA0708.jpg', name: 'Flexible Join' },
    { img: 'Gambar WhatsApp 2025-02-05 pukul 14.06.39_4d9f74db.jpg', name: 'Basket Strainer' },
    { img: 'Gambar WhatsApp 2025-02-05 pukul 14.06.39_d70dfb03.jpg', name: 'Globe Valve' },
    { img: 'WhatsApp Image 2025-10-26 at 18.46.47.jpeg', name: 'Elbow' },
    { img: 'WhatsApp Image 2025-10-26 at 18.46.47 (1).jpeg', name: 'Pipe' },
    { img: 'Capture.PNG', name: 'Foot Valve' },
    { img: 'WhatsApp Image 2025-10-26 at 16.24.06.jpeg', name: 'Hydrant' },
    { img: 'WhatsApp Image 2025-06-24 at 16.21.17.jpeg', name: 'Pressure Gauge' },
    { img: 'WhatsApp Image 2025-10-26 at 16.24.07.jpeg', name: 'Pressure Relief Valve' },
    { img: 'Screenshot 2025-01-24 162537.png', name: 'Pressure Reducing Valve' },
    { img: 'IMG-20250623-WA0700.jpg', name: 'Gasket Flensa' },
    { img: 'WhatsApp Image 2025-10-26 at 19.41.01.jpeg', name: 'Coupling Chicago' }
];

// ==================== CONTENT GENERATORS ====================

function generateTitle(keywordType, product, location, adjective) {
    const kt = keywordTypes[keywordType];
    const p = products[product];
    const l = locations[location];
    const a = adjectives[adjective];
    return `${kt.label} ${p.nameLong} ${l.city} ${a.label} | ${COMPANY}`;
}

function generateDescription(keywordType, product, location, adjective) {
    const kt = keywordTypes[keywordType];
    const p = products[product];
    const l = locations[location];
    const a = adjectives[adjective];
    
    const descMap = {
        'daftar-harga': `Daftar harga ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}, ${l.province}. ${COMPANY} menyediakan ${p.items.slice(0,5).join(', ')} dan lainnya dengan ${a.emphasis}. Update harga terbaru ${YEAR}.`,
        'distributor': `Distributor ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}, ${l.province}. ${COMPANY} sebagai distributor resmi ${kt.verb} ${p.items.slice(0,4).join(', ')} dengan ${a.emphasis} untuk wilayah ${l.city} dan sekitarnya.`,
        'jual': `Jual ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}, ${l.province}. ${COMPANY} ${kt.verb} ${p.items.slice(0,5).join(', ')} berkualitas dengan ${a.emphasis}. Melayani pengiriman ke seluruh ${l.city}.`,
        'pricelist': `Pricelist ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}, ${l.province}. ${COMPANY} memberikan pricelist lengkap ${p.items.slice(0,4).join(', ')} dengan ${a.emphasis}. Harga update ${YEAR}.`
    };
    return descMap[keywordType];
}

function generateKeywords(keywordType, product, location, adjective) {
    const kt = keywordTypes[keywordType];
    const p = products[product];
    const l = locations[location];
    const a = adjectives[adjective];
    return `${kt.label.toLowerCase()} ${p.name.toLowerCase()} ${l.city.toLowerCase()}, ${p.name.toLowerCase()} ${l.city.toLowerCase()} ${a.label.toLowerCase()}, ${a.label.toLowerCase()} ${p.name.toLowerCase()} ${l.province.toLowerCase()}, supplier ${p.name.toLowerCase()} ${l.city.toLowerCase()}, ${p.items.slice(0,3).join(' ' + l.city.toLowerCase() + ',')} ${p.name.toLowerCase()} ${l.region.toLowerCase()}`;
}

function generateArticle(keywordType, product, location, adjective, index) {
    const kt = keywordTypes[keywordType];
    const p = products[product];
    const l = locations[location];
    const a = adjectives[adjective];
    
    // Different article structures based on keyword type
    const articles = {
        'daftar-harga': generatePriceArticle,
        'distributor': generateDistributorArticle,
        'jual': generateSellArticle,
        'pricelist': generatePricelistArticle
    };
    
    return articles[keywordType](kt, p, l, a, index);
}

function generatePriceArticle(kt, p, l, a, idx) {
    const h2s = [
        `Daftar Harga ${p.nameLong} ${a.label} di ${l.city}`,
        `Faktor yang Mempengaruhi Harga ${p.name} di ${l.city}`,
        `Tabel Perkiraan Harga ${p.name} ${a.label} untuk ${l.city}`,
        `Tips Mendapatkan Harga ${p.name} ${a.comparative} di ${l.city}`,
        `Area Pengiriman Daftar Harga ${p.name} di ${l.city}`
    ];
    
    return `
                    <h2>${h2s[0]}</h2>
                    <p>Bagi Anda yang sedang mencari <strong>daftar harga ${p.name.toLowerCase()} ${a.label.toLowerCase()}</strong> di ${l.city}, ${l.province}, ${COMPANY} menyediakan informasi harga terlengkap dan terbaru. ${l.desc}</p>
                    <p>Kami memahami bahwa mengetahui harga yang akurat sangat penting untuk perencanaan anggaran proyek Anda di ${l.city}. Oleh karena itu, kami selalu memperbarui daftar harga ${p.name.toLowerCase()} kami secara berkala untuk memastikan Anda mendapatkan informasi yang paling aktual.</p>
                    
                    <h2>${h2s[1]}</h2>
                    <p>Harga ${p.name.toLowerCase()} di ${l.city} dipengaruhi oleh beberapa faktor utama yang perlu Anda ketahui:</p>
                    <ul>
                        <li><strong>Jenis Material</strong> — ${p.name.includes('Stainless') ? 'SS304 memiliki harga lebih terjangkau dibanding SS316L yang memiliki kandungan Molibdenum untuk ketahanan korosi yang lebih baik' : 'Material stainless steel, carbon steel, brass, dan cast iron memiliki harga yang berbeda-beda'}</li>
                        <li><strong>Ukuran dan Spesifikasi</strong> — Semakin besar ukuran dan semakin tinggi class pressure, harga akan semakin meningkat secara proporsional</li>
                        <li><strong>Jumlah Pemesanan</strong> — Pembelian dalam jumlah besar (partai) akan mendapatkan diskon khusus dari ${COMPANY}</li>
                        <li><strong>Biaya Pengiriman ke ${l.city}</strong> — Jarak dari gudang kami di Jakarta Utara ke ${l.city} mempengaruhi ongkos kirim</li>
                        <li><strong>Kondisi Pasar</strong> — Fluktuasi harga bahan baku global, terutama harga nikel untuk stainless steel, mempengaruhi harga jual</li>
                        <li><strong>Sertifikasi</strong> — Produk dengan sertifikat tambahan (MTC, API, fire safe) memiliki harga premium</li>
                    </ul>
                    
                    <h2>${h2s[2]}</h2>
                    <p>Berikut adalah perkiraan range harga ${p.name.toLowerCase()} yang kami jual untuk pengiriman ke ${l.city}:</p>
                    <ul>
                        ${p.items.slice(0, 8).map((item, i) => `<li><strong>${item}</strong> — Harga mulai dari ${['Rp 85.000','Rp 120.000','Rp 95.000','Rp 150.000','Rp 200.000','Rp 180.000','Rp 75.000','Rp 250.000'][i]} (harga dapat berubah, hubungi untuk harga pasti)</li>`).join('\n                        ')}
                    </ul>
                    <p><em>Catatan: Harga di atas adalah estimasi dan dapat berubah sewaktu-waktu. Untuk mendapatkan daftar harga resmi dan penawaran khusus untuk proyek Anda di ${l.city}, silakan hubungi tim sales kami.</em></p>
                    
                    <h2>${h2s[3]}</h2>
                    <p>Untuk mendapatkan harga ${p.name.toLowerCase()} yang ${a.comparative} di ${l.city}, perhatikan tips berikut dari ${COMPANY}:</p>
                    <ol>
                        <li><strong>Pesan dalam Jumlah Besar</strong> — Diskon volume tersedia untuk pembelian partai besar ke ${l.city}</li>
                        <li><strong>Beli Langsung dari Distributor</strong> — Hindari perantara, beli langsung dari ${COMPANY} sebagai distributor resmi</li>
                        <li><strong>Konsultasikan Spesifikasi</strong> — Tim kami membantu memilih spesifikasi yang tepat agar tidak over-spec dan boros biaya</li>
                        <li><strong>Manfaatkan Promo Periodik</strong> — ${COMPANY} sering mengadakan promo untuk pelanggan di ${l.city}</li>
                        <li><strong>Pesan Jauh Hari</strong> — Pemesanan advance membantu kami memberikan harga yang lebih baik karena perencanaan produksi yang optimal</li>
                    </ol>
                    
                    <h2>${h2s[4]}</h2>
                    <p>${COMPANY} melayani pengiriman daftar harga dan produk ${p.name.toLowerCase()} ke seluruh wilayah ${l.city}${l.kecamatan.length > 0 ? ', termasuk kecamatan:' : ':'}</p>
                    <ul>
                        ${l.kecamatan.slice(0, 12).map(k => `<li>Kecamatan ${k}</li>`).join('\n                        ')}
                        ${l.kecamatan.length > 12 ? `<li>Dan kecamatan lainnya di ${l.city}</li>` : ''}
                    </ul>
                    <p>Selain ${l.city}, kami juga melayani pengiriman ke seluruh ${l.province} dan ${l.region} dengan jaringan ekspedisi yang terpercaya.</p>
                    
                    <div class="internal-link-box">
                        <h4>Halaman Terkait yang Mungkin Anda Butuhkan:</h4>
                        <ul>
                            <li><a href="${BASE_URL}/Show.html">Katalog Produk Lengkap ${COMPANY}</a></li>
                            <li><a href="${BASE_URL}/Datasheet.html">Datasheet Teknis ${p.name}</a></li>
                            <li><a href="${BASE_URL}/lokasi.html">Lokasi Gudang ${COMPANY} di Jakarta Utara</a></li>
                            <li><a href="${BASE_URL}/index.html">Halaman Utama ${COMPANY}</a></li>
                        </ul>
                    </div>
                    
                    <h2>Pertanyaan Umum Seputar Harga ${p.name} di ${l.city}</h2>
                    
                    <h3>Berapa harga ${p.name.toLowerCase()} terbaru di ${l.city}?</h3>
                    <p>Harga ${p.name.toLowerCase()} terbaru untuk wilayah ${l.city} bervariasi tergantung tipe, ukuran, material, dan jumlah pemesanan. Sebagai gambaran, harga mulai dari puluhan ribu hingga jutaan rupiah per unit. Untuk mendapatkan harga terbaru dan penawaran khusus, hubungi tim sales ${COMPANY} melalui WhatsApp.</p>
                    
                    <h3>Apakah ada diskon untuk pembelian ${p.name.toLowerCase()} dalam jumlah besar ke ${l.city}?</h3>
                    <p>Ya, ${COMPANY} memberikan diskon khusus untuk pembelian ${p.name.toLowerCase()} dalam jumlah besar (partai) ke ${l.city}. Besaran diskon bergantung pada volume pesanan, jenis produk, dan hubungan bisnis jangka panjang. Hubungi kami untuk negosiasi harga terbaik.</p>
                    
                    <h3>Apakah harga sudah termasuk ongkos kirim ke ${l.city}?</h3>
                    <p>Harga yang kami tawarkan biasanya belum termasuk ongkos kirim ke ${l.city}. Biaya pengiriman akan dihitung terpisah berdasarkan berat, volume, dan lokasi pengiriman di ${l.city}. Namun untuk pembelian dalam jumlah tertentu, kami bisa memberikan gratis ongkos kirim ke ${l.city}.</p>
                    
                    <h3>Berapa lama harga ${p.name.toLowerCase()} berlaku?</h3>
                    <p>Harga ${p.name.toLowerCase()} dari ${COMPANY} biasanya berlaku selama 14-30 hari sejak tanggal penawaran, tergantung pada kondisi pasar. Jika terjadi perubahan harga bahan baku yang signifikan, kami akan menginformasikan kepada pelanggan di ${l.city} sebelum memproses pesanan.</p>
                `;
}

function generateDistributorArticle(kt, p, l, a, idx) {
    const h2s = [
        `Distributor ${p.nameLong} ${a.label} untuk ${l.city}`,
        `Mengapa ${COMPANY} Menjadi Distributor ${p.name} Terpilih di ${l.city}`,
        `Jangkauan Distribusi ${p.name} ${COMPANY} di ${l.city} dan ${l.province}`,
        `Produk ${p.name} yang Kami Distribusikan ke ${l.city}`,
        `Proses Pemesanan dari ${l.city} melalui ${COMPANY}`
    ];
    
    return `
                    <h2>${h2s[0]}</h2>
                    <p>${COMPANY} merupakan <strong>distributor ${p.name.toLowerCase()} ${a.label.toLowerCase()}</strong> yang telah dipercaya oleh banyak perusahaan dan kontraktor di ${l.city}, ${l.province}. ${l.desc}</p>
                    <p>Sebagai distributor resmi, kami memastikan setiap produk ${p.name.toLowerCase()} yang dikirim ke ${l.city} telah melewati proses quality control yang ketat dan disertai dokumen kelengkapan seperti Mill Test Certificate (MTC) dan sertifikat standar yang relevan.</p>
                    
                    <h2>${h2s[1]}</h2>
                    <p>Berikut alasan mengapa ${COMPANY} menjadi pilihan utama sebagai distributor ${p.name.toLowerCase()} di ${l.city}:</p>
                    <ul>
                        <li><strong>Autorized Distributor</strong> — Kami adalah distributor resmi dengan izin usaha lengkap, bukan sekadar broker atau perantara</li>
                        <li><strong>Stok Melimpah</strong> — Gudang seluas ribuan meter persegi di Jakarta Utara memastikan ketersediaan produk untuk pengiriman cepat ke ${l.city}</li>
                        <li><strong>${a.label}</strong> — Sebagai distributor langsung, harga yang kami tawarkan ke ${l.city} jauh ${a.comparative} dibandingkan membeli dari toko retail</li>
                        <li><strong>Produk Bersertifikat</strong> — Setiap pengiriman ke ${l.city} disertai sertifikat material dan test report</li>
                        <li><strong>Tim Teknis Berpengalaman</strong> — Tim kami siap membantu konsultasi teknis untuk proyek Anda di ${l.city}</li>
                        <li><strong>Jaringan Ekspedisi Terpercaya</strong> — Kerjasama dengan berbagai ekspedisi untuk pengiriman aman ke ${l.city}</li>
                        <li><strong>Layanan Purna Jual</strong> — Kami tetap melayani setelah produk diterima di ${l.city}</li>
                    </ul>
                    
                    <h2>${h2s[2]}</h2>
                    <p>${COMPANY} mendistribusikan ${p.name.toLowerCase()} ke seluruh wilayah ${l.city}${l.kecamatan.length > 0 ? ':' : ''}</p>
                    <ul>
                        ${l.kecamatan.slice(0, 10).map(k => `<li>Kecamatan/Kelurahan ${k}</li>`).join('\n                        ')}
                        ${l.kecamatan.length > 10 ? `<li>Dan wilayah lainnya di ${l.city}</li>` : ''}
                    </ul>
                    <p>Selain melayani ${l.city}, jaringan distribusi kami juga mencakup seluruh ${l.province} dan wilayah ${l.region} lainnya. Kami memiliki ekspedisi rekanan yang berpengalaman dalam pengiriman material berat ke seluruh Indonesia.</p>
                    
                    <h2>${h2s[3]}</h2>
                    <p>Berikut adalah produk ${p.name.toLowerCase()} yang rutin kami distribusikan ke pelanggan di ${l.city}:</p>
                    <ul>
                        ${p.items.map((item, i) => `<li><strong>${item}</strong> — Tersedia berbagai ukuran, material, dan class pressure${i < 3 ? ' (best seller di ' + l.city + ')' : ''}</li>`).join('\n                        ')}
                    </ul>
                    <p>Semua produk di atas tersedia untuk pengiriman ke ${l.city} dengan lead time yang kompetitif. Untuk produk yang tidak tercantum, silakan hubungi kami karena katalog kami lebih luas dari yang tertera.</p>
                    
                    <h2>${h2s[4]}</h2>
                    <p>Proses pemesanan ${p.name.toLowerCase()} dari ${l.city} melalui ${COMPANY} sangat mudah:</p>
                    <ol>
                        <li><strong>Kirim Inquiry</strong> — Hubungi tim sales kami via WhatsApp, sampaikan kebutuhan ${p.name.toLowerCase()}, jumlah, dan lokasi pengiriman di ${l.city}</li>
                        <li><strong>Terima Quotation</strong> — Kami akan mengirimkan penawaran harga lengkap dalam waktu 1x24 jam</li>
                        <li><strong>Negosiasi & Konfirmasi</strong> — Diskusikan harga dan spesifikasi, konfirmasi pemesanan setelah deal</li>
                        <li><strong>Proses & Kirim</strong> — Kami proses pesanan dan kirim ke lokasi Anda di ${l.city} sesuai jadwal</li>
                        <li><strong>Terima & Verifikasi</strong> — Terima barang di ${l.city}, verifikasi sesuai PO dan sertifikat</li>
                    </ol>
                    
                    <div class="internal-link-box">
                        <h4>Halaman Terkait:</h4>
                        <ul>
                            <li><a href="${BASE_URL}/Show.html">Katalog Produk Lengkap</a></li>
                            <li><a href="${BASE_URL}/Datasheet.html">Datasheet Teknis Produk</a></li>
                            <li><a href="${BASE_URL}/lokasi.html">Lokasi Gudang Distributor</a></li>
                            <li><a href="${BASE_URL}/index.html">Beranda ${COMPANY}</a></li>
                        </ul>
                    </div>
                    
                    <h2>FAQ - Distributor ${p.name} di ${l.city}</h2>
                    
                    <h3>Siapa distributor ${p.name.toLowerCase()} terpercaya di ${l.city}?</h3>
                    <p>${COMPANY} adalah distributor ${p.name.toLowerCase()} terpercaya yang melayani pengiriman ke ${l.city}. Dengan pengalaman bertahun-tahun dan ratusan pelanggan di ${l.province}, kami telah membuktikan kualitas layanan dan produk kami.</p>
                    
                    <h3>Apakah bisa menjadi reseller ${p.name.toLowerCase()} di ${l.city}?</h3>
                    <p>Ya, ${COMPANY} membuka kesempatan kemitraan untuk menjadi reseller ${p.name.toLowerCase()} di ${l.city}. Kami menawarkan harga khusus reseller, margin keuntungan menarik, dan dukungan marketing. Hubungi kami untuk informasi program kemitraan.</p>
                    
                    <h3>Berapa lama pengiriman ${p.name.toLowerCase()} dari distributor ke ${l.city}?</h3>
                    <p>Waktu pengiriman ${p.name.toLowerCase()} dari gudang kami di Jakarta Utara ke ${l.city} bervariasi antara 1-7 hari kerja tergantung jarak, volume pesanan, dan ketersediaan stok. Untuk produk yang tersedia stok, pengiriman ke ${l.city} bisa lebih cepat.</p>
                    
                    <h3>Apakah distributor memberikan garansi produk untuk ${l.city}?</h3>
                    <p>Ya, ${COMPANY} memberikan garansi produk untuk setiap pengiriman ke ${l.city}. Garansi mencakup kerusakan akibat cacat produksi dan ketidaksesuaian spesifikasi. Kondisi dan durasi garansi disesuaikan dengan jenis produk dan disebutkan dalam invoice.</p>
                `;
}

function generateSellArticle(kt, p, l, a, idx) {
    const h2s = [
        `Jual ${p.nameLong} ${a.label} — Melayani ${l.city}`,
        `Keunggulan Membeli ${p.name} ${a.label} dari ${COMPANY} untuk ${l.city}`,
        `Katalog Produk ${p.name} yang Kami Jual untuk ${l.city}`,
        `Industri di ${l.city} yang Membutuhkan ${p.name}`,
        `Cara Order ${p.name} dari ${l.city}`
    ];
    
    return `
                    <h2>${h2s[0]}</h2>
                    <p>${COMPANY} <strong>jual ${p.name.toLowerCase()} ${a.label.toLowerCase()}</strong> untuk seluruh wilayah ${l.city}, ${l.province}. ${l.desc}</p>
                    <p>Kami memahami bahwa setiap proyek di ${l.city} membutuhkan material yang tepat, berkualitas, dan tersedia tepat waktu. Itulah mengapa ${COMPANY} hadir sebagai supplier ${p.name.toLowerCase()} yang ${a.alt} untuk melayani kebutuhan Anda di ${l.city} dan sekitarnya.</p>
                    
                    <h2>${h2s[1]}</h2>
                    <p>Membeli ${p.name.toLowerCase()} dari ${COMPANY} untuk kebutuhan di ${l.city} memberikan banyak keuntungan:</p>
                    <ul>
                        <li><strong>Harga ${a.label}</strong> — Kami jual ${p.name.toLowerCase()} dengan harga yang ${a.comparative} dibandingkan supplier lain di ${l.city} karena kami adalah supplier langsung</li>
                        <li><strong>Kualitas Terjamin</strong> — Setiap produk yang kami jual telah melewati inspeksi ketat dan disertai sertifikat</li>
                        <li><strong>Stok Lengkap</strong> — Tersedia ribuan SKU ${p.name.toLowerCase()} siap kirim ke ${l.city}</li>
                        <li><strong>Pengiriman Cepat</strong> — Order diproses cepat, pengiriman ke ${l.city} terorganisir dengan baik</li>
                        <li><strong>Minimum Order Fleksibel</strong> — Bisa beli mulai dari 1 pcs untuk pengiriman ke ${l.city}</li>
                        <li><strong>Konsultasi Gratis</strong> — Tim teknis kami membantu Anda memilih produk yang tepat untuk proyek di ${l.city}</li>
                        <li><strong>Packing Aman</strong> — Material dikemas dengan standar pengiriman untuk meminimalkan kerusakan saat dikirim ke ${l.city}</li>
                    </ul>
                    
                    <h2>${h2s[2]}</h2>
                    <p>Berikut katalog produk ${p.name.toLowerCase()} yang kami jual untuk pengiriman ke ${l.city}:</p>
                    <ul>
                        ${p.items.map((item, i) => `<li><strong>${item}</strong> — Tersedia dalam berbagai spesifikasi, ukuran, dan material${i % 3 === 0 ? ' ⭐ Best seller di ' + l.city : ''}</li>`).join('\n                        ')}
                    </ul>
                    <p>Katalog di atas hanya sebagian dari produk yang kami jual. Jika Anda tidak menemukan produk yang dicari, hubungi tim sales kami karena kemungkinan besar produk tersebut tersedia di gudang kami.</p>
                    
                    <h2>${h2s[3]}</h2>
                    <p>Di ${l.city}, terdapat berbagai industri yang membutuhkan ${p.name.toLowerCase()} yang kami jual, antara lain:</p>
                    <ul>
                        ${l.industri.map(ind => `<li><strong>Industri ${ind}</strong> — Membutuhkan ${p.name.toLowerCase()} untuk sistem perpipaan, fabrikasi, dan konstruksi</li>`).join('\n                        ')}
                    </ul>
                    <p>${COMPANY} telah melayani banyak perusahaan dari berbagai sektor industri di ${l.city}. Pengalaman ini membuat kami memahami kebutuhan spesifik setiap industri dan bisa memberikan rekomendasi produk yang paling sesuai.</p>
                    
                    <h2>${h2s[4]}</h2>
                    <p>Cara memesan ${p.name.toLowerCase()} dari ${l.city} sangat mudah:</p>
                    <ol>
                        <li><strong>Hubungi Kami via WhatsApp</strong> — Klik tombol WhatsApp di halaman ini, sampaikan produk yang dibutuhkan, jumlah, dan alamat lengkap di ${l.city}</li>
                        <li><strong>Terima Penawaran Harga</strong> — Tim kami akan membalas dengan quotation dalam waktu maksimal 1x24 jam kerja</li>
                        <li><strong>Konfirmasi Order</strong> — Setelah setuju dengan harga, konfirmasi pemesanan dan lakukan pembayaran</li>
                        <li><strong>Pantau Pengiriman</strong> — Kami akan memberikan update status pengiriman ke ${l.city} secara berkala</li>
                        <li><strong>Terima Barang</strong> — Periksa barang yang diterima di ${l.city}, pastikan sesuai dengan PO</li>
                    </ol>
                    
                    <div class="internal-link-box">
                        <h4>Halaman Terkait:</h4>
                        <ul>
                            <li><a href="${BASE_URL}/Show.html">Lihat Semua Produk yang Dijual</a></li>
                            <li><a href="${BASE_URL}/Datasheet.html">Datasheet Teknis Produk</a></li>
                            <li><a href="${BASE_URL}/lokasi.html">Lokasi Supplier</a></li>
                            <li><a href="${BASE_URL}/index.html">Halaman Utama</a></li>
                        </ul>
                    </div>
                    
                    <h2>FAQ — Jual ${p.name} di ${l.city}</h2>
                    
                    <h3>Di mana bisa beli ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}?</h3>
                    <p>Anda bisa membeli ${p.name.toLowerCase()} ${a.label.toLowerCase()} dari ${COMPANY}. Meskipun gudang kami berada di Jakarta Utara, kami melayani penjualan dan pengiriman ke seluruh ${l.city} dengan harga yang ${a.comparative}. Cukup hubungi kami via WhatsApp untuk pemesanan.</p>
                    
                    <h3>Apakah bisa beli ${p.name.toLowerCase()} eceran untuk pengiriman ke ${l.city}?</h3>
                    <p>Ya, ${COMPANY} melayani pembelian ${p.name.toLowerCase()} mulai dari 1 pcs (eceran) untuk pengiriman ke ${l.city}. Kami tidak membatasi minimum order sehingga Anda bisa membeli sesuai kebutuhan proyek, baik kecil maupun besar.</p>
                    
                    <h3>Berapa lama pengiriman ${p.name.toLowerCase()} ke ${l.city}?</h3>
                    <p>Estimasi pengiriman ${p.name.toLowerCase()} dari gudang kami di Jakarta Utara ke ${l.city} adalah ${l.region === 'Jabodetabek' ? '1-2' : l.region === 'Jawa' ? '2-4' : '3-7'} hari kerja. Untuk pesanan mendesak, kami bisa menggunakan layanan ekspedisi express dengan biaya tambahan.</p>
                    
                    <h3>Apakah ada garansi ${p.name.toLowerCase()} yang dijual untuk ${l.city}?</h3>
                    <p>Ya, semua produk ${p.name.toLowerCase()} yang kami jual untuk pengiriman ke ${l.city} mendapatkan garansi. Garansi mencakup cacat produksi dan ketidaksesuaian spesifikasi dengan PO. Detail garansi akan dicantumkan dalam dokumen penjualan.</p>
                `;
}

function generatePricelistArticle(kt, p, l, a, idx) {
    const h2s = [
        `Pricelist ${p.nameLong} ${a.label} untuk ${l.city}`,
        `Rincian Pricelist ${p.name} yang Kami Tawarkan ke ${l.city}`,
        `Cara Mendapatkan Pricelist ${p.name} Resmi untuk ${l.city}`,
        `Perbandingan Harga ${p.name} di ${l.city}`,
        `Ketentuan Pricelist ${p.name} ${COMPANY} untuk ${l.city}`
    ];
    
    return `
                    <h2>${h2s[0]}</h2>
                    <p>Mencari <strong>pricelist ${p.name.toLowerCase()} ${a.label.toLowerCase()}</strong> untuk wilayah ${l.city}? ${COMPANY} menyediakan pricelist lengkap dan transparan untuk semua produk ${p.name.toLowerCase()} yang kami tawarkan ke ${l.city}, ${l.province}.</p>
                    <p>${l.desc} Kebutuhan akan ${p.name.toLowerCase()} yang berkualitas dengan harga ${a.label.toLowerCase()} terus meningkat di ${l.city}, dan ${COMPANY} hadir untuk memenuhi kebutuhan tersebut.</p>
                    
                    <h2>${h2s[1]}</h2>
                    <p>Pricelist ${p.name.toLowerCase()} dari ${COMPANY} mencakup informasi lengkap berikut untuk setiap produk yang dikirim ke ${l.city}:</p>
                    <ul>
                        <li><strong>Nama dan Tipe Produk</strong> — Spesifikasi teknis lengkap sesuai standar (JIS, ASTM, API, DIN)</li>
                        <li><strong>Material</strong> — Jenis material (SS304, SS316, SS316L, Carbon Steel, Brass, dll)</li>
                        <li><strong>Ukuran</strong> — Dimensi lengkap (diameter, panjang, ketebalan, pressure class)</li>
                        <li><strong>Harga Satuan</strong> — Harga per unit dalam Rupiah</li>
                        <li><strong>Diskon Volume</strong> — Besaran diskon untuk pembelian partai ke ${l.city}</li>
                        <li><strong>Ketersediaan Stok</strong> — Status ketersediaan di gudang kami</li>
                        <li><strong>Lead Time</strong> — Estimasi waktu pengiriman ke ${l.city}</li>
                    </ul>
                    
                    <h2>${h2s[2]}</h2>
                    <p>Untuk mendapatkan pricelist ${p.name.toLowerCase()} resmi dari ${COMPANY} untuk ${l.city}, ikuti langkah berikut:</p>
                    <ol>
                        <li><strong>Hubungi Tim Sales</strong> — WhatsApp ke nomor ${PHONE.replace('628','08')}, sampaikan bahwa Anda membutuhkan pricelist ${p.name.toLowerCase()} untuk ${l.city}</li>
                        <li><strong>Sebutkan Kebutuhan</strong> — Informasikan jenis produk, kisaran ukuran, material yang diinginkan, dan perkiraan volume</li>
                        <li><strong>Terima Pricelist</strong> — Kami akan mengirimkan pricelist dalam format PDF atau Excel dalam waktu 1x24 jam</li>
                        <li><strong>Diskusi & Negosiasi</strong> — Jika ada item yang perlu dinegosiasi, tim kami siap membahas</li>
                        <li><strong>Pricelist Berlaku</strong> — Pricelist berlaku sesuai periode yang tertera (biasanya 14-30 hari)</li>
                    </ol>
                    
                    <h2>${h2s[3]}</h2>
                    <p>Berikut perbandingan keunggulan pricelist ${COMPANY} dibandingkan supplier lain untuk ${l.city}:</p>
                    <ul>
                        <li><strong>Harga ${a.comparative}</strong> — Pricelist kami menunjukkan harga yang ${a.comparative} untuk kualitas setara di ${l.city}</li>
                        <li><strong>Transparan</strong> — Tidak ada biaya tersembunyi, semua komponen harga tercantum jelas</li>
                        <li><strong>Negotiable</strong> — Harga di pricelist masih bisa dinegosiasi terutama untuk volume besar ke ${l.city}</li>
                        <li><strong>Update Rutin</strong> — Pricelist diperbarui secara berkala sesuai kondisi pasar</li>
                        <li><strong>Lengkap</strong> — Pricelist mencakup semua varian produk yang tersedia untuk pengiriman ke ${l.city}</li>
                    </ul>
                    
                    <h2>${h2s[4]}</h2>
                    <p>Beberapa ketentuan penting terkait pricelist ${p.name.toLowerCase()} ${COMPANY} untuk ${l.city}:</p>
                    <ul>
                        <li><strong>Masa Berlaku</strong> — Pricelist berlaku 14-30 hari sejak diterbitkan, kecuali ada keterangan khusus</li>
                        <li><strong>PPN</strong> — Harga di pricelist belum termasuk PPN 11% (kecuali disebutkan lain)</li>
                        <li><strong>Ongkos Kirim</strong> — Biaya pengiriman ke ${l.city} dihitung terpisah berdasarkan berat dan volume</li>
                        <li><strong>Pembayaran</strong> — Tersedia opsi pembayaran tunai, transfer, dan termin untuk pelanggan tetap di ${l.city}</li>
                        <li><strong>Spesifikasi</strong> — Harga berlaku sesuai spesifikasi yang tercantum, perubahan spesifikasi akan mengubah harga</li>
                    </ul>
                    
                    <div class="internal-link-box">
                        <h4>Halaman Terkait:</h4>
                        <ul>
                            <li><a href="${BASE_URL}/Show.html">Katalog Produk ${COMPANY}</a></li>
                            <li><a href="${BASE_URL}/Datasheet.html">Datasheet Teknis</a></li>
                            <li><a href="${BASE_URL}/lokasi.html">Lokasi Kami</a></li>
                            <li><a href="${BASE_URL}/index.html">Beranda</a></li>
                        </ul>
                    </div>
                    
                    <h2>FAQ — Pricelist ${p.name} untuk ${l.city}</h2>
                    
                    <h3>Bagaimana cara mendapatkan pricelist ${p.name.toLowerCase()} untuk ${l.city}?</h3>
                    <p>Cara termudah mendapatkan pricelist ${p.name.toLowerCase()} untuk ${l.city} adalah menghubungi tim sales ${COMPANY} via WhatsApp di nomor ${PHONE.replace('628','08')}. Sampaikan lokasi di ${l.city} dan jenis produk yang dibutuhkan, kami akan mengirimkan pricelist dalam waktu 1x24 jam.</p>
                    
                    <h3>Apakah pricelist ${p.name.toLowerCase()} untuk ${l.city} bisa dinegosiasi?</h3>
                    <p>Ya, harga di pricelist ${COMPANY} untuk ${l.city} bersifat negotiable. Untuk pembelian dalam jumlah besar, kami bisa memberikan diskon tambahan. Silakan diskusikan kebutuhan Anda dengan tim sales kami untuk mendapatkan penawaran terbaik.</p>
                    
                    <h3>Apakah pricelist sudah termasuk ongkir ke ${l.city}?</h3>
                    <p>Pricelist ${COMPANY} biasanya belum termasuk ongkos kirim ke ${l.city}. Biaya pengiriman akan dihitung terpisah setelah kami mengetahui berat, volume, dan alamat lengkap pengiriman di ${l.city}. Namun untuk volume tertentu, kami bisa memberikan subsidi ongkir.</p>
                    
                    <h3>Berapa lama pricelist ${p.name.toLowerCase()} berlaku untuk ${l.city}?</h3>
                    <p>Pricelist ${p.name.toLowerCase()} dari ${COMPANY} untuk ${l.city} umumnya berlaku selama 14-30 hari. Masa berlaku tercantum di dalam dokumen pricelist. Jika pricelist sudah expired, Anda bisa meminta pembaruan pricelist terbaru dari tim sales kami.</p>
                `;
}

function generateFAQ_LD(keywordType, product, location, adjective) {
    const p = products[product];
    const l = locations[location];
    const a = adjectives[adjective];
    const kt = keywordTypes[keywordType];
    
    const faqMap = {
        'daftar-harga': [
            { q: `Berapa daftar harga ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}?`, a: `Daftar harga ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city} mulai dari puluhan ribu rupiah tergantung jenis, ukuran, dan material. Hubungi ${COMPANY} untuk mendapatkan daftar harga lengkap dan terbaru.` },
            { q: `Di mana bisa lihat daftar harga ${p.name.toLowerCase()} untuk ${l.city}?`, a: `Anda bisa mendapatkan daftar harga ${p.name.toLowerCase()} untuk ${l.city} langsung dari ${COMPANY} melalui WhatsApp di nomor ${PHONE.replace('628','08')}. Tim kami akan mengirimkan daftar harga dalam format PDF.` },
            { q: `Apakah daftar harga ${p.name.toLowerCase()} di ${l.city} bisa diskon?`, a: `Ya, ${COMPANY} memberikan diskon untuk pembelian ${p.name.toLowerCase()} dalam jumlah besar ke ${l.city}. Besaran diskon tergantung volume pesanan dan jenis produk.` }
        ],
        'distributor': [
            { q: `Siapa distributor ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}?`, a: `${COMPANY} adalah distributor ${p.name.toLowerCase()} ${a.label.toLowerCase()} yang melayani pengiriman ke ${l.city}, ${l.province}. Kami menyediakan stok lengkap dengan harga distributor langsung.` },
            { q: `Apakah distributor bisa kirim ${p.name.toLowerCase()} ke seluruh ${l.city}?`, a: `Ya, ${COMPANY} mendistribusikan ${p.name.toLowerCase()} ke seluruh wilayah ${l.city} termasuk ${l.kecamatan.slice(0,3).join(', ')} dan kecamatan lainnya.` },
            { q: `Bagaimana cara menjadi reseller ${p.name.toLowerCase()} di ${l.city}?`, a: `Hubungi ${COMPANY} via WhatsApp untuk informasi program kemitraan reseller ${p.name.toLowerCase()} di ${l.city}. Kami menawarkan harga khusus reseller dan dukungan pemasaran.` }
        ],
        'jual': [
            { q: `Di mana beli ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city}?`, a: `Beli ${p.name.toLowerCase()} ${a.label.toLowerCase()} di ${l.city} dari ${COMPANY}. Hubungi kami via WhatsApp untuk pemesanan dengan pengiriman langsung ke lokasi Anda di ${l.city}.` },
            { q: `Apakah bisa beli ${p.name.toLowerCase()} eceran untuk ${l.city}?`, a: `Ya, ${COMPANY} jual ${p.name.toLowerCase()} mulai dari 1 pcs (eceran) dengan pengiriman ke ${l.city}. Minimum order fleksibel untuk memenuhi kebutuhan proyek kecil maupun besar.` },
            { q: `Berapa lama kirim ${p.name.toLowerCase()} ke ${l.city}?`, a: `Estimasi pengiriman ${p.name.toLowerCase()} dari Jakarta Utara ke ${l.city} adalah ${l.region === 'Jabodetabek' ? '1-2' : l.region === 'Jawa' ? '2-4' : '3-7'} hari kerja tergantung volume pesanan.` }
        ],
        'pricelist': [
            { q: `Bagaimana dapat pricelist ${p.name.toLowerCase()} untuk ${l.city}?`, a: `Hubungi ${COMPANY} via WhatsApp di ${PHONE.replace('628','08')} untuk mendapatkan pricelist ${p.name.toLowerCase()} lengkap untuk ${l.city}. Dikirim dalam format PDF atau Excel.` },
            { q: `Apakah pricelist ${p.name.toLowerCase()} untuk ${l.city} sudah termasuk PPN?`, a: `Pricelist ${COMPANY} untuk ${l.city} umumnya belum termasuk PPN 11%. Biaya PPN akan dihitung terpisah. Kecuali ada keterangan khusus di pricelist.` },
            { q: `Berapa lama pricelist ${p.name.toLowerCase()} berlaku?`, a: `Pricelist ${p.name.toLowerCase()} ${COMPANY} untuk ${l.city} berlaku 14-30 hari sejak diterbitkan. Setelah masa berlaku habis, Anda bisa meminta pembaruan pricelist terbaru.` }
        ]
    };
    
    return faqMap[keywordType];
}

// ==================== HTML TEMPLATE ====================

function generateHTML(keywordType, product, location, adjective, index) {
    const p = products[product];
    const l = locations[location];
    const a = adjectives[adjective];
    const kt = keywordTypes[keywordType];
    const fileName = `${keywordType}-${product}-${location}-${adjective}`;
    const canonicalUrl = `${BASE_URL}/${fileName}.html`;
    const title = generateTitle(keywordType, product, location, adjective);
    const description = generateDescription(keywordType, product, location, adjective);
    const keywords = generateKeywords(keywordType, product, location, adjective);
    const article = generateArticle(keywordType, product, location, adjective, index);
    const faqs = generateFAQ_LD(keywordType, product, location, adjective);
    
    // Select 8 product cards with variation based on index
    const selectedProducts = [];
    for (let i = 0; i < 8; i++) {
        const prodIdx = (index * 3 + i * 7) % productImages.length;
        selectedProducts.push(productImages[prodIdx]);
    }
    
    const productCards = selectedProducts.map((prod, i) => `
                    <div class="product-card" data-aos="fade-up" data-aos-delay="${i * 100}">
                        <img src="gambar/${prod.img}" alt="${prod.name} ${a.label} untuk ${l.city}">
                        <div class="product-card-content">
                            <h3>${prod.name}</h3>
                            <p>Tersedia ${a.label.toLowerCase()} untuk ${l.city}</p>
                            <a href="https://wa.me/${PHONE}?text=Halo%2C%20saya%20dari%20${encodeURIComponent(l.city)}%2C%20ingin%20bertanya%20tentang%20${encodeURIComponent(prod.name)}" target="_blank" class="product-btn"><i class="fas fa-info-circle"></i> More Info</a>
                        </div>
                    </div>`).join('\n');
    
    return `<!DOCTYPE html>
<html lang="id" id="html-tag">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="icon" href="gambar/Screenshot_2025-06-25_221917-removebg-preview.png" type="image/png" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="author" content="${COMPANY}" />
    <meta name="robots" content="index, follow" />
    <meta name="google-adsense-account" content="ca-pub-4694107664740278" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${BASE_URL}/gambar/image.jpeg" />
    <meta property="og:site_name" content="${COMPANY}" />
    <meta property="og:locale" content="id_ID" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "${COMPANY}",
        "description": "${description}",
        "url": "${BASE_URL}",
        "telephone": "+${PHONE}",
        "email": "${EMAIL}",
        "address": {"@type": "PostalAddress", "streetAddress": "Jakarta Utara", "addressLocality": "Jakarta", "addressRegion": "DKI Jakarta", "addressCountry": "ID"},
        "areaServed": {"@type": "City", "name": "${l.city}"},
        "priceRange": "Rp"
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            ${faqs.map(faq => `{"@type": "Question", "name": "${faq.q.replace(/"/g, '\\"')}", "acceptedAnswer": {"@type": "Answer", "text": "${faq.a.replace(/"/g, '\\"')}"}}`).join(',\n            ')}
        ]
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Beranda", "item": "${BASE_URL}/index.html"},
            {"@type": "ListItem", "position": 2, "name": "Produk", "item": "${BASE_URL}/Show.html"},
            {"@type": "ListItem", "position": 3, "name": "${kt.label} ${p.name} ${l.city} ${a.label}"}
        ]
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4694107664740278" crossorigin="anonymous"></script>
    <style>
        :root{--bg-primary:#0F0F1E;--bg-secondary:#1a1a2e;--accent-gold:#FFD700;--accent-cyan:#64FFDA;--text-primary:#E6E6E6;--text-secondary:#a8a8b3;--font-heading:'Poppins',sans-serif;--font-body:'Inter',sans-serif;--whatsapp-green:#25D366;--whatsapp-green-dark:#128C7E;--navbar-height:70px}
        body.light-theme{--bg-primary:#f8f9fa;--bg-secondary:#ffffff;--text-primary:#212529;--text-secondary:#6c757d}
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--font-body);background-color:var(--bg-primary);color:var(--text-primary);line-height:1.6;overflow-x:hidden;transition:background-color .3s,color .3s}.container{max-width:1400px;margin:0 auto;padding:0 20px}h1,h2,h3,h4,h5,h6{font-family:var(--font-heading);font-weight:700;color:var(--text-primary)}
        .navbar{position:fixed;top:0;left:0;width:100%;padding:15px 0;background-color:transparent;z-index:1000;transition:background-color .3s,backdrop-filter .3s;height:var(--navbar-height)}.navbar.scrolled{background-color:rgba(15,15,30,.9);backdrop-filter:blur(10px);box-shadow:0 4px 30px rgba(0,0,0,.3)}body.light-theme .navbar.scrolled{background-color:rgba(248,249,250,.9);box-shadow:0 4px 30px rgba(0,0,0,.1)}.navbar .container{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;position:relative;height:100%}.navbar .logo{font-family:var(--font-heading);font-size:1.2rem;font-weight:700;color:var(--accent-gold);text-decoration:none}.navbar .nav-menu{display:flex;list-style:none;gap:20px;align-items:center}.navbar .nav-link{color:var(--accent-gold)!important;text-decoration:none;font-weight:600;position:relative}.navbar .nav-link::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:2px;background-color:var(--accent-gold);transition:width .3s}.navbar .nav-link:hover{opacity:.8}.navbar .nav-link:hover::after{width:100%}.nav-controls{display:flex;align-items:center;gap:5px;margin-left:20px;padding-left:20px;border-left:1px solid var(--text-secondary)}#language-switcher a,#theme-toggle{color:var(--accent-gold)!important;text-decoration:none;font-weight:600;padding:5px;background:none;border:none;cursor:pointer;font-size:1rem}#language-switcher a.active,#language-switcher a:hover,#theme-toggle:hover{opacity:.8}.hamburger{display:none;cursor:pointer;color:var(--accent-gold)!important;font-size:1.8rem;padding:5px;align-items:center;justify-content:center;width:40px;height:40px;border-radius:5px}.hamburger:hover{background-color:rgba(255,215,0,.1)}
        .hero{min-height:50vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;background-image:url('gambar/image.jpeg');background-size:cover;background-position:center;padding-top:calc(var(--navbar-height) + 20px)}.hero::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top,rgba(15,15,30,.85),rgba(15,15,30,.4));z-index:1}.hero-content{position:relative;z-index:2;padding:20px;max-width:900px}.hero h1{font-size:2.2rem;margin-bottom:1.5rem;text-shadow:2px 2px 8px rgba(0,0,0,.7);color:var(--accent-gold)!important;line-height:1.2}.hero p{font-size:1.1rem;margin-bottom:2rem;max-width:700px;margin-left:auto;margin-right:auto;color:var(--accent-gold)!important;line-height:1.6}
        .btn{display:inline-block;padding:12px 28px;text-decoration:none;font-weight:600;border-radius:50px;transition:all .3s;margin:5px}.btn-primary{background-color:var(--accent-gold);color:var(--bg-primary);box-shadow:0 4px 15px rgba(255,215,0,.4)}.btn-primary:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,215,0,.6)}
        .section-title{text-align:center;font-size:2rem;margin-bottom:50px;position:relative;color:var(--text-primary)}.section-title .title-wrapper{display:flex;align-items:center;justify-content:center;gap:15px}.section-title .title-wrapper i{color:var(--accent-gold);font-size:2rem}.section-title .title-text{position:relative}.section-title .title-text::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:80px;height:4px;background-color:var(--accent-gold)}
        .article-section{padding:80px 0;background-color:var(--bg-secondary);position:relative}.article-section::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,rgba(15,15,30,.95) 0%,rgba(26,26,46,.95) 50%,rgba(15,15,30,.95) 100%);z-index:1}body.light-theme .article-section::before{background:linear-gradient(135deg,rgba(248,249,250,.95) 0%,rgba(255,255,255,.95) 50%,rgba(248,249,250,.95) 100%)}.article-section .container{position:relative;z-index:2}.article-content{max-width:900px;margin:0 auto}.article-content h2{font-size:1.7rem;margin:40px 0 20px;color:var(--accent-gold)}.article-content h3{font-size:1.3rem;margin:30px 0 15px;color:var(--text-primary)}.article-content p{color:var(--text-secondary);margin-bottom:18px;font-size:1rem;line-height:1.8}.article-content ul,.article-content ol{color:var(--text-secondary);margin:15px 0 20px 25px;line-height:1.8}.article-content li{margin-bottom:8px}.article-content a{color:var(--accent-gold);text-decoration:underline}.article-content strong{color:var(--text-primary)}
        .internal-link-box{background:rgba(255,215,0,.08);border:1px solid rgba(255,215,0,.2);border-radius:12px;padding:25px;margin:30px 0}.internal-link-box h4{color:var(--accent-gold);margin-bottom:12px}.internal-link-box ul{list-style:none;margin:0;padding:0}.internal-link-box li{margin-bottom:8px}.internal-link-box a{color:var(--accent-cyan);text-decoration:none}.internal-link-box a:hover{text-decoration:underline}
        .breadcrumb{padding:100px 0 20px;font-size:.9rem}.breadcrumb a{color:var(--accent-gold);text-decoration:none}.breadcrumb a:hover{text-decoration:underline}.breadcrumb span{color:var(--text-secondary);margin:0 8px}
        .product-section{padding:80px 0;background-color:var(--bg-secondary);position:relative;overflow:hidden}.product-section::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,rgba(15,15,30,.95) 0%,rgba(26,26,46,.95) 50%,rgba(15,15,30,.95) 100%);z-index:1}body.light-theme .product-section::before{background:linear-gradient(135deg,rgba(248,249,250,.95) 0%,rgba(255,255,255,.95) 50%,rgba(248,249,250,.95) 100%)}.product-section .container{position:relative;z-index:2}.product-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;padding:20px 0}.product-card{background-color:var(--bg-primary);border-radius:12px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.2);transition:transform .3s,box-shadow .3s}.product-card:hover{transform:translateY(-10px);box-shadow:0 15px 30px rgba(255,215,0,.3)}.product-card img{width:100%;height:200px;object-fit:cover}.product-card-content{padding:20px}.product-card-content h3{font-size:1.1rem;margin-bottom:10px;color:var(--text-primary)}.product-card-content p{color:var(--text-secondary);margin-bottom:15px;font-size:.9rem}.product-btn{display:inline-block;padding:8px 16px;background-color:var(--accent-gold);color:var(--bg-primary);text-decoration:none;border-radius:50px;font-weight:600;font-size:.9rem;transition:all .3s}.product-btn:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(255,215,0,.6)}
        .whatsapp-container{text-align:center;max-width:600px;margin:0 auto}.whatsapp-icon-wrapper{width:80px;height:80px;background:linear-gradient(135deg,var(--whatsapp-green),var(--whatsapp-green-dark));border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px;box-shadow:0 10px 30px rgba(37,211,102,.3);animation:pulse 2s infinite}@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}70%{box-shadow:0 0 0 20px rgba(37,211,102,0)}100%{box-shadow:0 0 0 0 rgba(37,211,102,0)}}.whatsapp-icon-wrapper i{font-size:40px;color:#fff}
        footer{background-color:var(--bg-secondary);text-align:center;padding:40px 0;border-top:1px solid rgba(255,255,255,.1)}.footer-content{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:30px;margin-bottom:20px}.footer-brand h5{color:var(--accent-gold);font-family:var(--font-heading);margin-bottom:1rem}.footer-brand p{font-size:.9rem;color:var(--text-secondary);display:flex;align-items:center;justify-content:flex-start;gap:10px}.footer-brand a{color:var(--text-secondary);text-decoration:none;transition:color .3s}.footer-brand a:hover{color:var(--accent-gold)}.footer-brand .contact-icon{color:var(--accent-gold);font-size:1.1rem;width:20px;text-align:center}.footer-socials a{color:var(--text-primary);font-size:1.8rem;margin:0 10px;transition:color .3s,transform .3s}.footer-socials a:hover{color:var(--accent-gold);transform:translateY(-3px)}.footer-bottom{margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1);font-size:.8rem;color:var(--text-secondary)}
        .floating-whatsapp{position:fixed;bottom:30px;right:30px;width:60px;height:60px;background:linear-gradient(135deg,var(--whatsapp-green),var(--whatsapp-green-dark));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:30px;text-decoration:none;box-shadow:0 5px 20px rgba(37,211,102,.5);z-index:999;transition:all .3s;animation:float 3s ease-in-out infinite}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.floating-whatsapp:hover{transform:scale(1.1);box-shadow:0 8px 25px rgba(37,211,102,.7)}
        @media(max-width:768px){.hamburger{display:flex;position:absolute;right:20px;top:50%;transform:translateY(-50%)}.navbar .logo{position:absolute;left:20px;top:50%;transform:translateY(-50%);max-width:calc(100% - 120px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.navbar .nav-menu{position:fixed;left:-100%;top:var(--navbar-height);flex-direction:column;background-color:var(--bg-secondary);width:100%;text-align:center;transition:.3s;padding:20px 0;z-index:999}.navbar .nav-menu.active{left:0}.nav-controls{border-left:none;border-top:1px solid var(--text-secondary);padding-top:10px;margin-left:0;margin-top:10px;width:100%;justify-content:center}.hero h1{font-size:1.6rem}.section-title{font-size:1.5rem}.section-title .title-wrapper{flex-direction:column;gap:10px}.footer-content{flex-direction:column;text-align:center}.floating-whatsapp{bottom:20px;right:20px;width:50px;height:50px;font-size:25px}.article-content h2{font-size:1.3rem}.article-content h3{font-size:1.1rem}}
    </style>
</head>
<body>
    <header class="navbar" id="navbar">
        <div class="container">
            <a href="${BASE_URL}/index.html" class="logo">PT. PESONA GOLDEN STEEL</a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="${BASE_URL}/index.html" class="nav-link" data-translate-key="nav_home">Beranda</a></li>
                <li><a href="${BASE_URL}/Show.html" class="nav-link" data-translate-key="nav_product">Produk</a></li>
                <li><a href="${BASE_URL}/Datasheet.html" class="nav-link" data-translate-key="nav_Datasheet">Datasheet</a></li>
                <li><a href="${BASE_URL}/lokasi.html" class="nav-link" data-translate-key="nav_location">Lokasi</a></li>
                <li><a href="${BASE_URL}/index.html#whatsapp" class="nav-link" data-translate-key="nav_contact">Hubungi Kami</a></li>
                <li class="nav-controls">
                    <div id="language-switcher"><a href="#" data-lang="id" class="active">ID</a><a href="#" data-lang="en">EN</a></div>
                    <button id="theme-toggle" title="Toggle theme"><i class="fas fa-moon"></i></button>
                </li>
            </ul>
            <div class="hamburger" id="hamburger"><i class="fas fa-bars"></i></div>
        </div>
    </header>
    <main>
        <nav class="breadcrumb container" aria-label="Breadcrumb"><a href="${BASE_URL}/index.html">Beranda</a> <span>›</span> <a href="${BASE_URL}/Show.html">Produk</a> <span>›</span> ${kt.label} ${p.name} ${l.city} ${a.label}</nav>

        <section class="hero">
            <div class="hero-content" data-aos="fade-up">
                <h1>${kt.label} ${p.nameLong} ${l.city} ${a.label}</h1>
                <p>${COMPANY} — ${kt.verb} ${p.name.toLowerCase()} ${a.label.toLowerCase()} untuk kebutuhan industri di ${l.city}, ${l.province}. ${a.emphasis}. Hubungi kami sekarang!</p>
                <a href="https://wa.me/${PHONE}?text=Halo%2C%20saya%20dari%20${encodeURIComponent(l.city)}%2C%20ingin%20bertanya%20${encodeURIComponent(kt.label.toLowerCase())}%20${encodeURIComponent(p.name.toLowerCase())}" target="_blank" class="btn btn-primary"><i class="fab fa-whatsapp"></i> ${kt.ctaText} via WhatsApp</a>
            </div>
        </section>

        <section class="article-section">
            <div class="container">
                <article class="article-content" itemscope itemtype="https://schema.org/Article">
                    <meta itemprop="author" content="${COMPANY}" />
                    <meta itemprop="datePublished" content="2025-0${(index % 9) + 1}-15" />
                    <meta itemprop="dateModified" content="2025-06-25" />
                    ${article}
                </article>
            </div>
        </section>

        <section class="product-section" id="produk">
            <div class="container">
                <h2 class="section-title" data-aos="fade-up"><div class="title-wrapper"><i class="fa-solid fa-cube"></i><span class="title-text">Produk ${a.label} untuk ${l.city}</span></div></h2>
                <div class="product-grid">
                    ${productCards}
                </div>
            </div>
        </section>

        <section class="product-section" id="whatsapp">
            <div class="container">
                <div class="whatsapp-container" data-aos="fade-up">
                    <div class="whatsapp-icon-wrapper"><i class="fab fa-whatsapp"></i></div>
                    <h2 class="section-title"><div class="title-wrapper"><i class="fa-solid fa-phone"></i><span class="title-text">Hubungi Kami untuk ${l.city}</span></div></h2>
                    <p style="text-align:center;color:var(--text-secondary);margin-bottom:25px;">Dapatkan ${kt.label.toLowerCase()} ${p.name.toLowerCase()} ${a.label.toLowerCase()} untuk ${l.city}. Konsultasi gratis, respon cepat!</p>
                    <div style="text-align:center;"><a href="https://wa.me/${PHONE}?text=Halo%2C%20saya%20dari%20${encodeURIComponent(l.city)}%2C%20butuh%20${encodeURIComponent(p.name.toLowerCase())}" target="_blank" class="btn btn-primary"><i class="fab fa-whatsapp"></i> ${kt.ctaText}</a></div>
                </div>
            </div>
        </section>
    </main>

    <a href="https://wa.me/${PHONE}?text=Halo%2C%20saya%20tertarik%20untuk%20bertanya%20mengenai%20produk%20Anda." target="_blank" class="floating-whatsapp" title="Chat WhatsApp"><i class="fab fa-whatsapp"></i></a>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <h5>PT. PESONA GOLDEN STEEL</h5>
                    <p><i class="fa-solid fa-envelope contact-icon"></i><a href="mailto:${EMAIL}">${EMAIL}</a></p>
                    <p><i class="fa-brands fa-whatsapp contact-icon"></i><a href="https://wa.me/${PHONE}">${PHONE.replace('628','0898 ')}</a></p>
                    <p><i class="fa-solid fa-location-dot contact-icon"></i> ${ADDRESS}</p>
                </div>
                <div class="footer-socials">
                    <p>Temukan Kami:</p>
                    <a href="https://www.tokopedia.com/ptpesona-golden-steel" target="_blank" title="Tokopedia"><i class="fa-solid fa-shop"></i></a>
                    <a href="https://www.facebook.com/share/12G56nHjcUg/" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>
            <div class="footer-bottom"><small>&copy; ${YEAR} ${COMPANY}. All Rights Reserved.</small></div>
        </div>
    </footer>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        const t={id:{nav_home:"Beranda",nav_product:"Produk",nav_Datasheet:"Datasheet",nav_location:"Lokasi",nav_contact:"Hubungi Kami"},en:{nav_home:"Home",nav_product:"Products",nav_Datasheet:"Datasheet",nav_location:"Location",nav_contact:"Contact"}};let cL=localStorage.getItem('selectedLanguage')||'id',cT=localStorage.getItem('selectedTheme')||'dark';
        function sL(l){cL=l;localStorage.setItem('selectedLanguage',l);document.getElementById('html-tag').setAttribute('lang',l);document.querySelectorAll('#language-switcher a').forEach(a=>a.classList.toggle('active',a.getAttribute('data-lang')===l));document.querySelectorAll('[data-translate-key]').forEach(e=>{const k=e.getAttribute('data-translate-key');if(t[l]&&t[l][k])e.textContent=t[l][k]})}
        function sT(th){cT=th;localStorage.setItem('selectedTheme',th);document.body.classList.toggle('light-theme',th==='light');document.querySelector('#theme-toggle i').className=th==='light'?'fas fa-sun':'fas fa-moon'}
        document.addEventListener('DOMContentLoaded',()=>{AOS.init({duration:1000,once:true});sL(cL);sT(cT);document.querySelectorAll('#language-switcher a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();sL(a.getAttribute('data-lang'))}));document.getElementById('theme-toggle').addEventListener('click',()=>sT(cT==='light'?'dark':'light'));window.addEventListener('scroll',()=>document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50));const h=document.getElementById('hamburger'),n=document.getElementById('navMenu');h.addEventListener('click',()=>{n.classList.toggle('active');h.querySelector('i').classList.toggle('fa-bars');h.querySelector('i').classList.toggle('fa-times')});document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>{n.classList.remove('active');h.querySelector('i').className='fas fa-bars'}))});
    </script>
</body>
</html>`;
}

// ==================== GENERATE ALL PAGES ====================

function generateAllPages() {
    // Create output directory
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Generate all combinations
    const combinations = [];
    const keywordTypeKeys = Object.keys(keywordTypes);
    const productKeys = Object.keys(products);
    const locationKeys = Object.keys(locations);
    const adjectiveKeys = Object.keys(adjectives);
    
    let count = 0;
    
    // Strategy: generate combinations that match the original list pattern
    // Original pattern: {keyword}-{product}-{location}-{adjective}
    
    for (const kt of keywordTypeKeys) {
        for (const prod of productKeys) {
            for (const loc of locationKeys) {
                for (const adj of adjectiveKeys) {
                    combinations.push({ keywordType: kt, product: prod, location: loc, adjective: adj });
                    count++;
                    if (count >= 300) break;
                }
                if (count >= 300) break;
            }
            if (count >= 300) break;
        }
        if (count >= 300) break;
    }
    
    console.log(`Generating ${combinations.length} SEO pages...\n`);
    
    let sitemapUrls = [];
    let generatedFiles = [];
    
    combinations.forEach((combo, index) => {
        const fileName = `${combo.keywordType}-${combo.product}-${combo.location}-${combo.adjective}`;
        const html = generateHTML(combo.keywordType, combo.product, combo.location, combo.adjective, index);
        const filePath = path.join(OUTPUT_DIR, `${fileName}.html`);
        
        fs.writeFileSync(filePath, html, 'utf-8');
        generatedFiles.push(`${fileName}.html`);
        sitemapUrls.push(`${BASE_URL}/seo-pages/${fileName}.html`);
        
        if ((index + 1) % 50 === 0 || index === combinations.length - 1) {
            console.log(`  Generated ${index + 1}/${combinations.length} pages...`);
        }
    });
    
    // Generate sitemap.xml
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${BASE_URL}/index.html</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
    <url><loc>${BASE_URL}/Show.html</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
    <url><loc>${BASE_URL}/Datasheet.html</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
    <url><loc>${BASE_URL}/lokasi.html</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
 ${sitemapUrls.map((url, i) => `    <url><loc>${url}</loc><priority>0.6</priority><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>`;
    
    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-seo.xml'), sitemap, 'utf-8');
    
    // Generate file list
    const fileList = `# Generated SEO Pages - ${COMPANY}\n# Total: ${generatedFiles.length} files\n# Generated: ${new Date().toISOString()}\n\n${generatedFiles.join('\n')}`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'file-list.txt'), fileList, 'utf-8');
    
    console.log(`\n✅ DONE! ${generatedFiles.length} files generated in ./${OUTPUT_DIR}/`);
    console.log(`   - sitemap-seo.xml (${sitemapUrls.length + 4} URLs)`);
    console.log(`   - file-list.txt`);
    console.log(`\n📁 Folder structure:`);
    console.log(`   your-project/`);
    console.log(`   ├── gambar/           (existing - your images)`);
    console.log(`   ├── index.html        (existing - your homepage)`);
    console.log(`   ├── Show.html         (existing - your product page)`);
    console.log(`   ├── Datasheet.html    (existing - your datasheet)`);
    console.log(`   ├── lokasi.html       (existing - your location)`);
    console.log(`   ├── generate-seo.js   (this generator)`);
    console.log(`   └── seo-pages/        (NEW - ${generatedFiles.length} SEO pages)`);
    console.log(`       ├── sitemap-seo.xml`);
    console.log(`       ├── file-list.txt`);
    console.log(`       ├── daftar-harga-stainless-steel-medan-murah.html`);
    console.log(`       ├── distributor-pipe,valve,fitting,plat-stainless-steel-kota-surakarta-murah.html`);
    console.log(`       ├── jual-stainless-steel-jakarta-barat-anti-karat.html`);
    console.log(`       └── ... (${generatedFiles.length - 3} more files)`);
    console.log(`\n⚠️  NEXT STEPS:`);
    console.log(`   1. Upload ALL files from seo-pages/ to your hosting`);
    console.log(`   2. Submit sitemap-seo.xml to Google Search Console`);
    console.log(`   3. Add links from your homepage to some of these SEO pages`);
    console.log(`   4. Update internal links (BASE_URL) in generate-seo.js to your actual domain`);
}

// Run
generateAllPages();