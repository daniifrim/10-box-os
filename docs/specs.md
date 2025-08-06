Core Framework & Business Logic

  1. 10-Box Framework Details: The PRD mentions "Boxes 2-4" frequently
   but doesn't define what each box represents. Can you explain:
    - What are the specific 10 boxes and their purposes?
    - What specific tasks/activities happen in Boxes 2-4 that need
  tracking?
    - Why are only Boxes 2-4 tracked by Teachers, not all 10?
    > I'm sure those are some great questions there. So basically, to 10 get separated into three main sections. Boxes 2 to 4 are all about client acquisition. So, on the section 1, which is client acquisition, section 2 is client service, section 3 is client retention. So on section 1 client acquisition, we have box number 2 is identify, which is identify your avatar snapshot. Client persona per se. Where the user has 5 daily tasks to accomplish, which are the following: Do you have any refinement on the alternative? Any refinement on the pain? Did you have a conversation with your avatar today? Did you read anything from your avatar today? Do you have any refinement on the problem? Then box number 3 is about invite, about contacting the client personas. And that's where we count at the next 5 names on the Dream 100 database. And the tasks that the user needs to accomplish is: Check the 5 you missed yesterday. Do the 5 for today. Prepare for the 5 tomorrow. See future calendar and reorganize. And are there at least 100 names in your Dream 100? And then we have a 4 which is converse, which are invitations and conversation. The 5 daily tasks here is: Did the prospective client make a decision? Did you hear problem, pain, alternative? Did you open the call as instructed? Did you today, tomorrow gap? Did you recommend a solution? So those are the explanations for boxes 2 to 4.
  2. Dream 100 Workflow: How does the Dream 100 list integrate with
  the box framework?
    - Is the Dream 100 used across multiple boxes or specific to
  certain boxes?
    > So the Dream 100 refers to the main Dream 100 database which contains a list of 100 people that you have to contact in order to convert the most clients. So in theory it goes along all the boxes but are really specific for the client acquisition because that's when you contact different names of the Dream 100 database and then you convert them into clients and you have them on client service. And then the idea on section number three which is client retention is to retain those clients that come from the Dream 100 database.
    - Should contacts move through different statuses as they progress
   through the boxes?
   > Yes, that's an excellent point there. They go from... They go from second meeting, respond, to referral, buy, or don't buy. And maybe they start as a prospect and we had a first meeting too. And when... This is the key point when a client moves to buy, when the latest decision of the prospect, sorry, is buy. That's when we trigger a whole set of automations here. We move it, we move the client into the client service and that's where we create the client portal and all that kind of stuff. That's where we move, boxes 5, 6, and 7, where we onboard the client, where the client can be waiting or onboarding, and where in box number 6 we deliver the client and we have a bunch of milestones for the client, and then we have the recap box number 7.

  User Roles & Relationships

  3. Teacher-Consultant Relationship:
    - Can one Teacher oversee multiple Consultants?
    > Yes, the teacher can oversee, of course, multiple consultants here. That's the whole idea, that one teacher can see multiple consultants and the consultants and its clients. But this is not a product that is going to be used by many teachers. This is a specific product that is going to be used by my client, which is the teacher, in order to oversee his multiple consultants. So this is the whole idea is to productize his IP through this software basically.
    - Can one Consultant work under multiple Teachers?
    > See answer above for clarification
    - Do Teachers need to approve or assign tasks to Consultants?
    > This I already explained on boxes 2 to 4 that the consultant needs to do every day and those are the tasks that the teacher needs to be tracking in order to see, okay, this is the progress that the consultants are making. Maybe we can also add some tasks to see, okay, this is how many clients this consultant is serving. This is the average milestone process for these consultants, for the clients.
  4. Client Onboarding: How do Clients get access to their portals?
    - Does the Consultant manually create accounts for Clients?
    > So, since the clients come from the Dream 100 database, we already have an email for those clients. So, the client portal would need to be created automatically. Yeah, that needs to be created automatically. And I'm thinking that, for example, the simple process would be to send an email automatically to those clients with the link of the client portal and I can log in with a simple button that registers the token and it's like an SSO login. Does it make sense?
    - Do Clients self-register or get invited via email?
    - Can one Client have multiple active portals from different
  Consultants? 
    > I don't think that that is going to be the case because the consultants have independent clients. Like, all the consultants should not be able to see the clients of the other consultants, and nor should the teacher see the clients of the consultants. That information needs to be separate. One client can have multiple client proposals because it can have multiple projects with the consultant. But it's not what you said there.

  Business Model & Monetization

  5. Pricing Structure: The PRD mentions this is a "sellable MVP" -
  what's the business model?
    - Who pays for the service (Teachers, Consultants, or both)?
    > That's not something that we've accounted for yet. I'm sending this to the teacher and he's going to decide if he charges for a subscription or something for the consultants. But that's not something that we've defined.
    - Is it subscription-based, per-user, or one-time purchase?

  Feature Scope & Boundaries

  6. Email Functionality: The PRD mentions mailto links for MVP but
  also email tracking:
    - Should we track when mailto links are clicked?
    > Well that'd be great
    - Do you want actual email sending capabilities in v1 or just
  mailto generation?
    > I think just mailto generation on the MVP
    - Should email templates be customizable per Consultant or
  standardized?
    > We can offer various standard email templates, that I think I'm going to link to you right now on an appendix in this document. Yep, you have the appendix. Those are offered as standard, but they can be modified by the consultant.
  7. Client Portal Scope:
    - Can Consultants upload documents at any time or only when
  milestones are completed?
    > Yes, so here each consultant can when it creates a client portal, we have a pretty fine number of milestones that can be, we can modify the name of the milestones, the sub-tasks needs to be done in order for the milestone to be accomplished and of course this all needs to be templatized because we can offer, basically offer I think three or four types of services. We have a one-day service. We have a five-day service, a 30-day service and a retainer service and each of those has a predefined number of milestones that should be loaded as templates, right, and the client can then modify the milestones and the sub-tasks that needs to be accomplished in order for the milestone to be marked as done, basically. And that's the information that needs to be appeared on the client portal and as well as of course the information that on the consultants dashboard on the client service page.
    - Should Clients be able to communicate back through the portal
  (comments/messages)?
    > We can think about that in the future, but not in the MVP. Let not put it in the MVP yet.
    - Do you need version control for documents (replace vs. archive
  old versions)?
    > Not in the MVP
  8. Task Management:
    - Are the tasks predefined by the system or can
  Teachers/Consultants create custom tasks?
    > We've answered thsi before
    - Should there be task dependencies (complete Task A before Task B
   unlocks)?
   
    - Do tasks have due dates or just completion tracking?
    > WE've answered this before. There are tasks on boxes 2 to 4 that the clients need to do every day as defined by the teacher

  Technical Preferences & Constraints

  9. Data Import/Export:
    - Besides CSV import for Dream 100, do you need export
  capabilities for other data?
    - Should there be integration with existing CRM systems for data
  migration?
    > Not in the MVP
  10. Branding & Customization:
    - Is the consultant branding just for client portals or also for
  their dashboard interface?
    > So the teacher will have this tool in his own brand and the consultants can defined their branding: logo and colors for their client portals
  11. Notifications & Communication:
    - Should the system send automated reminders to Consultants about
  overdue tasks?
    > Not in the MVP
    - Do Clients need to be notified when milestones are completed or
  documents uploaded?
    > Not in the MVP

  Success Metrics & Analytics

  12. Reporting Needs: Beyond the Teacher dashboard, what reporting is
   needed?
    - Do Consultants need their own analytics/reports?
      > Yes
    - Should there be system-wide analytics for platform owners?
      > Yes



  ## Appendix 
  ### Templates
  - Hot List Messages
    
    Call
    
    YOU: [Make a phone call]
    THEM: Hey John!
    YOU: Hey Sue, what’s up?
    THEM: Oh, just making a sandwich…
    YOU: Hey are you still looking for help with [PROBLEM]? Can we talk about it for a little bit?
    
    Text
    
    Hey are you still looking for help with [PROBLEM]? Can we talk about it for a little bit?
    
    Email
    
    Subject: A question about [PROBLEM]
    Hey are you still looking for help with [PROBLEM]? Can we talk about it for a little bit?
    Sincerely,
    [YOUR NAME]
    
- LinkedIn Messages
    
    LinkedIn Connection Template
    
    Hi [FIRST NAME],
    I came across your profile on LinkedIn.  It looks like we both [COMMON ELEMENT A] 
    and [COMMON ELEMENT B]. Would you like to connect?
    
    Hope to talk soon,
    [FIRST LAST]
    [LINKEDIN TAG LINE]
    
    Welcome Content Email Copy
    
    [NAME], thanks for connecting.
    
    As a way of saying hello, here is a video I share with all of my LinkedIn connections. 
    I thought it would be more fun than a dry email message. Cheers!
    
    Here is the link - [LINK]
    
    I'd love to hear back,
    [FIRST LAST]
    [LINKEDIN TAG LINE]
    
- Problem Call Format
    
    
    | Today | Gap | Tomorrow |
    | --- | --- | --- |
    | Who?
    What
    When?
    Where?
    Why?
    How? | Problem
    -THIS has to change
    
    Pain to Remove
    -Save Time/Money
    -Make Time/Money
    
    Alternatives to Consider
    -Do it myself
    -Do it in-house
    -Hire another agency | Who?
    What
    When?
    Where?
    Why?
    How? |
    |  |  |  |
- Monthly Content Examples
    - Monthly Content Examples
        
        Example 1, Problem Related
        Happy September Peter,
        I’ve read at least 8 of your LinkedIn posts. I learn something from you EVERY time.
        
        Really quick: I found some new employment data from the Bureau of Labor Statistics highlighting an
        important workforce change in the next 3 years. Check the second paragraph - LINK
        
        (Are you feeling this change already?)
        
        Sincerely,
        Joseph Connor
        I help biotech start-ups locate VP and C-level talent
        
        Example 2, Pain Related
        This July has been crazy hot Ben! How are you?
        
        My waste management clients often complain that financial analysis takes too much time to learn. I know...it took me 10 years, ha!
        
        Here are 5 things you can do in Quickbooks to create maximum momentum (with minimum learning). This article is an example of what is possible - LINK
        
        Be well,
        Quincy Bates
        I help waste management companies get more from Quickbooks
        
        Example 3, Alternative Related
        Fall is finally here Claudia. Happy September.
        
        Hubspot vs SalesForce? It’s a common question for web design agencies once they hire a few sales people.
        Here is a link to help you decide which is the best for you - LINK
        
        Notice: This article assumes a sales team of 50. If your team is smaller, the comparison is about the same.
        
        Seize the day,
        Brian Sleazon
        I help web agencies get more from SalesForce
        
    - Done for You Monthly Content
        
        [Untitled](https://www.notion.so/bdfdca1a2e9b4c5e8ca03c6cdb344146?pvs=21)