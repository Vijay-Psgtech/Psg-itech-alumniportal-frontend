// src/pages/alumni/AlumniDonations.jsx
// ✅ ALUMNI DONATIONS PAGE
// Make donations & view history

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  LogOut,
  ChevronLeft,
  Check,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Gift,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { motion } from "framer-motion";
import { donationAPI } from "../../services/api";
import usePageTitle from "../../hooks/usePageTitle";

const AlumniDonations = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  usePageTitle("Make a Donation");

  const [donationAmount, setDonationAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);

  const donationPurposes = [
    { id: "general", label: "General Fund", description: "Support PSG overall" },
    { id: "scholarship", label: "Scholarship", description: "Student scholarships" },
    { id: "infrastructure", label: "Infrastructure", description: "Building improvements" },
    { id: "research", label: "Research", description: "Research initiatives" },
  ];

  const donationTiers = [
    { amount: 1000, label: "Friend", emoji: "💚" },
    { amount: 5000, label: "Supporter", emoji: "💙" },
    { amount: 10000, label: "Patron", emoji: "💜" },
    { amount: 50000, label: "Benefactor", emoji: "🌟" },
  ];

  useEffect(() => {
    loadDonationHistory();
  }, []);

  const loadDonationHistory = async () => {
    try {
      const response = await donationAPI.getMyDonations();
      setDonations(response.data?.data || []);
    } catch (err) {
      console.error("Failed to load donations:", err);
    } finally {
      setLoadingDonations(false);
    }
  };

  const handleDonation = async (e) => {
    e.preventDefault();

    if (!donationAmount || Number(donationAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await donationAPI.createDonation({
        amount: Number(donationAmount),
        purpose,
        anonymousDonation: false,
      });

      if (response.data) {
        setSuccess(true);
        setDonationAmount("");
        setPurpose("general");

        setTimeout(() => {
          loadDonationHistory();
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Donation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const totalDonated = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const impactCards = [
    { title: "Scholarships", icon: Sparkles, amount: "₹25K+", text: "Access to education" },
    { title: "Infrastructure", icon: Landmark, amount: "₹40K+", text: "Campus betterment" },
    { title: "Research", icon: ShieldCheck, amount: "₹18K+", text: "Innovation initiatives" },
  ];

  return (
    <>
      <style>{`
        :root {
          --psg-orange: #f97316;
          --psg-orange-strong: #ea580c;
          --psg-orange-soft: #fff3e9;
          --psg-navy: #0f172a;
          --psg-slate: #475569;
          --psg-line: rgba(148, 163, 184, 0.22);
          --psg-card: rgba(255, 255, 255, 0.78);
          --psg-shadow: 0 24px 55px rgba(15, 23, 42, 0.12);
        }

        * {
          box-sizing: border-box;
        }

        .alumni-donations-wrapper {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(249, 115, 22, 0.18), transparent 32%),
            linear-gradient(135deg, #f8fafc 0%, #eef4fb 44%, #f8fafc 100%);
          font-family: "Poppins", "Inter", sans-serif;
          color: var(--psg-navy);
        }

        .donations-header {
          position: sticky;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 60px;
          padding: 22px clamp(18px, 3vw, 42px);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.96), rgba(234, 88, 12, 0.9));
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 42px rgba(234, 88, 12, 0.18);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .brand-block {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-mark {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          font-weight: 800;
          letter-spacing: 0.06em;
          font-size: 0.82rem;
        }

        .brand-copy {
          display: flex;
          flex-direction: column;
        }

        .eyebrow {
          margin: 0;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .header-title {
          margin: 0;
          font-size: clamp(1.3rem, 2vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .back-btn,
        .logout-btn,
        .tier-btn,
        .purpose-option,
        .donate-btn {
          font: inherit;
        }

        .back-btn,
        .logout-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-radius: 12px;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .back-btn:hover,
        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
        }

        .donations-container {
          max-width: 1220px;
          margin: 0 auto;
          padding: 42px 20px 60px;
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.7fr);
          gap: 32px;
          align-items: start;
        }

        .donation-form-section,
        .donation-stats {
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: var(--psg-shadow);
          backdrop-filter: blur(14px);
        }

        .donation-form-section {
          border-radius: 28px;
          padding: clamp(22px, 3vw, 40px);
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--psg-line);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
          font-size: clamp(1.4rem, 2vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .title-icon {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.14), rgba(249, 115, 22, 0.06));
          color: var(--psg-orange-strong);
        }

        .trust-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid rgba(34, 197, 94, 0.18);
          background: rgba(34, 197, 94, 0.08);
          color: #15803d;
          padding: 8px 12px;
          font-size: 0.72rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-radius: 14px;
          margin-bottom: 22px;
          font-size: 0.93rem;
          font-weight: 600;
          animation: slideDown 0.25s ease;
        }

        .alert-error {
          color: #b42318;
          background: #fff1f2;
          border: 1px solid rgba(239, 68, 68, 0.22);
        }

        .alert-success {
          color: #166534;
          background: #ecfdf5;
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-label {
          margin: 0;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--psg-slate);
        }

        .amount-input-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          border-radius: 15px;
          border: 1px solid rgba(148, 163, 184, 0.34);
          background: rgba(248, 250, 252, 0.9);
          transition: all 0.2s ease;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .amount-input-wrap:focus-within {
          border-color: rgba(249, 115, 22, 0.7);
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12);
          background: white;
        }

        .currency-pill {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--psg-orange-strong);
        }

        .amount-input {
          width: 100%;
          border: none;
          background: transparent;
          color: var(--psg-navy);
          font: inherit;
          font-size: 1.1rem;
          font-weight: 700;
          padding: 16px 0;
          outline: none;
        }

        .amount-input::placeholder {
          color: #94a3b8;
        }

        .donation-tiers {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .tier-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 88px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(255, 255, 255, 0.72);
          color: var(--psg-navy);
          padding: 16px 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          font-weight: 700;
        }

        .tier-btn:hover:not(:disabled) {
          border-color: rgba(249, 115, 22, 0.36);
          background: rgba(255, 243, 233, 0.9);
          transform: translateY(-3px);
        }

        .tier-btn.active {
          background: linear-gradient(135deg, var(--psg-orange), var(--psg-orange-strong));
          color: white;
          border-color: transparent;
          box-shadow: 0 14px 28px rgba(249, 115, 22, 0.25);
          transform: translateY(-3px);
        }

        .tier-emoji {
          font-size: 1.4rem;
        }

        .purpose-select {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .purpose-option {
          text-align: left;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(255, 255, 255, 0.72);
          color: var(--psg-navy);
          padding: 16px 14px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .purpose-option:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: rgba(249, 115, 22, 0.26);
          background: rgba(255, 243, 233, 0.78);
        }

        .purpose-option.active {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.95), rgba(234, 88, 12, 0.9));
          color: white;
          border-color: transparent;
          box-shadow: 0 14px 28px rgba(249, 115, 22, 0.2);
        }

        .purpose-label {
          font-size: 0.92rem;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .purpose-desc {
          font-size: 0.72rem;
          opacity: 0.86;
        }

        .donate-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--psg-orange), var(--psg-orange-strong));
          color: white;
          padding: 16px 20px;
          font-weight: 800;
          font-size: 0.96rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 14px 28px rgba(249, 115, 22, 0.28);
          transition: all 0.25s ease;
        }

        .donate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 35px rgba(249, 115, 22, 0.32);
        }

        .donate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .history-section {
          margin-top: 34px;
          border-top: 1px solid var(--psg-line);
          padding-top: 28px;
        }

        .history-title {
          margin: 0 0 18px;
          font-size: 1.06rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .donation-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.94), rgba(255, 243, 233, 0.54));
          border: 1px solid rgba(249, 115, 22, 0.08);
          margin-bottom: 12px;
        }

        .donation-info {
          flex: 1;
        }

        .donation-purpose {
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--psg-navy);
        }

        .donation-date {
          margin-top: 4px;
          font-size: 0.74rem;
          color: #64748b;
        }

        .donation-amount {
          font-size: 1.05rem;
          font-weight: 900;
          color: var(--psg-orange-strong);
        }

        .empty-history {
          padding: 26px 18px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(248, 250, 252, 1), rgba(255, 243, 233, 0.7));
          border: 1px dashed rgba(148, 163, 184, 0.38);
          color: #64748b;
          font-size: 0.92rem;
          text-align: center;
        }

        .donation-stats {
          position: sticky;
          top: 116px;
          border-radius: 28px;
          padding: 22px;
        }

        .impact-card {
          padding: 24px 20px;
          border-radius: 22px;
          background: linear-gradient(135deg, rgba(255, 243, 233, 1), rgba(255, 255, 255, 0.82));
          border: 1px solid rgba(249, 115, 22, 0.12);
          margin-bottom: 16px;
        }

        .impact-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(249, 115, 22, 0.1);
          color: var(--psg-orange-strong);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .impact-amount {
          margin: 18px 0 10px;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          background: linear-gradient(135deg, var(--psg-orange), var(--psg-orange-strong));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .impact-copy {
          margin: 0;
          color: var(--psg-slate);
          line-height: 1.6;
        }

        .mini-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 18px;
        }

        .mini-stat {
          padding: 14px 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.74);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }

        .mini-stat strong {
          display: block;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--psg-navy);
        }

        .mini-stat span {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--psg-slate);
        }

        .impact-list {
          display: grid;
          gap: 12px;
        }

        .impact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 12px;
          border-radius: 16px;
          background: rgba(248, 250, 252, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }

        .impact-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(249, 115, 22, 0.12);
          color: var(--psg-orange-strong);
        }

        .impact-meta {
          flex: 1;
        }

        .impact-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--psg-navy);
        }

        .impact-text {
          margin-top: 2px;
          font-size: 0.7rem;
          color: var(--psg-slate);
        }

        .impact-value {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--psg-orange-strong);
        }

        .support-note {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 14px 16px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.96));
          color: white;
          font-weight: 700;
        }

        .support-note small {
          opacity: 0.75;
        }

        @media (max-width: 1024px) {
          .donations-container {
            grid-template-columns: 1fr;
          }

          .donation-stats {
            position: static;
          }
        }

        @media (max-width: 760px) {
          .donations-header {
            margin-top: 0;
            flex-wrap: wrap;
            justify-content: center;
          }

          .header-left {
            width: 100%;
            justify-content: space-between;
          }

          .brand-copy {
            display: none;
          }

          .logout-btn {
            width: 100%;
          }

          .panel-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .donation-tiers,
          .purpose-select {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 540px) {
          .donations-container {
            padding-left: 14px;
            padding-right: 14px;
          }

          .donation-form-section,
          .donation-stats {
            border-radius: 20px;
          }

          .donation-tiers,
          .purpose-select,
          .mini-stats {
            grid-template-columns: 1fr;
          }

          .donation-item {
            align-items: flex-start;
            flex-direction: column;
          }

          .donation-amount {
            align-self: flex-end;
          }
        }
      `}</style>

      <div className="alumni-donations-wrapper">
        <header className="donations-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate("/")}>
              <ChevronLeft size={16} />
              Back
            </button>
            <div className="brand-block">
              {/* <div className="brand-mark">PSG </div> */}
              <div className="brand-copy">
                <p className="eyebrow">PSG iTech Alumni Giving</p>
                
              </div>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </header>

        <main className="donations-container">
          <section className="donation-form-section">
            <div className="panel-header">
              <h2 className="section-title">
                <span className="title-icon">
                  <Heart size={22} />
                </span>
                Make a Donation
              </h2>
              <div className="trust-chip">
                <Gift size={14} />
                Trusted by alumni
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <Check size={18} />
                Thank you for your generous donation!
              </div>
            )}

            <form onSubmit={handleDonation}>
              <div className="form-group">
                <label className="form-label">Donation Amount</label>
                <div className="amount-input-wrap">
                  <span className="currency-pill">₹</span>
                  <input
                    type="number"
                    className="amount-input"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Quick Select</label>
                <div className="donation-tiers">
                  {donationTiers.map((tier) => (
                    <button
                      key={tier.amount}
                      type="button"
                      className={`tier-btn ${donationAmount === String(tier.amount) ? "active" : ""}`}
                      onClick={() => setDonationAmount(String(tier.amount))}
                      disabled={loading}
                    >
                      <span className="tier-emoji">{tier.emoji}</span>
                      <span>₹{tier.amount.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Donation Purpose</label>
                <div className="purpose-select">
                  {donationPurposes.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`purpose-option ${purpose === p.id ? "active" : ""}`}
                      onClick={() => setPurpose(p.id)}
                      disabled={loading}
                    >
                      <div className="purpose-label">{p.label}</div>
                      <div className="purpose-desc">{p.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="donate-btn" disabled={loading || !donationAmount}>
                <Heart size={18} />
                {loading ? "Processing..." : "Donate Now"}
              </button>
            </form>

            <div className="history-section">
              <h3 className="history-title">Your recent donations</h3>

              {donations.length > 0 ? (
                donations.map((donation, idx) => (
                  <motion.div
                    key={idx}
                    className="donation-item"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <div className="donation-info">
                      <div className="donation-purpose">
                        {donationPurposes.find((p) => p.id === donation.purpose)?.label || "Donation"}
                      </div>
                      <div className="donation-date">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="donation-amount">₹{donation.amount.toLocaleString()}</div>
                  </motion.div>
                ))
              ) : !loadingDonations ? (
                <div className="empty-history">No donations yet. Make your first contribution above.</div>
              ) : null}
            </div>
          </section>

          <aside className="donation-stats">
            <motion.div
              className="impact-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="impact-badge">
                <Sparkles size={14} />
                Impact Snapshot
              </div>
              <div className="impact-amount">₹{totalDonated.toLocaleString()}</div>
              <p className="impact-copy">
                Your generosity helps create better learning experiences and opportunities for the PSG community.
              </p>

              <div className="mini-stats">
                <div className="mini-stat">
                  <strong>{donations.length}</strong>
                  <span>Gifts</span>
                </div>
                <div className="mini-stat">
                  <strong>4</strong>
                  <span>Causes</span>
                </div>
              </div>
            </motion.div>

            <div className="impact-list">
              {impactCards.map(({ title, icon: Icon, amount, text }) => (
                <div key={title} className="impact-item">
                  <div className="impact-icon">
                    <Icon size={18} />
                  </div>
                  <div className="impact-meta">
                    <div className="impact-title">{title}</div>
                    <div className="impact-text">{text}</div>
                  </div>
                  <div className="impact-value">{amount}</div>
                </div>
              ))}
            </div>

            <div className="support-note">
              <span>Every contribution counts</span>
              <ArrowRight size={16} />
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default AlumniDonations;