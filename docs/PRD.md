# Product Requirements Document (PRD) - 10-box OS Web Application

**Draft Version** - *Last Updated: 05:44 PM CEST, Tuesday, July 29, 2025*

---

## 1. Introduction

### 1.1 Purpose

The **"10-box OS"** is a web-based application designed to streamline client acquisition, management, and service delivery for business consultants and coaches. By digitizing the proprietary 10-box framework, the product provides a structured platform to address key friction points such as manual data entry, inefficient outreach, and lack of client visibility into service progress.

### 1.2 Objectives

**Primary Goal:** Deliver a sellable Minimum Viable Product (MVP) that enhances client management efficiency for consultants and coaches.

**Secondary Goals:**
- Enable teachers to monitor and support consultants effectively
- Provide clients with a transparent, accessible view of service delivery
- Establish a scalable foundation for future feature expansion

### 1.3 Scope

The MVP focuses on core functionalities for three user personas—Teachers, Consultants, and Clients—while ensuring usability, security, and performance. Future iterations may include advanced integrations based on user feedback.

---

## 2. Target Audience and User Personas

### 2.1 Teacher (Business Consultant)

**Description:** A senior consultant or coach overseeing a team of consultants (students) using the 10-box framework.

**Needs:**
- Real-time visibility into consultants' progress across Boxes 2–4
- Tools to track task completion and adherence to the framework
- Alerts for underperforming consultants

**Pain Points:**
- Limited insight into team activities without manual check-ins
- Difficulty ensuring consistent framework application

### 2.2 Consultants (Students)

**Description:** Business consultants or coaches applying the 10-box framework to manage client relationships.

**Needs:**
- A centralized system to manage their Dream 100 contacts and client pipelines
- Efficient tools for email outreach and client portal creation
- Simplified application of the 10-box framework

**Pain Points:**
- Time-consuming manual data entry and organization
- Inefficient communication workflows with prospects and clients
- Lack of a unified platform for client management

### 2.3 Clients

**Description:** End clients receiving services from consultants, seeking transparency into delivery progress.

**Needs:**
- A view-only portal to track milestones and documents
- Clear, branded communication from their consultant

**Pain Points:**
- Limited visibility into service timelines and deliverables
- Disjointed communication channels with consultants

---

## 3. Market Analysis and Competitive Landscape

### 3.1 Market Overview

The CRM and client management software market is valued at over $40 billion globally, with a projected CAGR of 10% through 2030. Business consultants and coaches represent a growing niche, seeking tailored tools to streamline workflows and differentiate their services.

### 3.2 Competitive Landscape

- **Salesforce:** A leading CRM with extensive features but lacking specific 10-box framework integration
- **HubSpot:** User-friendly CRM with marketing automation; no native support for the 10-box methodology
- **Zoho CRM:** Affordable and customizable, but not optimized for consultants' unique workflows

### 3.3 Unique Value Proposition

The 10-box OS stands out by offering a purpose-built solution for the 10-box framework, combining task tracking, a Dream 100 database, and client portal functionality into a single, intuitive platform tailored for business consultants and coaches.

---

## 4. Functional Requirements

### 4.1 Teacher Features

#### 4.1.1 Dashboard
- Display a sortable list of all consultants with their current box status (e.g., Box 2: In Progress)
- Show task completion health with color-coded indicators:
  - 🟢 **Green:** On track
  - 🟡 **Yellow:** At risk (e.g., overdue tasks < 1 week)
  - 🔴 **Red:** Behind (e.g., overdue tasks > 1 week)
- Include a summary view of total tasks completed vs. pending

#### 4.1.2 Task Tracking
- Track completion of predefined tasks for Boxes 2–4 (e.g., "Contact 10 Prospects" in Box 3)
- Provide detailed views per consultant, including timestamps and notes
- Exportable reports in CSV format for offline analysis

#### 4.1.3 Notifications
- Send alerts for consultants falling behind (e.g., no activity in 7 days)
- Support configurable channels: email, in-app, or both
- Include a snooze option for notifications (e.g., 24 hours)

### 4.2 Consultants' Features

#### 4.2.1 Login System
- Role-based access control ensuring consultants only view their own data
- Secure login with email/password and optional two-factor authentication (2FA)
- Password reset functionality via email link

#### 4.2.2 Dream 100 Database
- **Import:** Support CSV uploads with a downloadable template including fields: Name, Company, Phone, Email Address, LinkedIn Profile, Source, Relationship, Title, Preferred Communication, Latest Decision, Next Contact Date, Dream 100? (Y/N)
- **Storage:** Store up to 500 contacts per consultant in the MVP
- **Filters/Tags:** Filter by tags (e.g., Prospect, Client) and sort by any field
- **Calendar View:** Drag-and-drop interface to update "Next Contact Date," synced with task tracking

#### 4.2.3 Email Functionality
- Generate mailto links with preloaded templates for Box 3 outreach (e.g., "Initial Contact," "Follow-Up")
- Allow template customization with placeholders (e.g., {Name}, {Company})
- Track email sends via a log (date, recipient, template used)

#### 4.2.4 Client Portal Setup
- Create a view-only portal with seven default milestones (e.g., "Discovery Call," "Proposal Sent")
- Support adding, removing, and renaming milestones (max 10 per portal)
- Offer basic branding: profile picture (100x100px), banner (1200x200px), welcome text (500 chars max)

### 4.3 Clients' Features

#### 4.3.1 Client Portal
- Provide view-only access to milestones, timelines, and uploaded documents (PDF, max 5MB)
- Display a welcome page with consultant branding and contact info
- Include a progress bar showing completed vs. total milestones

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Page load time < 2 seconds under normal conditions
- Handle 1,000 consultants and 10,000 clients concurrently in the MVP
- Database query response time < 500ms for 90% of requests

### 5.2 Security
- Encrypt all data in transit (HTTPS) and at rest (AES-256)
- Comply with GDPR for data handling, including consent and deletion options
- Implement role-based access control and session timeouts (30 mins inactivity)

### 5.3 Scalability
- Support horizontal scaling via cloud infrastructure
- Use a modular architecture for independent feature updates

### 5.4 Usability
- Deliver an intuitive UI with a learning curve < 15 minutes for new users
- Ensure responsive design for desktop (min 1024px) and mobile (min 320px)
- Provide tooltips and a help section with FAQs

### 5.5 Reliability
- Guarantee 99.9% uptime (excluding scheduled maintenance)
- Implement automated daily backups with 7-day retention
- Include a disaster recovery plan with < 4-hour restoration time

---

## 6. User Stories

**Teacher Stories:**
- "As a teacher, I want to see a dashboard of my consultants' progress so I can identify who needs support."
- "As a teacher, I want email alerts for overdue tasks so I can act quickly."

**Consultant Stories:**
- "As a consultant, I want to import my Dream 100 list via CSV so I don't waste time on manual entry."
- "As a consultant, I want to schedule follow-ups on a calendar so I stay organized."
- "As a consultant, I want to set up branded client portals so my clients feel confident in my services."

**Client Stories:**
- "As a client, I want to check my project status online so I don't need to email my consultant for updates."

---

## 7. Technical Considerations

### 7.1 Architecture
> **Note:** The technical architecture, including front-end frameworks, API structure, and other details, will be discussed and finalized at a later stage as per your preference.

### 7.2 Technologies
- **Deployment:** The application will be deployed on Vercel
- **Backend and Database:** The backend and database will be hosted on Supabase

### 7.3 Integrations
- **Email:** Mailto links for MVP; future SMTP integration (e.g., SendGrid) may be considered
- **Authentication:** OAuth 2.0 for potential third-party logins (e.g., Google) may be considered in future iterations
- **Analytics:** Basic event tracking for usage insights may be added post-MVP

### 7.4 Hosting
- **Deployment Platform:** Vercel for front-end deployment
- **Backend and Database:** Supabase for backend services and database management

---

## 8. Timeline and Milestones

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| **Project Kickoff** | Week 1 | Finalized PRD, initial technical planning |
| **Development Phase 1** | Weeks 2–6 | Teacher dashboard, consultant login/database |
| **Development Phase 2** | Weeks 7–10 | Email functionality, client portal |
| **Testing & QA** | Weeks 11–12 | Bug fixes, performance optimization |
| **MVP Launch** | Week 13 | Production deployment, user onboarding |
| **Post-Launch** | Ongoing | Bug fixes, feedback collection |

---

## 9. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Scope creep** | Medium | High | Lock MVP scope, defer extras to v2 |
| **Email integration delays** | Low | Medium | Use mailto links initially |
| **Data breaches** | Low | High | Encrypt data, audit security regularly |
| **Slow user adoption** | Medium | Medium | Offer tutorials, live support |
| **Performance bottlenecks** | Medium | High | Optimize queries, add caching (e.g., Redis) |

---

## 10. Success Metrics and KPIs

### 10.1 User Adoption
- 100 active consultants within 3 months post-launch
- 500 client portals created within 6 months

### 10.2 Task Completion
- 80% task completion rate for Boxes 2–4 per consultant
- Average task completion time < 3 days

### 10.3 Client Acquisition
- 1,000 leads captured via Dream 100 database in 6 months
- 20% lead-to-client conversion rate

### 10.4 User Satisfaction
- Net Promoter Score (NPS) > 30 within 3 months
- < 5% churn rate among active users

### 10.5 System Performance
- 99.9% uptime monthly
- Average API response time < 200ms

---

## 11. Appendix

### 11.1 Glossary
- **10-box Framework:** A proprietary methodology for client acquisition and management, divided into 10 stages (Boxes)
- **Dream 100:** A list of high-priority prospects or clients targeted for outreach

### 11.2 Assumptions
- Users have basic tech proficiency (e.g., CSV imports, email usage)
- Initial deployment targets English-speaking users; localization is out of scope for MVP

### 11.3 Open Questions
- Will consultants need bulk email capabilities beyond mailto links?
- Should the client portal support document uploads from clients in v2?