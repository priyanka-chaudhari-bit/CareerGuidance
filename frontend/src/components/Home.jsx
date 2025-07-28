import React from 'react'
import '../styles/Home.css';
import bluetheme from '../assets/bluetheme.jpeg'
import Navigation from './Navigation';

function Home() {
  return (
    <>
    <Navigation/>
      <div className="home-container">
      {/* Intro Section */}
      <section className="intro-section">
        <h1><i>Discover Your True Potential</i></h1>
        <p>
          CareerGuide helps students uncover the path that truly fits them —
          through expert-designed aptitude and psychometric assessments.
          Get personalized domain recommendations and explore the best
          colleges across the country based on your strengths.
        </p>
      </section>

      {/* Timeline Section */}
      {/* <section className="timeline">
        <h2>How It Works</h2>
        <div className="timeline-steps">
          <div className="step">
            <span>1</span>
            <h3>Take Assessments</h3>
            <p>Aptitude + Psychometric tests designed by experts.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h3>Analyze Insights</h3>
            <p>Get an in-depth understanding of your strengths.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h3>Find Your Field</h3>
            <p>Discover the domain you're truly inclined toward.</p>
          </div>
          <div className="step">
            <span>4</span>
            <h3>Explore Colleges</h3>
            <p>Get college suggestions based on your assessment results.</p>
          </div>
        </div>
      </section> */}
      <section className="middle-section">
        <div className="illustration">
          <img src={bluetheme} alt="Career Guide Illustration" />
        </div>
        <div className='timeline-container'>
        <div className="timeline-vertical">
          <div className="timeline-item left">
            <div className="circle"></div>
            <div className="content">
              <h3>Take Assessments</h3>
              <p>Aptitude + Psychometric tests designed by experts.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="circle"></div>
            <div className="content">
              <h3>Analyze Insights</h3>
              <p>Understand your strengths and mindset deeply.</p>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="circle"></div>
            <div className="content">
              <h3>Find Your Field</h3>
              <p>Discover which domain suits your personality best.</p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="circle"></div>
            <div className="content">
              <h3>Explore Colleges</h3>
              <p>Get real suggestions based on your results.</p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="difference-section">
        <h2>Why Choose CareerGuide?</h2>
        <div className="cards">
          <div className="card">
            <h4>Beyond Exams</h4><br/>
            <p>
              CareerGuide isn’t limited to a few entrance exams. We focus on helping students understand their natural strengths and interests — and use that to shape smarter academic and career paths.
            </p>
          </div>
          <div className="card">
            <h4>Psychology Meets Academics</h4>
            <p>
              Aptitude shows how good you are at something. Psychometrics reveal what you're truly interested in. Together, they provide a powerful direction — where ability meets passion.
            </p>
          </div>
          <div className="card">
            <h4>Smart College Matching</h4>
            <p>
                Based on your combined psychometric and aptitude results, CareerGuide filters out noise and surfaces colleges that fit *you* — not just top ranks.
            </p>
            </div>

          <div className="card">
            <h4>Smarter College Insights</h4>
            <p>
              Go beyond just a list of colleges. CareerGuide gives you personalized recommendations, category-wise cutoff details — helping you explore options that truly align with your profile
            </p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to Explore Your Future?</h2>
        <p>Thousands of students have already taken the first step towards the right career. It's your turn now.</p>
        <button className="register-btn" onClick={() => window.location.href = '/user-register'}>
            Register Now
        </button>
        </section>

    </div>
    </>
  )
}

export default Home
