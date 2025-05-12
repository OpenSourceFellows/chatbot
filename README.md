# Chatbot LMS

_Reimagining education for rural communities with a mobile-first, SMS-enabled experience._

## 💡 What & Why

RuralLearn is a lightweight, open-source Learning Management System (LMS) built from the ground up for low-bandwidth, mobile-first use in rural areas.  
- **Mobile-first UI**: optimized for basic smartphones, offline caching, high-contrast for sunlight  
- **SMS notifications**: workshop reminders, “pair-hours” alerts, progress checklists all delivered via SMS  
- **edX integration**: pull in course content and grades directly from existing edX installations via LTI/REST  
- **Accessible**: adheres to WCAG AA for visually impaired learners  
- **Feedback loops**: two-way SMS Q&A, real-time workshop feedback, CSV exports for administrators  

_How we’ll grow:_ integrate more civic tech toolkits, expand to voice & USSD, plugin-based microlearning.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥14  
- Yarn or npm  
- A running edX instance (or edX sandbox) with LTI enabled  
- Twilio account (for SMS)

### 1. Clone & Install

```bash
git clone https://github.com/OpenSourceFellows/chatbot
cd chatbot
npm install
