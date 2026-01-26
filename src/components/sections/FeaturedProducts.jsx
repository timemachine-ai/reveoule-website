/**
 * Featured Products Section
 * Luxury product showcase with elegant presentation
 */

import Button from '../ui/Button';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Radiance Renewal Serum',
      category: 'Serum',
      description: 'Advanced peptide complex for visible skin transformation.',
      price: '$285',
      benefits: ['Brightening', 'Anti-Aging', 'Hydration']
    },
    {
      id: 2,
      name: 'Velvet Touch Moisturizer',
      category: 'Moisturizer',
      description: 'Ultra-luxe hydration with botanical ceramides.',
      price: '$245',
      benefits: ['Deep Hydration', 'Barrier Support', 'Smoothing']
    },
    {
      id: 3,
      name: 'Luminous Eye Concentrate',
      category: 'Eye Care',
      description: 'Precision-targeted treatment for delicate eye area.',
      price: '$195',
      benefits: ['Dark Circles', 'Fine Lines', 'Firmness']
    },
    {
      id: 4,
      name: 'Pure Essence Cleanser',
      category: 'Cleanser',
      description: 'Gentle yet effective clarifying treatment.',
      price: '$165',
      benefits: ['Deep Cleansing', 'pH Balance', 'Softening']
    }
  ];

  return (
    <section className="featured-products">
      <div className="featured-products__container container">
        <div className="featured-products__header">
          <span className="featured-products__eyebrow">Bestsellers</span>
          <h2 className="featured-products__title">Featured Collection</h2>
          <p className="featured-products__description">
            Meticulously crafted formulations representing the pinnacle of skincare innovation.
          </p>
        </div>

        <div className="featured-products__grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="featured-products__item"
            >
              <div className="product-card">
                <div className="product-card__image">
                  <div className="product-card__image-placeholder">
                    <span className="product-card__category">{product.category}</span>
                  </div>
                </div>

                <div className="product-card__content">
                  <div className="product-card__header">
                    <h3 className="product-card__name">{product.name}</h3>
                    <span className="product-card__price">{product.price}</span>
                  </div>

                  <p className="product-card__description">{product.description}</p>

                  <div className="product-card__benefits">
                    {product.benefits.map((benefit, index) => (
                      <span key={index} className="product-card__benefit">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <Button variant="secondary" size="small" className="product-card__button">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="featured-products__footer">
          <Button variant="primary" size="large" href="/products">
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
