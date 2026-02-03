

export default function Order() {
  return (
    <div className="order-page">
      <h1 className="order-title">Your order is being prepared</h1>

      {/* Progress Tracker */}
      <div className="tracker">
        <div className="step done">
          <span className="circle">✓</span>
          <p>Placed</p>
        </div>

        <div className="line done"></div>

        <div className="step done">
          <span className="circle">✓</span>
          <p>Baked</p>
        </div>

        <div className="line active"></div>

        <div className="step active">
          <span className="circle">✓</span>
          <p>Quality Check</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <span className="circle">✓</span>
          <p>Delivered</p>
        </div>
      </div>

      {/* Status Card */}
      <div className="status-card">
        <h3>👨‍🍳 Our chef is checking your order for quality</h3>
        <p>Please relax while we prepare your food fresh.</p>
      </div>

      {/* Footer Text */}
      <p className="footer-text">Good food takes time.</p>
    </div>
  );
}
