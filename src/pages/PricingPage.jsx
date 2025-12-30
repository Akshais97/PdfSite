import '../styles/pages.css';

export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      name: 'Professional',
      price: '$19.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['All Features', 'Priority Support', 'Custom Integration'],
    },
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Pricing</h1>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className="pricing-card">
              <h2>{plan.name}</h2>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="plan-btn">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
