import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Printer,
} from "lucide-react";
import "./styles.css";

const CafePOS = () => {
  const menuData = {
    Cafe: [
      { name: "Cafe đen (cafe hạt)", price: 25000 },
      { name: "Cafe sữa", price: 27000 },
      { name: "Bạc xỉu", price: 28000 },
    ],
    "Đặc Biệt": [
      { name: "Sâm bổ lượng hạt đất", price: 35000 },
      { name: "Rau má đậu xanh", price: 22000 },
      { name: "Sữa đậu xanh hạt đất", price: 25000 },
    ],
    "Giải Nhiệt": [
      { name: "Sâm la hán quả bổng cúc bí đao h.chia", price: 25000 },
      { name: "Mủ trôm mủ gòn hạt đất", price: 25000 },
      { name: "Nha đam hạt chia hạt đất", price: 25000 },
      { name: "Cacao sữa đá", price: 25000 },
      { name: "Socola sữa đá", price: 25000 },
      { name: "Chanh muối cam thảo", price: 25000 },
      { name: "Xí muội mơ", price: 25000 },
      { name: "Tắc xí muội", price: 25000 },
      { name: "Đá me dẻo", price: 25000 },
    ],
    Yaourt: [
      { name: "Yaourt đá", price: 25000 },
      { name: "Yaourt hạt đất", price: 25000 },
      { name: "Yaourt dâu", price: 25000 },
      { name: "Yaourt ổi", price: 25000 },
      { name: "Yaourt việt quất", price: 25000 },
      { name: "Yaourt kiwi", price: 25000 },
      { name: "Yaourt sâm dứa", price: 25000 },
      { name: "Yaourt socola", price: 25000 },
      { name: "Yaourt cafe", price: 25000 },
      { name: "Yaourt bạc hà", price: 25000 },
      { name: "Yaourt cam", price: 25000 },
      { name: "Yaourt dâu tầm", price: 25000 },
    ],
    "Trà Sữa": [
      { name: "Trà sữa truyền thống", price: 30000, maxPrice: 35000 },
      { name: "Trà sữa matcha", price: 30000, maxPrice: 35000 },
      { name: "Trà ô long sữa", price: 25000 },
      { name: "Sirô đá bào", price: 23000 },
    ],
    "Sữa Tươi": [
      { name: "Sữa tươi cafe", price: 25000 },
      { name: "Sữa sâm dứa", price: 25000 },
      { name: "Sữa ổi hồng", price: 25000 },
      { name: "Sữa việt quất", price: 25000 },
      { name: "Sữa kiwi", price: 25000 },
      { name: "Sữa dâu", price: 25000 },
      { name: "Sữa tươi đường đen", price: 25000 },
    ],
    "Trà Trái Cây": [
      { name: "Trà dâu", price: 25000 },
      { name: "Trà chanh", price: 25000 },
      { name: "Trà vải", price: 25000 },
      { name: "Trà việt quất", price: 25000 },
      { name: "Trà măng cầu", price: 25000 },
      { name: "Trà ổi hồng", price: 25000 },
      { name: "Trà bí đao", price: 25000 },
      { name: "Trà đào", price: 25000 },
    ],
    "Trà Nóng": [
      { name: "Trà hoa cúc hạt chia", price: 22000 },
      { name: "Trà lipton hạt chia", price: 20000 },
      { name: "Trà ô long", price: 22000 },
    ],
    "Sinh Tố": [
      { name: "Sinh tố măng cầu", price: 30000 },
      { name: "Sinh tố bơ", price: 30000 },
      { name: "Sinh tố việt quất", price: 30000 },
      { name: "Sinh tố kiwi", price: 30000 },
      { name: "Sinh tố vải", price: 30000 },
      { name: "Sinh tố sapoche", price: 30000 },
      { name: "Sinh tố dâu", price: 30000 },
      { name: "Sinh tố khoai môn", price: 30000 },
      { name: "Sinh tố chanh dây", price: 30000 },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerPaid, setCustomerPaid] = useState("");
  const [displayPaid, setDisplayPaid] = useState("");
  const [dailySales, setDailySales] = useState([]);
  const [activeTab, setActiveTab] = useState("pos"); // 'pos' or 'stats'

  const allItems = useMemo(() => {
    const items = [];
    Object.entries(menuData).forEach(([category, products]) => {
      products.forEach((product) => {
        items.push({ ...product, category });
      });
    });
    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return allItems;
    return allItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allItems]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemName, delta) => {
    setCart(
      cart
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter((item) => item.name !== itemName));
  };

  const clearCart = () => {
    // Lưu đơn hàng vào thống kê trước khi xóa
    if (cart.length > 0) {
      const order = {
        id: Date.now(),
        items: JSON.parse(JSON.stringify(cart)),
        total: total,
        paid: parseFloat(customerPaid) || 0,
        change: (parseFloat(customerPaid) || 0) - total,
        timestamp: new Date().toLocaleString("vi-VN"),
      };
      setDailySales((prev) => [...prev, order]);
    }

    setCart([]);
    setCustomerPaid("");
    setDisplayPaid("");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const paidAmount = parseFloat(customerPaid) || 0;
  const changeAmount = paidAmount - total;

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  const handlePaidChange = (e) => {
    const value = e.target.value;
    // Chỉ cho phép số
    const numbersOnly = value.replace(/\D/g, "");

    // Lưu giá trị số thuần
    setCustomerPaid(numbersOnly);

    // Format với dấu chấm để hiển thị
    if (numbersOnly) {
      setDisplayPaid(parseInt(numbersOnly).toLocaleString("vi-VN"));
    } else {
      setDisplayPaid("");
    }
  };

  const printReceipt = () => {
    const savedPaid = customerPaid;
    const savedTotal = total;
    const savedCart = JSON.parse(JSON.stringify(cart));
    const savedChange = parseFloat(savedPaid || 0) - savedTotal;
    const savedDate = new Date().toLocaleString("vi-VN");

    let receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Phiếu Bán Hàng</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Courier New', monospace; padding: 20px; max-width: 400px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 15px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { font-size: 16px; margin: 5px 0; }
          .datetime { font-size: 12px; margin-top: 5px; color: #666; }
          .items { margin: 15px 0; }
          .items-header { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; padding: 8px 0; border-bottom: 1px solid #000; font-weight: bold; font-size: 13px; }
          .item { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; padding: 8px 0; border-bottom: 1px dashed #ccc; align-items: start; }
          .item-name { font-weight: bold; font-size: 13px; }
          .item-qty { text-align: center; font-size: 13px; }
          .item-price { text-align: right; font-size: 13px; font-weight: bold; }
          .item-detail { grid-column: 1 / -1; font-size: 11px; color: #666; margin-top: 3px; }
          .total-section { margin-top: 15px; border-top: 2px dashed #000; padding-top: 10px; }
          .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
          .grand-total { font-size: 20px; font-weight: bold; margin: 10px 0; }
          .payment { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; }
          .footer { text-align: center; margin-top: 20px; border-top: 2px dashed #000; padding-top: 10px; }
          @media print { 
            body { padding: 10px; }
            @page { margin: 10mm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">☕ CAFE LANG HOA</div>
          <div class="subtitle">PHIẾU BÁN HÀNG</div>
          <div class="datetime">${savedDate}</div>
        </div>
        
        <div class="items">
          <div class="items-header">
            <div>Tên món</div>
            <div style="text-align: center;">SL</div>
            <div style="text-align: right;">Thành tiền</div>
          </div>
    `;

    savedCart.forEach((item) => {
      receiptHTML += `
        <div class="item">
          <div class="item-name">${item.name}</div>
          <div class="item-qty">${item.quantity}</div>
          <div class="item-price">${(item.price * item.quantity).toLocaleString(
            "vi-VN"
          )}đ</div>
          <div class="item-detail">${item.price.toLocaleString("vi-VN")}đ × ${
        item.quantity
      }</div>
        </div>
      `;
    });

    receiptHTML += `
        </div>
        
        <div class="total-section">
          <div class="total-row">
            <span>Tổng số món:</span>
            <span>${savedCart.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}</span>
          </div>
          <div class="total-row grand-total">
            <span>TỔNG TIỀN:</span>
            <span>${savedTotal.toLocaleString("vi-VN")}đ</span>
          </div>
    `;

    if (savedPaid && parseFloat(savedPaid) > 0) {
      receiptHTML += `
          <div class="payment">
            <div class="total-row">
              <span>Tiền khách đưa:</span>
              <span>${parseFloat(savedPaid).toLocaleString("vi-VN")}đ</span>
            </div>
            <div class="total-row" style="font-weight: bold; font-size: 16px;">
              <span>Tiền thối:</span>
              <span>${savedChange.toLocaleString("vi-VN")}đ</span>
            </div>
          </div>
      `;
    }

    receiptHTML += `
        </div>
        
        <div class="footer">
          <div>Cảm ơn quý khách!</div>
          <div>Hẹn gặp lại!</div>
        </div>
      </body>
      </html>
    `;

    const printFrame = document.createElement("iframe");
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(receiptHTML);
    doc.close();

    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    }, 500);

    // Lưu đơn hàng vào thống kê và xóa giỏ hàng
    const order = {
      id: Date.now(),
      items: savedCart,
      total: savedTotal,
      paid: parseFloat(savedPaid) || 0,
      change: savedChange,
      timestamp: savedDate,
    };
    setDailySales((prev) => [...prev, order]);

    // Xóa giỏ hàng sau khi in
    setTimeout(() => {
      setCart([]);
      setCustomerPaid("");
      setDisplayPaid("");
    }, 100);
  };

  return (
    <div className="cafe-pos-container">
      <div className="cafe-pos-wrapper">
        <div className="cafe-pos-card">
          <div className="cafe-pos-header">
            <h1 className="cafe-pos-title">☕ Cafe Lang Hoa</h1>
            <p className="cafe-pos-subtitle">Hệ Thống Tính Tiền</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === "pos" ? "active" : ""}`}
              onClick={() => setActiveTab("pos")}
            >
              <ShoppingCart size={20} />
              Bán Hàng
            </button>
            <button
              className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
              onClick={() => setActiveTab("stats")}
            >
              📊 Thống Kê ({dailySales.length})
            </button>
          </div>

          {/* POS Tab */}
          {activeTab === "pos" && (
            <div className="cafe-pos-grid">
              <div className="search-section">
                <div className="search-wrapper">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm món..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="menu-container">
                  <h2 className="menu-title">Menu</h2>
                  {Object.entries(menuData).map(([category, items]) => {
                    const categoryItems = items.filter(
                      (item) =>
                        !searchTerm ||
                        item.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    );

                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={category} className="category-section">
                        <h3 className="category-title">{category}</h3>
                        <div className="category-items">
                          {categoryItems.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => addToCart(item)}
                              className="menu-item"
                            >
                              <span className="menu-item-name">
                                {item.name}
                              </span>
                              <span className="menu-item-price">
                                {item.maxPrice
                                  ? `${formatCurrency(
                                      item.price
                                    )} - ${formatCurrency(item.maxPrice)}`
                                  : formatCurrency(item.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="cart-section">
                <div className="cart-container">
                  <div className="cart-header">
                    <h2 className="cart-title">
                      <ShoppingCart size={24} />
                      Phiếu Tính Tiền
                    </h2>
                    {cart.length > 0 && (
                      <button onClick={clearCart} className="clear-cart-btn">
                        <Trash2 size={18} />
                        Xóa hết
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="cart-empty">
                      <ShoppingCart size={48} className="cart-empty-icon" />
                      <p>Chưa có món nào được chọn</p>
                    </div>
                  ) : (
                    <div className="cart-items">
                      {cart.map((item, idx) => (
                        <div key={idx} className="cart-item">
                          <div className="cart-item-header">
                            <span className="cart-item-name">{item.name}</span>
                            <button
                              onClick={() => removeFromCart(item.name)}
                              className="remove-item-btn"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="cart-item-controls">
                            <div className="quantity-controls">
                              <button
                                onClick={() => updateQuantity(item.name, -1)}
                                className="quantity-btn minus"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="quantity-display">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.name, 1)}
                                className="quantity-btn plus"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <div className="cart-item-pricing">
                              <div className="cart-item-unit-price">
                                {formatCurrency(item.price)} × {item.quantity}
                              </div>
                              <div className="cart-item-total-price">
                                {formatCurrency(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="total-section">
                    <div className="total-container">
                      <div className="total-row items-count">
                        <span className="label">Tổng số món:</span>
                        <span className="value">
                          {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      </div>
                      <div className="total-row grand-total">
                        <span className="label">Tổng tiền:</span>
                        <span className="value">{formatCurrency(total)}</span>
                      </div>
                      <div className="payment-input-group">
                        <label className="payment-label">Tiền khách đưa:</label>
                        <input
                          type="text"
                          value={displayPaid}
                          onChange={handlePaidChange}
                          className="payment-input"
                          placeholder="Nhập số tiền..."
                        />
                      </div>

                      {paidAmount > 0 && (
                        <div className="change-row">
                          <span className="label">Tiền thối:</span>
                          <span className="value">
                            {formatCurrency(changeAmount)}
                          </span>
                        </div>
                      )}
                    </div>

                    <button onClick={printReceipt} className="print-btn">
                      <Printer size={24} />
                      <span>IN PHIẾU BÁN HÀNG</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === "stats" && (
            <div className="daily-stats-section">
              <div className="stats-header">
                <h2 className="stats-title">📊 Thống Kê Bán Hàng Trong Ngày</h2>
                {/* <button
                  onClick={() => setDailySales([])}
                  className="reset-stats-btn"
                >
                  Xóa thống kê
                </button> */}
              </div>

              {dailySales.length === 0 ? (
                <div className="no-stats">
                  <div className="no-stats-icon">📊</div>
                  <p>Chưa có đơn hàng nào trong ngày</p>
                  <button
                    className="back-to-pos-btn"
                    onClick={() => setActiveTab("pos")}
                  >
                    Quay lại bán hàng
                  </button>
                </div>
              ) : (
                <>
                  <div className="stats-summary">
                    <div className="stat-card">
                      <div className="stat-label">Tổng đơn hàng</div>
                      <div className="stat-value">{dailySales.length}</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">Tổng món đã bán</div>
                      <div className="stat-value">
                        {dailySales.reduce(
                          (sum, order) =>
                            sum +
                            order.items.reduce(
                              (itemSum, item) => itemSum + item.quantity,
                              0
                            ),
                          0
                        )}
                      </div>
                    </div>
                    <div className="stat-card highlight">
                      <div className="stat-label">Tổng doanh thu</div>
                      <div className="stat-value">
                        {formatCurrency(
                          dailySales.reduce(
                            (sum, order) => sum + order.total,
                            0
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="orders-list">
                    <h3 className="orders-list-title">Chi tiết đơn hàng</h3>
                    {dailySales
                      .slice()
                      .reverse()
                      .map((order, idx) => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <span className="order-number">
                              Đơn #{dailySales.length - idx}
                            </span>
                            <span className="order-time">
                              {order.timestamp}
                            </span>
                          </div>
                          <div className="order-items">
                            {order.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="order-item-row">
                                <span>{item.name}</span>
                                <span>x{item.quantity}</span>
                                <span>
                                  {formatCurrency(item.price * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="order-total">
                            <span>Tổng tiền:</span>
                            <span className="order-total-amount">
                              {formatCurrency(order.total)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafePOS;
