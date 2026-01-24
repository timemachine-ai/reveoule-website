/**
 * Hero Section
 * Fiverr Pro-inspired card-based hero with tabs
 */

import { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('ai-advisor');

  // AI Advisor state
  const [advisorStep, setAdvisorStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState('');
  const [goals, setGoals] = useState('');
  const [aboutYourself, setAboutYourself] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const tabs = [
    { id: 'ai-advisor', label: 'AI Advisor' },
    { id: 'search-product', label: 'Search a product' },
    { id: 'affiliate', label: 'Affiliate program' },
  ];

  const skinTypes = [
    'Normal',
    'Dry',
    'Oily',
    'Combination',
    'Sensitive'
  ];

  const skinConcerns = [
    'Fine Lines & Wrinkles',
    'Dark Spots',
    'Acne & Blemishes',
    'Dehydration',
    'Uneven Texture',
    'Sensitivity & Redness'
  ];

  const skinGoals = [
    'Anti-Aging',
    'Brightening',
    'Firming & Lifting',
    'Clarifying & Purifying',
    'Calming & Soothing'
  ];

  const systemPrompt = `Identity: You are TimeMachine Contour, the Official AI Advisor for REVEOULE. Your mission is to help users achieve their healthiest, most radiant skin through science-backed advice, personalized product recommendations, and expert-level skincare education. You bridge the gap between clinical expertise and a luxury boutique experience.

Tone & Personality:

    Sophisticated yet Accessible: Use professional terminology (e.g., "transepidermal water loss," "sebum production") but explain it simply.

    Skin-Positive: Never shame a user for their skin concerns. Focus on "skin health" and "confidence" rather than "perfection."

    Empathetic: Acknowledge that skin issues can be frustrating and personal.

    Transparent: If a concern sounds like a medical condition (like cystic acne or suspicious moles), always recommend consulting a dermatologist.

Knowledge Domains:

    Ingredients: Deep knowledge of actives (Retinol, Vitamin C, AHAs/BHAs, Hyaluronic Acid, Niacinamide, Peptides).

    Skin Types: Identifying and treating Oily, Dry, Combination, Sensitive, and Mature skin.

    The REVEOULE Catalog: (In practice, you will prioritize REVEOULE products when suggesting routines).

    Lifestyle Factors: How sleep, hydration, diet, and UV exposure affect the "TimeMachine" (aging) process.

Interaction Guidelines:

    The Consultation Phase: Before giving a full routine, ask clarifying questions about the user's skin type, current concerns (e.g., fine lines, texture, breakouts), and any known sensitivities.

    The "Routine Builder" Format: When suggesting products, organize them by:

        Cleanse

        Treat (Serums/Actives)

        Moisturize

        Protect (SPF)

    Expert Tips: Always include a "Pro-Tip" regarding application (e.g., "Apply hyaluronic acid to damp skin for maximum absorption").

Constraints:

    Always emphasize the importance of daily SPF.

    Discourage "cocktailing" too many harsh actives (like mixing Retinol with high-strength Vitamin C) in the same session.

    Stay true to the REVEOULE brand voice: elegant, efficient, and timeless.`;

  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      setAdvisorStep(1);
    }
  };

  const handleSkinTypeSelect = (type) => {
    setSkinType(type);
    setAdvisorStep(2);
  };

  const handleConcernSelect = (concern) => {
    setConcerns(concern);
    setAdvisorStep(3);
  };

  const handleGoalSelect = (goal) => {
    setGoals(goal);
    setAdvisorStep(4);
  };

  const handleAIAdvisorSubmit = async () => {
    setIsLoading(true);

    // Build the structured prompt
    const userPrompt = `My name is ${nickname}. My skin type is ${skinType}. My primary concern is ${concerns}. My skincare goal is ${goals}. ${aboutYourself ? `Additional information: ${aboutYourself}` : ''}`;

    try {
      const encodedPrompt = encodeURIComponent(userPrompt);
      const encodedSystem = encodeURIComponent(systemPrompt);

      const url = `https://gen.pollinations.ai/text/${encodedPrompt}?model=gemini&system=${encodedSystem}&json=false&temperature=1&stream=false&private=true&key=sk_eAD9ea8AUrzEZlDVgwiwMWTK03mqt1FA`;

      const response = await fetch(url);
      const aiResponse = await response.text();

      setRecommendation(aiResponse);
      setAdvisorStep(5); // Show results
    } catch (error) {
      console.error('Error getting AI recommendation:', error);
      setRecommendation('Sorry, we encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAdvisor = () => {
    setAdvisorStep(0);
    setNickname('');
    setSkinType('');
    setConcerns('');
    setGoals('');
    setAboutYourself('');
    setRecommendation(null);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'ai-advisor') {
      resetAdvisor();
    }
  };

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__gradient"></div>
      </div>

      <div className="hero__container container">
        <div className="hero__content">
          <h1 className="hero__title">
            Reveal The Secret To <span className="hero__title-luxury">Ageless</span> Beauty Today.
          </h1>

          {/* Tab Buttons */}
          <div className="hero__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`hero__tab ${activeTab === tab.id ? 'hero__tab--active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Card Container */}
          <div className="hero__card">
            {/* AI Advisor Tab */}
            {activeTab === 'ai-advisor' && (
              <div className="hero__tab-content">
                <div className="hero__advisor">
                  {/* Step 0: Nickname */}
                  {advisorStep === 0 && (
                    <div className="hero__advisor-step">
                      <div className="hero__option-group">
                        <label className="hero__option-label">What should we call you?</label>
                        <div className="hero__input-wrapper">
                          <input
                            type="text"
                            className="hero__text-input"
                            placeholder="Your nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleNicknameSubmit()}
                          />
                          <button
                            className="hero__arrow-btn"
                            onClick={handleNicknameSubmit}
                            disabled={!nickname.trim()}
                            aria-label="Continue"
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                              <path d="M5 10h10M12 7l3 3-3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="hero__branding">
                        <span className="hero__branding-text">Powered by</span>
                        <span className="hero__branding-logo">TimeMachine</span>
                      </div>
                    </div>
                  )}

                  {/* Step 1: Skin Type */}
                  {advisorStep === 1 && (
                    <div className="hero__advisor-step">
                      <div className="hero__option-group">
                        <label className="hero__option-label">What's your skin type, {nickname}?</label>
                        <div className="hero__option-buttons">
                          {skinTypes.map((type) => (
                            <button
                              key={type}
                              className={`hero__option-btn ${skinType === type ? 'hero__option-btn--selected' : ''}`}
                              onClick={() => handleSkinTypeSelect(type)}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="hero__branding">
                        <span className="hero__branding-text">Powered by</span>
                        <span className="hero__branding-logo">TimeMachine</span>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Primary Concern */}
                  {advisorStep === 2 && (
                    <div className="hero__advisor-step">
                      <div className="hero__option-group">
                        <label className="hero__option-label">What's your primary skin concern?</label>
                        <div className="hero__option-buttons">
                          {skinConcerns.map((concern) => (
                            <button
                              key={concern}
                              className={`hero__option-btn ${concerns === concern ? 'hero__option-btn--selected' : ''}`}
                              onClick={() => handleConcernSelect(concern)}
                            >
                              {concern}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="hero__branding">
                        <span className="hero__branding-text">Powered by</span>
                        <span className="hero__branding-logo">TimeMachine</span>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Skincare Goal */}
                  {advisorStep === 3 && (
                    <div className="hero__advisor-step">
                      <div className="hero__option-group">
                        <label className="hero__option-label">What's your main skincare goal?</label>
                        <div className="hero__option-buttons">
                          {skinGoals.map((goal) => (
                            <button
                              key={goal}
                              className={`hero__option-btn ${goals === goal ? 'hero__option-btn--selected' : ''}`}
                              onClick={() => handleGoalSelect(goal)}
                            >
                              {goal}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="hero__branding">
                        <span className="hero__branding-text">Powered by</span>
                        <span className="hero__branding-logo">TimeMachine</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Tell About Yourself */}
                  {advisorStep === 4 && (
                    <div className="hero__advisor-step">
                      <div className="hero__option-group">
                        <label className="hero__option-label">Tell us more about yourself (optional)</label>
                        <div className="hero__textarea-wrapper">
                          <textarea
                            className="hero__textarea"
                            placeholder="Share any additional details about your skin, lifestyle, or specific concerns..."
                            value={aboutYourself}
                            onChange={(e) => setAboutYourself(e.target.value)}
                            rows="3"
                          />
                          <button
                            className="hero__arrow-btn hero__arrow-btn--textarea"
                            onClick={handleAIAdvisorSubmit}
                            disabled={isLoading}
                            aria-label={isLoading ? 'Analyzing' : 'Get recommendations'}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                              <path d="M5 10h10M12 7l3 3-3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="hero__branding">
                        <span className="hero__branding-text">Powered by</span>
                        <span className="hero__branding-logo">TimeMachine</span>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Results */}
                  {advisorStep === 5 && recommendation && (
                    <div className="hero__advisor-step hero__advisor-results">
                      <h3 className="hero__results-title">Your Personalized Skincare Recommendation</h3>
                      <div className="hero__results-content">
                        <p>{recommendation}</p>
                      </div>
                      <button
                        className="hero__submit-btn hero__submit-btn--secondary"
                        onClick={resetAdvisor}
                      >
                        Start Over
                      </button>

                      <div className="hero__branding">
                        <span className="hero__branding-text">Powered by</span>
                        <span className="hero__branding-logo">TimeMachine</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Search Product Tab */}
            {activeTab === 'search-product' && (
              <div className="hero__tab-content">
                <div className="hero__search">
                  <div className="hero__option-group">
                    <label className="hero__option-label">Search for a product</label>
                    <div className="hero__input-wrapper">
                      <input
                        type="text"
                        className="hero__text-input"
                        placeholder="Serums, moisturizers, cleansers..."
                      />
                      <button
                        className="hero__arrow-btn"
                        aria-label="Search"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="11" cy="11" r="7" strokeWidth="2" />
                          <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="hero__search-suggestions">
                    <span className="hero__suggestion-label">Popular:</span>
                    <button className="hero__suggestion">Hyaluronic</button>
                    <button className="hero__suggestion">Vitamin C</button>
                    <button className="hero__suggestion">Retinol</button>
                  </div>
                </div>
              </div>
            )}

            {/* Affiliate Program Tab */}
            {activeTab === 'affiliate' && (
              <div className="hero__tab-content">
                <div className="hero__affiliate">
                  <div className="hero__affiliate-content">
                    <h3 className="hero__affiliate-title">Partner with Rêveoulé</h3>

                    <div className="hero__affiliate-benefits">
                      <div className="hero__benefit">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>20% commission</span>
                      </div>
                      <div className="hero__benefit">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Partner resources</span>
                      </div>
                      <div className="hero__benefit">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                          <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Dedicated support</span>
                      </div>
                    </div>

                    <button className="hero__affiliate-btn">Apply Now</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Model Image */}
          <div className="hero__mobile-visual">
            <img
              src="/images/hero-model.png"
              alt="Reveoule Model"
              className="hero__mobile-model-image"
            />
          </div>

          {/* Brands Section */}
          <div className="hero__brands">
            <span className="hero__brands-label">Your French beauty saloon at home</span>
          </div>
        </div>

        {/* Visual Side - Single Square Image */}
        <div className="hero__visual">
          <div className="hero__visual-square">
            <img
              src="/images/hero-model.png"
              alt="Reveoule Model"
              className="hero__model-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
