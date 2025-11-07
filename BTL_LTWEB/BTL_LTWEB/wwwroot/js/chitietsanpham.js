var nameProduct, maProduct, sanPhamHienTai; // Tên sản phẩm trong trang này, 
// là biến toàn cục để có thể dùng ở bất cứ đâu

function initChiTietSanPham() {
    khoiTao();
    var tags = ["Samsung", "iPhone", "Huawei", "Oppo"];
    for (var t of tags) addTags(t, "/?search=" + t, true);  // Sửa URL
    phanTich_URL_chiTietSanPham();
    autocomplete(document.getElementById('search-box'), list_products);
    sanPhamHienTai && suggestion();
}

function khongTimThaySanPham() {
    document.getElementById('productNotFound').style.display = 'block';
    document.getElementsByClassName('chitietSanpham')[0].style.display = 'none';
}

async function phanTich_URL_chiTietSanPham() {
    nameProduct = decodeURIComponent(window.location.href.split('?')[1] || '').replace(/-/g, ' ');
    if (!nameProduct) return khongTimThaySanPham();
    var productsArray = list_products;
    for (var p of productsArray) {
        if (p.name.toLowerCase() === nameProduct.toLowerCase()) {
            maProduct = p.masp;
            break;
        }
    }
    sanPhamHienTai = await timKiemTheoMa(null, maProduct);
    if (!sanPhamHienTai) return khongTimThaySanPham();

    var divChiTiet = document.getElementsByClassName('chitietSanpham')[0];
    document.title = (nameProduct || '') + ' - Thế giới điện thoại';
    var h1 = divChiTiet.getElementsByTagName('h1')[0];
    h1.innerHTML += nameProduct || '';

    // Cập nhật sao
    var rating = "";
    if ((sanPhamHienTai.rateCount || 0) > 0) {
        for (var i = 1; i <= 5; i++) {
            if (i <= (sanPhamHienTai.star || 0)) {
                rating += `<i class="fa fa-star"></i>`;
            } else {
                rating += `<i class="fa fa-star-o"></i>`;
            }
        }
        rating += `<span> ` + (sanPhamHienTai.rateCount || 0) + ` đánh giá</span>`;
    }
    divChiTiet.getElementsByClassName('rating')[0].innerHTML += rating;


    // Cập nhật giá + label khuyến mãi
    var price = divChiTiet.getElementsByClassName('area_price')[0];
    if (sanPhamHienTai.promo?.name != 'giareonline') {
        price.innerHTML = `<strong>` + (sanPhamHienTai.price || '') + `₫</strong>`;
        price.innerHTML += new Promo(sanPhamHienTai.promo?.name || '', sanPhamHienTai.promo?.value || '').toWeb();
    } else {
        document.getElementsByClassName('ship')[0].style.display = '';
        price.innerHTML = `<strong>` + (sanPhamHienTai.promo?.value || '') + `&#8363;</strong>
                        <span>` + (sanPhamHienTai.price || '') + `&#8363;</span>`;
    }
    document.getElementById('detailPromo').innerHTML = getDetailPromo(sanPhamHienTai);

    // Cập nhật thông số
    var info = document.getElementsByClassName('info')[0];
    var s = addThongSo('Màn hình', sanPhamHienTai.detail?.screen || '');
    s += addThongSo('Camera sau', sanPhamHienTai.detail?.camera || '');
    s += addThongSo('Camera trước', sanPhamHienTai.detail?.cameraFront || '');
    s += addThongSo('CPU', sanPhamHienTai.detail?.cpu || '');
    s += addThongSo('RAM', sanPhamHienTai.detail?.ram || '');
    s += addThongSo('Bộ nhớ trong', sanPhamHienTai.detail?.rom || '');
    s += addThongSo('Kháng nước, kháng bụi', sanPhamHienTai.detail?.waterProof || '');
    s += addThongSo('Dung lượng pin', sanPhamHienTai.detail?.battery || '');
    info.innerHTML = s;
    var hinh = divChiTiet.getElementsByClassName('picture')[0].getElementsByTagName('img')[0];
    hinh.src = sanPhamHienTai.img || '';
    document.getElementById('bigimg').src = sanPhamHienTai.img || '';


    // Hình nhỏ
    addSmallImg("~/img/products/huawei-mate-20-pro-green-600x600.jpg");
    addSmallImg("~/img/chitietsanpham/oppo-f9-mau-do-1-org.jpg");
    addSmallImg("~/img/chitietsanpham/oppo-f9-mau-do-2-org.jpg");
    addSmallImg("~/img/chitietsanpham/oppo-f9-mau-do-3-org.jpg");
    addSmallImg("~/img/products/huawei-mate-20-pro-green-600x600.jpg");
    addSmallImg("~/img/chitietsanpham/oppo-f9-mau-do-3-org.jpg");
    addSmallImg("~/img/products/huawei-mate-20-pro-green-600x600.jpg");

    // Khởi động thư viện hỗ trợ banner - chỉ chạy sau khi tạo xong hình nhỏ
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 5,
        center: true,
        smartSpeed: 450,
    });
}

// Chi tiết khuyến mãi
function getDetailPromo(sp) {
    switch (sp.promo.name) {
        case 'tragop':
            var span = `<span style="font-weight: bold"> lãi suất ` + sp.promo.value + `% </span>`;
            return `Khách hàng có thể mua trả góp sản phẩm với ` + span + `với thời hạn 6 tháng kể từ khi mua hàng.`;

        case 'giamgia':
            var span = `<span style="font-weight: bold">` + sp.promo.value + `</span>`;
            return `Khách hàng sẽ được giảm ` + span + `₫ khi tới mua trực tiếp tại cửa hàng`;

        case 'moiramat':
            return `Khách hàng sẽ được thử máy miễn phí tại cửa hàng. Có thể đổi trả lỗi trong vòng 2 tháng.`;

        case 'giareonline':
            var del = stringToNum(sp.price) - stringToNum(sp.promo.value);
            var span = `<span style="font-weight: bold">` + numToString(del) + `</span>`;
            return `Sản phẩm sẽ được giảm ` + span + `₫ khi mua hàng online bằng thẻ VPBank hoặc tin nhắn SMS`;

        default:
            var span = `<span style="font-weight: bold">61 xe Wave Alpha</span>`;
            return `Cơ hội trúng ` + span + ` khi trả góp Home Credit`;
    }
}

function addThongSo(ten, giatri) {
    return `<li>
                <p>` + ten + `</p>
                <div>` + giatri + `</div>
            </li>`;
}

// add hình
function addSmallImg(img) {
    var newDiv = `<div class='item'>
                        <a>
                            <img src=` + img + ` onclick="changepic(this.src)">
                        </a>
                    </div>`;
    var banner = document.getElementsByClassName('owl-carousel')[0];
    banner.innerHTML += newDiv;
}

// đóng mở xem hình
function opencertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(1)";
}

function closecertain() {
    document.getElementById("overlaycertainimg").style.transform = "scale(0)";
}

// đổi hình trong chế độ xem hình
function changepic(src) {
    document.getElementById("bigimg").src = src;
}

// gợi ý sản phẩm
function suggestion() {
    const giaSanPhamHienTai = stringToNum(sanPhamHienTai.price || '0');
    var productsArray = list_products.$values || list_products;
    const sanPhamTuongTu = productsArray
        .filter(_ => _.masp !== sanPhamHienTai.masp)
        .map(sanPham => {
            const giaSanPham = stringToNum(sanPham.price || '0');
            let giaTienGanGiong = Math.abs(giaSanPham - giaSanPhamHienTai) < 1000000;
            let soLuongChiTietGiongNhau = 0;
            if (sanPham.detail && sanPhamHienTai.detail) {
                for (let key in sanPham.detail) {
                    if (sanPham.detail[key] == sanPhamHienTai.detail[key]) soLuongChiTietGiongNhau++;
                }
            }
            let giongThongSoKyThuat = soLuongChiTietGiongNhau >= 3;
            let cungHangSanXuat = sanPham.company === sanPhamHienTai.company;
            let cungLoaiKhuyenMai = sanPham.promo?.name === sanPhamHienTai.promo?.name;
            let soDanhGia = Number.parseInt(sanPham.rateCount || 0, 10);
            let soSao = Number.parseInt(sanPham.star || 0, 10);
            let diem = 0;
            if (giaTienGanGiong) diem += 20;
            if (giongThongSoKyThuat) diem += soLuongChiTietGiongNhau;
            if (cungHangSanXuat) diem += 15;
            if (cungLoaiKhuyenMai) diem += 10;
            if (soDanhGia > 0) diem += (soDanhGia + '').length;
            diem += soSao;
            return { ...sanPham, diem };
        })
        .sort((a, b) => b.diem - a.diem)
        .slice(0, 10);
    if (sanPhamTuongTu.length) {
        let div = document.getElementById('goiYSanPham');
        addKhungSanPham_List(sanPhamTuongTu, 'Bạn có thể thích', ['#434aa8', '#ec1f1f'], div);
    }
}

// Thêm sản phẩm vào các khung sản phẩm (chi tiết page version)
// Renamed to avoid colliding with trangchu.js addKhungSanPham
function addKhungSanPham_List(list_sanpham, tenKhung, color, ele) {
    // convert color to code
    var gradient = `background-image: linear-gradient(120deg, ` + color[0] + ` 0%, ` + color[1] + ` 50%, ` + color[0] + ` 100%);`
    var borderColor = `border-color: ` + color[0];
    var borderA = `    border-left: 2px solid ` + color[0] + `;
                    border-right: 2px solid ` + color[0] + `;`;

    // mở tag
    var s = `<div class="khungSanPham" style="` + borderColor + `">
                <h3 class="tenKhung" style="` + gradient + `">* ` + tenKhung + ` *</h3>
                <div class="listSpTrongKhung flexContain">`;

        for (var i = 0; i < list_sanpham.length; i++) {
            s += addProduct(list_sanpham[i], null, true);
        }

    // đóng tag
    s += `    </div>
            </div>`;

    // thêm khung vào contain-khung
    ele.innerHTML += s;
}