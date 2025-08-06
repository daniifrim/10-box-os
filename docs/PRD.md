# Product Requirements Document (PRD) - 10-box OS Web Application

**Draft Version** - *Last Updated: 05:44 PM CEST, Tuesday, July 29, 2025*

---

## 1. Introduction

### 1.1 Purpose

The **"10-box OS"** is a web-based application designed to streamline client acquisition, management, and service delivery for business consultants and coaches. By digitizing the proprietary 10-box framework, the product provides a structured platform to address key friction points such as manual data entry, inefficient outreach, and lack of client visibility into service progress.

### 1.2 The 10-Box Framework

The framework consists of 10 boxes divided into three main sections:

**Section 1: Client Acquisition (Boxes 2-4)**
- **Box 2 - Identify:** Define and refine your avatar/client persona
- **Box 3 - Invite:** Contact prospects from the Dream 100 database
- **Box 4 - Converse:** Conduct discovery calls and convert prospects

**Section 2: Client Service (Boxes 5-7)**
- **Box 5 - Onboard:** Client onboarding process
- **Box 6 - Deliver:** Service delivery with milestone tracking
- **Box 7 - Recap:** Service completion and review

**Section 3: Client Retention (Boxes 8-10)**
- Boxes 8-10 focus on maintaining and expanding client relationships (future scope)

### 1.3 Objectives

**Primary Goal:** Create a productized version of the teacher's intellectual property to manage multiple consultants and their client acquisition processes through the 10-box framework.

**Secondary Goals:**
- Enable the teacher to monitor consultant daily task completion for Boxes 2-4
- Automate client portal creation when prospects convert to clients
- Provide transparent service delivery tracking for clients
- Establish a scalable foundation for future framework expansion

### 1.3 Scope

The MVP focuses on core functionalities for three user personas—Teachers, Consultants, and Clients—while ensuring usability, security, and performance. Future iterations may include advanced integrations based on user feedback.

---

## 2. Target Audience and User Personas

### 2.1 Teacher (Framework Owner)

**Description:** The single teacher/owner of the 10-box framework who oversees multiple consultants implementing the methodology. This is a single-tenant application designed specifically for one teacher.

**Needs:**
- Daily monitoring of consultant task completion in Boxes 2-4
- Visibility into consultant client acquisition metrics
- Track average milestone progress across all consultant clients
- Ensure framework adherence and methodology consistency

**Pain Points:**
- Cannot track if consultants are completing daily required tasks
- No visibility into consultant pipeline health
- Difficulty measuring framework effectiveness across the team

### 2.2 Consultants (Students)

**Description:** Business consultants learning and applying the 10-box framework under the teacher's guidance. Each consultant works independently with their own client base.

**Needs:**
- Daily task management system for Boxes 2-4 activities
- Dream 100 database to track and manage prospects
- Automated client portal creation when prospects convert
- Email templates for standardized outreach
- Service delivery tracking with customizable milestones

**Pain Points:**
- Manual tracking of daily framework tasks
- Disorganized prospect management
- Time-consuming client portal setup
- Inconsistent client communication

### 2.3 Clients

**Description:** End clients who have purchased services from consultants. They transition from Dream 100 prospects to active clients when they make a purchase decision.

**Needs:**
- Automatic portal access upon conversion from prospect
- View-only access to service milestones and progress
- Clear visibility of deliverables and timelines
- Consultant-branded experience

**Pain Points:**
- No transparency into service delivery progress
- Uncertainty about project timelines
- Lack of centralized access to project documents

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
- Display all consultants with their current box status and daily task completion
- Track Box 2-4 daily tasks completion with color indicators:
  - 🟢 **Green:** All daily tasks completed
  - 🟡 **Yellow:** Some tasks incomplete (< 3 days behind)
  - 🔴 **Red:** Multiple tasks overdue (> 3 days behind)
- Show metrics:
  - Number of active clients per consultant
  - Average milestone progress across all clients
  - Dream 100 conversion rates

#### 4.1.2 Box-Specific Task Tracking

**Box 2 (Identify) - 5 Daily Tasks:**
1. Any refinement on the avatar?
2. Any refinement on the pain?
3. Did you have a conversation with your avatar today?
4. Did you read anything from your avatar today?
5. Do you have any refinement on the problem?

**Box 3 (Invite) - 5 Daily Tasks:**
1. Check the 5 you missed yesterday
2. Do the 5 for today
3. Prepare for the 5 tomorrow
4. See future calendar and reorganize
5. Are there at least 100 names in your Dream 100?

**Box 4 (Converse) - 5 Daily Tasks:**
1. Did the prospective client make a decision?
2. Did you hear problem, pain, alternative?
3. Did you open the call as instructed?
4. Did you do today/tomorrow gap analysis?
5. Did you recommend a solution?

#### 4.1.3 Notifications
- Send alerts for consultants falling behind (e.g., no activity in 7 days)
- Support configurable channels: email, in-app, or both
- Include a snooze option for notifications (e.g., 24 hours)

### 4.2 Consultants' Features

#### 4.2.1 Login System
- Role-based access control ensuring consultants only view their own data
- Secure login with email/password and optional two-factor authentication (2FA)
- Password reset functionality via email link

#### 4.2.2 CSV/Excel Import Feature

**User Experience Flow:**
1. **Template Download:**
   - Button: "Download Excel Template" 
   - Downloads pre-formatted .xlsx file with:
     - Proper column headers
     - Data validation rules
     - Sample row with example data
     - Instructions sheet with field descriptions

2. **File Upload Interface:**
   - Drag-and-drop zone or file selector
   - Accepted formats: .xlsx, .xls, .csv
   - Maximum file size: 10MB
   - Progress indicator during upload

3. **Data Preview & Validation:**
   - Display first 10 rows for preview
   - Color-coded validation:
     - 🟢 Green rows: Valid, ready to import
     - 🟡 Yellow rows: Minor issues (missing optional fields)
     - 🔴 Red rows: Errors that prevent import
   - Inline error messages per field
   - Option to fix errors in preview or re-upload

4. **Import Confirmation:**
   - Summary: "X contacts will be imported, Y duplicates found, Z errors"
   - Duplicate handling options:
     - Skip duplicates
     - Update existing records
     - Create new records (if different data)
   - "Import" button with confirmation modal

5. **Import Results:**
   - Success message with count
   - Download report of any skipped/failed rows
   - Immediate display of imported contacts

**Error Handling:**
- Invalid email format: "Row 3: Invalid email format 'john@'"
- Missing required field: "Row 5: Name is required"
- Invalid date format: "Row 8: Date must be MM/DD/YYYY"
- Duplicate detection: "Row 12: Email already exists in your contacts"
- Exceeds limit: "File contains 750 contacts, maximum is 500"

#### 4.2.3 Dream 100 Database

**Import Functionality:**
- **Template Download:** Provide downloadable Excel template (.xlsx) with proper formatting and column headers
- **Supported Formats:** Accept both Excel (.xlsx, .xls) and CSV (.csv) file uploads
- **Required Fields:** 
  - Name (text, required)
  - Email Address (valid email format, required)
  - Dream 100? (TRUE/FALSE or YES/NO)
- **Optional Fields:**
  - Company (text)
  - Phone (text, accepts various formats)
  - LinkedIn Profile (URL format)
  - Source (dropdown: LinkedIn, Email List, YouTube, Referral)
  - Relationship (dropdown: Prospect, Client, Vendor, Promotional Partner)
  - Title (text)
  - Preferred Communication (dropdown: Email, Call, Text, LinkedIn)
  - Latest Decision (dropdown: Buy, Don't Buy, 2nd Meeting, Postpone, Referral, No Decision)
  - Next Contact Date (date format: MM/DD/YYYY)

**Import Process:**
1. User downloads Excel template with pre-formatted columns and sample data
2. User fills in data maintaining the column structure
3. User uploads completed Excel or exports to CSV
4. System validates data and shows preview with any errors highlighted
5. User can fix errors inline or re-upload corrected file
6. Upon successful validation, data is imported to Dream 100 database

**Data Validation:**
- Duplicate email detection with merge/skip options
- Email format validation
- Date format validation for Next Contact Date
- Boolean validation for Dream 100 field (accepts TRUE/FALSE, YES/NO, 1/0)
- Maximum 500 contacts per import batch
- Show row-by-row validation errors with specific field issues

**Contact Status Management:**
- **Status Progression:** Prospect → First Meeting → Second Meeting → Respond → Referral → Buy/Don't Buy
- **Automation Trigger:** When "Latest Decision" = "Buy", automatically:
  - Create client portal
  - Send magic link invitation email
  - Move contact from Dream 100 to Active Clients
  - Update consultant's Box status

**Storage & Display:**
- Store up to 500 contacts per consultant for MVP
- Display in sortable table with all fields visible
- Inline editing capabilities for quick updates
- Bulk actions (delete, export, status change)

**Filtering & Search:**
- Filter by: Latest Decision, Relationship, Source, Dream 100 status
- Search across: Name, Company, Email, Title
- Date range filter for Next Contact Date
- Save filter presets for quick access

**Calendar Integration:**
- Visual calendar showing Next Contact Dates
- Drag-and-drop to reschedule follow-ups
- Color coding by Latest Decision status
- Weekly/Monthly view toggles

#### 4.2.4 Email Functionality
- **Mailto Generation:** Create pre-populated email links with templates
- **Template Categories:**
  - Hot List Messages (Call/Text/Email scripts)
  - LinkedIn Connection & Welcome Messages
  - Problem Call Format templates
  - Monthly Content Examples
- **Customization:** Consultants can modify standard templates
- **Tracking:** Log mailto link clicks (MVP scope)

#### 4.2.5 Client Portal Setup
- **Automatic Creation:** Portal auto-generated when prospect status changes to "Buy"
- **Service Templates:** Pre-configured milestone sets for:
  - 1-Day Service
  - 5-Day Service
  - 30-Day Service
  - Retainer Service
- **Milestone Management:**
  - Customizable milestone names and sub-tasks
  - Track completion status with timestamps
  - Upload documents per milestone (PDF, max 5MB)
- **Branding:** Consultant logo, colors, welcome message

### 4.3 Clients' Features

#### 4.3.1 Client Portal Access
- **Authentication:** Email-based magic link login (SSO-style)
- **Automatic Invitation:** Email sent when portal is created
- **Portal Content:**
  - View-only milestone tracking with progress bar
  - Access to uploaded documents (PDFs)
  - Consultant branding and contact information
  - Service timeline and deliverables
- **Multiple Projects:** Support multiple portals per client for different projects

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
- "As a teacher, I want to track which consultants are completing their daily Box 2-4 tasks so I can ensure framework adherence."
- "As a teacher, I want to see how many prospects each consultant has converted to clients so I can measure effectiveness."

**Consultant Stories - Import Feature:**
- "As a consultant, I want to download an Excel template so I know exactly how to format my data."
- "As a consultant, I want to upload my existing contact list in Excel format so I don't have to manually enter hundreds of contacts."
- "As a consultant, I want to see validation errors before import so I can fix issues without losing data."
- "As a consultant, I want to handle duplicates intelligently so I don't lose existing contact history."
- "As a consultant, I want to import up to 500 contacts at once so I can quickly populate my Dream 100 database."

**Consultant Stories - Core Features:**
- "As a consultant, I want to track my daily Box 2-4 tasks so I stay accountable to the framework."
- "As a consultant, I want my client portals to auto-create when a prospect buys so I save setup time."
- "As a consultant, I want to schedule follow-ups on a calendar so I stay organized."
- "As a consultant, I want to use email templates for outreach so I maintain consistency."

**Client Stories:**
- "As a client, I want to receive an automatic email invitation when my portal is created so I can immediately access it."
- "As a client, I want to check my project milestones online so I don't need to email my consultant for updates."
- "As a client, I want to see my consultant's branding in the portal so I feel confident in their professionalism."

---

## 7. Technical Considerations

### 7.1 Architecture

**Frontend:**
- Next.js 14 with TypeScript
- App Router for routing
- Tailwind CSS for styling
- Supabase Client SDK for data operations
- XLSX library for Excel file parsing
- Papa Parse for CSV handling

**Backend:**
- Supabase (PostgreSQL database)
- Row Level Security (RLS) for data isolation
- Edge Functions for complex business logic
- Realtime subscriptions for live updates

**Database Schema (Dream 100):**
```sql
CREATE TABLE dream100_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultant_id UUID NOT NULL REFERENCES consultants(id),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  linkedin_profile TEXT,
  source VARCHAR(50) CHECK (source IN ('LinkedIn', 'Email List', 'YouTube', 'Referral', NULL)),
  relationship VARCHAR(50) CHECK (relationship IN ('Prospect', 'Client', 'Vendor', 'Promotional Partner', NULL)),
  title VARCHAR(255),
  preferred_communication VARCHAR(20) CHECK (preferred_communication IN ('Email', 'Call', 'Text', 'LinkedIn', NULL)),
  latest_decision VARCHAR(30) CHECK (latest_decision IN ('Buy', 'Don''t buy', '2nd meeting', 'Postpone', 'Referral', 'No Decision', NULL)),
  next_contact_date DATE,
  is_dream_100 BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(consultant_id, email)
);

-- Index for performance
CREATE INDEX idx_dream100_consultant ON dream100_contacts(consultant_id);
CREATE INDEX idx_dream100_decision ON dream100_contacts(latest_decision);
CREATE INDEX idx_dream100_next_contact ON dream100_contacts(next_contact_date);
```

**Key Data Flows:**

1. **CSV/Excel Import Flow:**
   - Parse uploaded file (Excel → JSON or CSV → JSON)
   - Validate each row against schema
   - Check for duplicates by email within consultant's contacts
   - Batch insert valid records
   - Return detailed import report (success count, errors, skipped)

2. **Prospect to Client Conversion:**
   - Dream 100 contact marked as "Buy" → Trigger client portal creation
   - Send magic link email to client
   - Create service milestones based on selected template
   - Update relationship field to "Client"

3. **Daily Task Tracking:**
   - Consultants complete Box 2-4 tasks daily
   - Teacher dashboard updates in real-time
   - Color-coded status based on completion rate

### 7.2 Technologies
- **Frontend Framework:** Next.js 14 with TypeScript
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Authentication:** Supabase Auth with magic links for clients
- **File Storage:** Supabase Storage for documents and branding assets

### 7.3 Integrations
- **Email:** Mailto links for MVP; future SMTP integration (e.g., SendGrid) may be considered
- **Authentication:** OAuth 2.0 for potential third-party logins (e.g., Google) may be considered in future iterations
- **Analytics:** Basic event tracking for usage insights may be added post-MVP

### 7.4 Hosting
- **Deployment Platform:** Vercel for front-end deployment
- **Backend and Database:** Supabase for backend services and database management

---

## 8. Development Phases

| Phase | Deliverables | Priority |
|-------|-------------|----------|
| **Phase 1: Foundation** | User authentication, database schema, basic UI structure | P0 |
| **Phase 2: Core Features** | Dream 100 database, CSV import, Box 2-4 task tracking | P0 |
| **Phase 3: Teacher Dashboard** | Consultant overview, task monitoring, status indicators | P0 |
| **Phase 4: Client Portal** | Auto-creation workflow, milestone tracking, client access | P0 |
| **Phase 5: Communication** | Email templates, mailto generation, contact management | P1 |
| **Phase 6: Polish & Testing** | UI refinements, bug fixes, performance optimization | P1 |
| **Phase 7: Deployment** | Production setup, data migration, user onboarding | P0 |

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
- Target: All teacher's consultants actively using the platform
- Metric: Daily active usage rate > 90%

### 10.2 Task Completion
- Target: 80% daily task completion rate for Boxes 2-4
- Metric: Average task completion within same day

### 10.3 Client Acquisition
- Target: Measurable improvement in Dream 100 conversion rates
- Metric: 20% prospect-to-client conversion rate

### 10.4 User Satisfaction
- Target: High user satisfaction and framework adherence
- Metric: < 5% churn rate among consultants

### 10.5 System Performance
- Target: 99.9% uptime
- Metric: Page load < 2s, API response < 300ms

---

## 11. Appendix

### 11.1 Glossary
- **10-box Framework:** A proprietary methodology for client acquisition and management, divided into 10 stages (Boxes)
- **Dream 100:** A curated list of 100 high-priority prospects targeted for systematic outreach
- **Avatar:** The ideal client persona that consultants identify and refine
- **Box Status:** The current stage a consultant or client is in within the 10-box framework
- **Magic Link:** Passwordless authentication method for client portal access

### 11.2 Email Templates

#### Hot List Messages
**Call Script:**
```
YOU: [Make a phone call]
THEM: Hey John!
YOU: Hey Sue, what's up?
THEM: Oh, just making a sandwich…
YOU: Hey are you still looking for help with [PROBLEM]? Can we talk about it for a little bit?
```

**Text Template:**
```
Hey are you still looking for help with [PROBLEM]? Can we talk about it for a little bit?
```

**Email Template:**
```
Subject: A question about [PROBLEM]
Hey are you still looking for help with [PROBLEM]? Can we talk about it for a little bit?
Sincerely,
[YOUR NAME]
```

#### LinkedIn Templates
**Connection Request:**
```
Hi [FIRST NAME],
I came across your profile on LinkedIn. It looks like we both [COMMON ELEMENT A] 
and [COMMON ELEMENT B]. Would you like to connect?

Hope to talk soon,
[FIRST LAST]
[LINKEDIN TAG LINE]
```

**Welcome Content:**
```
[NAME], thanks for connecting.

As a way of saying hello, here is a video I share with all of my LinkedIn connections. 
I thought it would be more fun than a dry email message. Cheers!

Here is the link - [LINK]

I'd love to hear back,
[FIRST LAST]
[LINKEDIN TAG LINE]
```

#### Problem Call Format
| Today | Gap | Tomorrow |
|-------|-----|----------|
| Who? What? When? Where? Why? How? | Problem: THIS has to change<br>Pain to Remove: Save/Make Time/Money<br>Alternatives: DIY, In-house, Other agency | Who? What? When? Where? Why? How? |

### 11.3 Service Types & Milestone Templates

#### 1-Day Service
- Discovery Call
- Problem Definition
- Solution Design
- Implementation Plan
- Delivery & Handoff

#### 5-Day Service
- Discovery & Assessment
- Strategy Development
- Solution Architecture
- Implementation Phase 1
- Implementation Phase 2
- Review & Optimization
- Final Delivery

#### 30-Day Service
- Week 1: Discovery & Planning
- Week 2: Development Phase 1
- Week 3: Development Phase 2
- Week 4: Testing & Refinement
- Final Review & Handoff

#### Retainer Service
- Monthly Planning Session
- Weekly Check-ins
- Ongoing Support Tasks
- Monthly Performance Review
- Strategic Adjustments

### 11.4 Assumptions
- Single-tenant application for one teacher and their consultants
- Consultants work independently with separate client bases
- Initial deployment targets English-speaking users
- Email sending limited to mailto links in MVP (actual sending in future versions)

### 11.5 Future Considerations (Post-MVP)
- Boxes 8-10 implementation for client retention
- Actual email sending via SMTP integration
- Client-to-consultant communication through portal
- Advanced analytics and reporting
- Mobile application
- Bulk operations and automation
- Integration with external CRM systems