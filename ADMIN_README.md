# Admin Dashboard Documentation

## Overview

The Admin Dashboard provides comprehensive tools for managing the workspace matching platform. It includes features for reviewing applications, managing the matching queue, analytics, and system configuration.

## Access

### Admin Account Creation

1. **Via Database**: Admin accounts can be created directly in the database with role = 'admin'
2. **Via Admin Signup**: Visit `/admin/signup` with the admin secret key

**Default Admin Secret**: `ADMIN_SECRET_2024` (change in production)

### Admin Login

Admins can sign in through the regular login form at `/auth/signin`. Once authenticated, if the user has admin role, they'll see an "Admin Panel" button in the dashboard header.

## Features

### 🏠 Main Dashboard (`/admin`)

**Statistics Cards:**
- Total applications count
- Pending reviews requiring attention
- Average match score across all applications  
- Accepted applications (success rate)

**Recent Applications Table:**
- Latest 10 applications with quick view
- Company name, industry, team size
- Match scores and status badges
- Quick action buttons (View, Shortlist, Reject)

**Quick Actions Panel:**
- Direct links to key admin functions
- System health status indicators
- Recent activity feed

### 📋 Applications Management (`/admin/applications`)

**Advanced Filtering:**
- Search by company name or industry
- Filter by application status
- Sort by date, match score, or other criteria
- Bulk action capabilities

**Application Table:**
- Complete list of all applications
- Sortable columns with visual indicators
- Status badges with color coding
- Action buttons for each application

**Pagination:**
- Efficient browsing of large application sets
- Configurable results per page

### 🔍 Application Detail View (`/admin/applications/[id]`)

**Comprehensive Profile Display:**
- Complete company information
- Contact details and social links
- Tech stack visualization
- Collaboration interests

**Match Score Breakdown:**
- Industry alignment (0-25 points)
- Size compatibility (0-25 points) 
- Collaboration potential (0-25 points)
- Innovation focus (0-25 points)
- Visual progress bars for each component

**Manual Override Tools:**
- Override automatic match scores
- Add internal notes and tags
- Mark potential synergies

**Action Panel:**
- Shortlist for Pixida review
- Request additional information
- Reject with reason selection
- Export application to PDF

**Pixida Fit Analysis:**
- Side-by-side requirements comparison
- Automated compatibility checks
- Visual match indicators

### 📊 Matching Queue (`/admin/matching`)

**Kanban Board Layout:**
- **New Applications**: Recently submitted
- **Under Review**: Currently being evaluated
- **Shortlisted for Pixida**: High-potential candidates
- **Accepted**: Successfully matched
- **Rejected**: Not suitable

**Drag and Drop:** Move applications between stages (future enhancement)

**Quick Filters:**
- Search across all applications
- Filter by industry or team size
- Status-specific views

**Bulk Operations:**
- Select multiple applications
- Bulk shortlist or reject
- Export selected applications

### 📈 Analytics Dashboard (`/admin/analytics`)

**Key Performance Metrics:**
- Application volume trends
- Success rate calculation
- Average match score tracking
- Pending review queue size

**Visual Charts:**
- Applications by industry breakdown
- Match score distribution analysis
- Application status overview
- Performance trend indicators

**Insights Panel:**
- Automated trend detection
- Key performance highlights
- Recommendation suggestions

### ⚙️ Settings (`/admin/settings`)

**General Configuration:**
- Platform name and description
- Admin contact information
- Application limits and deadlines

**Match Algorithm Tuning:**
- Scoring weight adjustments
- Minimum score thresholds
- Auto-review triggers

**Email Templates:**
- Welcome message customization
- Shortlist notification templates
- Rejection message templates

**Notification Preferences:**
- Real-time alert settings
- Daily/weekly report configuration
- Email notification controls

**Security Settings:**
- Session timeout configuration
- Two-factor authentication
- Password requirement policies

## Technical Implementation

### Database Access

Admin users have elevated database permissions through Row Level Security (RLS) policies:

```sql
-- Admins can view all applications
CREATE POLICY "Admins can view all applications" ON applications FOR
SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
);
```

### Route Protection

Admin routes are protected by middleware that checks:
1. User authentication status
2. Admin role verification
3. Automatic redirect for unauthorized access

### Data Security

- All admin actions are logged
- Sensitive operations require confirmation
- Role-based access control throughout
- Secure session management

## Usage Guidelines

### Daily Operations

1. **Morning Review:**
   - Check dashboard for overnight applications
   - Review high-score alerts
   - Process pending applications

2. **Application Processing:**
   - Use matching queue for systematic review
   - Apply consistent evaluation criteria
   - Document decisions with notes

3. **Communication:**
   - Use email templates for consistency
   - Personalize messages when appropriate
   - Track communication history

### Best Practices

- **Scoring Consistency**: Use the breakdown view to understand AI recommendations
- **Documentation**: Add notes for all manual decisions
- **Regular Reviews**: Check analytics weekly for trends
- **Communication**: Respond to applications within configured timeframes

### Maintenance Tasks

- **Weekly**: Review analytics for trends
- **Monthly**: Update email templates if needed
- **Quarterly**: Adjust algorithm weights based on success rates

## API Endpoints

The admin dashboard uses standard Supabase queries with elevated permissions. Key data flows:

- **Applications**: Real-time updates via Supabase subscriptions
- **Analytics**: Calculated metrics from database functions
- **Bulk Actions**: Batch operations with transaction safety

## Future Enhancements

- **Real-time Notifications**: WebSocket-based updates
- **Advanced Analytics**: Machine learning insights
- **Integration APIs**: External CRM connections
- **Mobile App**: Admin dashboard mobile version
- **Audit Logging**: Comprehensive action tracking

---

For technical support or feature requests, contact the development team.
