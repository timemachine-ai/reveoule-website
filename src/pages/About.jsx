/**
 * About Page
 * Brand story and philosophy
 */

import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import './About.css';

const About = () => {
  const values = [
    {
      title: 'Scientific Excellence',
      description: 'Every formulation is backed by rigorous research and clinical validation, ensuring measurable results.'
    },
    {
      title: 'Sustainable Luxury',
      description: 'We combine premium quality with environmental responsibility, sourcing ethically and sustainably.'
    },
    {
      title: 'Timeless Elegance',
      description: 'Our products honor the art of skincare with refined aesthetics and exceptional sensorial experiences.'
    },
    {
      title: 'Proven Efficacy',
      description: 'Results-driven formulations that deliver visible improvements through advanced active ingredients.'
    }
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <span className="about-hero__eyebrow">Our Story</span>
            <h1 className="about-hero__title">Rêveoulé</h1>
            <p className="about-hero__subtitle">Where Science Meets Timeless Beauty</p>
            <p className="about-hero__description">
              Founded on the principle that luxury skincare should deliver transformative results,
              Rêveoulé represents the intersection of cutting-edge science and refined elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="about-philosophy">
        <div className="container">
          <div className="about-philosophy__content">
            <h2 className="about-philosophy__title">Our Philosophy</h2>
            <p className="about-philosophy__text">
              At Rêveoulé, we believe skincare is both an art and a science. Each product is
              meticulously crafted to honor your skin's natural intelligence while delivering
              precision-targeted solutions. We combine the finest ingredients with advanced
              delivery systems, creating formulations that respect your skin's delicate balance
              while achieving visible, lasting results.
            </p>
            <p className="about-philosophy__text">
              Our commitment extends beyond efficacy. Every aspect of the Rêveoulé experience—from
              formulation to packaging—reflects our dedication to sustainability, ethical sourcing,
              and timeless elegance. We create products that enhance not only your skin but also
              your daily ritual.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <h2 className="about-values__title">Our Values</h2>
          </div>

          <div className="about-values__grid">
            {values.map((value, index) => (
              <div key={index}>
                <Card variant="white">
                  <div className="about-value">
                    <h3 className="about-value__title">{value.title}</h3>
                    <p className="about-value__description">{value.description}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__content">
            <h2 className="about-cta__title">Experience Rêveoulé</h2>
            <p className="about-cta__description">
              Discover how precision formulation and timeless elegance can transform your skincare routine.
            </p>
            <div className="about-cta__actions">
              <Button variant="primary" size="large" href="/products">
                Explore Collection
              </Button>
              <Button variant="secondary" size="large" href="/contact">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
