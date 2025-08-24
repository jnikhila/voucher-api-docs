<div class="hero-section">
    <h1 class="hero-title">Voucher API</h1>
    <p class="hero-subtitle">The Voucher API provides endpoints to create, manage, and track promotional discounts.</p>
    <div class="hero-cta">
        <a href="/guides/quick-start" class="hero-button primary">Start Building</a>
        <a href="#quick-start" class="hero-button secondary">View Examples</a>
    </div>
</div>

## Why Choose Voucher API?

Transform your promotional strategy with an API built for scale, reliability, and developer productivity. From startup flash sales to enterprise loyalty programs, we power discount experiences that convert.

<div class="features-grid">
    <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3 class="feature-title">Smart Targeting</h3>
        <p class="feature-description">Create sophisticated targeting rules based on customer segments, purchase history, geographic location, and custom attributes.</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3 class="feature-title">Real-time Analytics</h3>
        <p class="feature-description">Track campaign performance, conversion rates, and ROI with detailed analytics. A/B test different discount strategies effortlessly.</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3 class="feature-title">Lightning Fast</h3>
        <p class="feature-description">Sub-50ms response times globally with 99.9% uptime SLA. Built on modern infrastructure with automatic scaling and redundancy.</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3 class="feature-title">Enterprise Security</h3>
        <p class="feature-description">Bank-grade security with SOC 2 compliance, end-to-end encryption, and comprehensive audit logs for all operations.</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🌐</div>
        <h3 class="feature-title">Global Scale</h3>
        <p class="feature-description">Multi-currency support, localized validation rules, and timezone-aware campaigns. Deploy promotions across 150+ countries instantly.</p>
    </div>
    <div class="feature-card">
        <div class="feature-icon">🛠️</div>
        <h3 class="feature-title">Developer Experience</h3>
        <p class="feature-description">Comprehensive SDKs, interactive API explorer, webhook integrations, and detailed error handling. Build faster, debug easier.</p>
    </div>
</div>

## Discount Types

Build any promotional scenario with our flexible discount engine:

<div class="api-endpoint">
<h3>Percentage Discounts</h3>
<p>Classic percentage-based discounts with advanced conditional logic</p>
<div class="endpoint-url">20% off orders over $50 • Buy 2 get 15% off • Student discounts</div>
</div>

<div class="api-endpoint">
<h3>Fixed Amount Discounts</h3>
<p>Dollar-value discounts with currency conversion and regional pricing</p>
<div class="endpoint-url">$10 off • Free shipping • Bulk order discounts</div>
</div>

<div class="api-endpoint">
<h3>BOGO & Tiered Offers</h3>
<p>Complex promotional logic for sophisticated marketing campaigns</p>
<div class="endpoint-url">Buy 2 Get 1 Free • Volume discounts • Progressive tiers</div>
</div>

<div class="quick-start-section" id="quick-start">
<h2 class="quick-start-title">Get Started in Minutes</h2>
<p class="quick-start-subtitle">Create your first voucher with a simple API call. No complex setup required.</p>

<div class="code-showcase">
<div class="code-showcase-header">
<span class="code-showcase-title">Create a Welcome Voucher</span>
<div class="code-showcase-tabs">
<span class="code-showcase-tab active">cURL</span>
<span class="code-showcase-tab">JavaScript</span>
<span class="code-showcase-tab">Python</span>
</div>
</div>

```bash
curl -X POST "https://api.voucher.com/v1/vouchers" \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "code": "WELCOME20",
    "type": "percentage", 
    "value": 20,
    "conditions": {
      "min_order_value": 5000,
      "max_uses": 1000,
      "valid_until": "2024-12-31T23:59:59Z",
      "customer_limit": 1
    },
    "metadata": {
      "campaign": "new_customer_welcome",
      "source": "landing_page"
    }
  }'
```
</div>

<div class="response-section">
<h4>Response</h4>
<div class="response-note">
Voucher created successfully! Your customers can now use code <strong>WELCOME20</strong> for 20% off orders over $50.
</div>
</div>
</div>