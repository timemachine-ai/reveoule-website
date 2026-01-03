/**
 * Hero Section
 * Fiverr Pro-inspired card-based hero with tabs
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    setTimeout(() => setAdvisorStep(2), 300);
  };

  const handleConcernSelect = (concern) => {
    setConcerns(concern);
    setTimeout(() => setAdvisorStep(3), 300);
  };

  const handleGoalSelect = (goal) => {
    setGoals(goal);
    setTimeout(() => setAdvisorStep(4), 300);
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
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Reveal The Secret To <span className="hero__title-luxury">Ageless</span> Beauty Today.
          </motion.h1>

          {/* Tab Buttons */}
          <motion.div
            className="hero__tabs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`hero__tab ${activeTab === tab.id ? 'hero__tab--active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Card Container */}
          <motion.div
            className="hero__card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {/* AI Advisor Tab */}
              {activeTab === 'ai-advisor' && (
                <motion.div
                  key="ai-advisor"
                  className="hero__tab-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="hero__advisor">
                    <AnimatePresence mode="wait">
                      {/* Step 0: Nickname */}
                      {advisorStep === 0 && (
                        <motion.div
                          key="step-0"
                          className="hero__advisor-step"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 1: Skin Type */}
                      {advisorStep === 1 && (
                        <motion.div
                          key="step-1"
                          className="hero__advisor-step"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 2: Primary Concern */}
                      {advisorStep === 2 && (
                        <motion.div
                          key="step-2"
                          className="hero__advisor-step"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 3: Skincare Goal */}
                      {advisorStep === 3 && (
                        <motion.div
                          key="step-3"
                          className="hero__advisor-step"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 4: Tell About Yourself */}
                      {advisorStep === 4 && (
                        <motion.div
                          key="step-4"
                          className="hero__advisor-step"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      )}

                      {/* Step 5: Results */}
                      {advisorStep === 5 && recommendation && (
                        <motion.div
                          key="step-5"
                          className="hero__advisor-step hero__advisor-results"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* Search Product Tab */}
              {activeTab === 'search-product' && (
                <motion.div
                  key="search-product"
                  className="hero__tab-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="hero__search">
                    <div className="hero__search-container">
                      <svg className="hero__search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                        <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <input
                        type="text"
                        className="hero__search-input"
                        placeholder="Search for serums, moisturizers, cleansers..."
                      />
                      <button className="hero__search-btn">Search</button>
                    </div>

                    <div className="hero__search-suggestions">
                      <span className="hero__suggestion-label">Popular:</span>
                      <button className="hero__suggestion">Hyaluronic Acid Serum</button>
                      <button className="hero__suggestion">Vitamin C</button>
                      <button className="hero__suggestion">Retinol</button>
                      <button className="hero__suggestion">Anti-Aging</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Affiliate Program Tab */}
              {activeTab === 'affiliate' && (
                <motion.div
                  key="affiliate"
                  className="hero__tab-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="hero__affiliate">
                    <div className="hero__affiliate-content">
                      <h3 className="hero__affiliate-title">Join Our Affiliate Program</h3>
                      <p className="hero__affiliate-description">
                        Partner with Rêveoulé and earn exclusive commissions by sharing our luxury skincare products.
                      </p>

                      <div className="hero__affiliate-benefits">
                        <div className="hero__benefit">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Up to 20% commission</span>
                        </div>
                        <div className="hero__benefit">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Exclusive partner resources</span>
                        </div>
                        <div className="hero__benefit">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Dedicated support team</span>
                        </div>
                      </div>

                      <button className="hero__affiliate-btn">Apply Now</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Brands Section */}
          <motion.div
            className="hero__brands"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="hero__brands-label">Your French beauty saloon at home</span>
          </motion.div>
        </motion.div>

        {/* Visual Side - Single Square Image */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="hero__visual-square">
            <img
              src="/images/hero-model.png"
              alt="Reveoule Model"
              className="hero__model-image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
