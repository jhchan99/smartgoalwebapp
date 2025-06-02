# 🎯 SMART Goals Web App

> Turn ambition into action — instantly.

A modern web application for creating, managing, and tracking SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goals with an intuitive interface and powerful features.

## ✨ Current Features

### Core Goal Management
- **SMART Goal Creation**: Structured form with fields for all SMART criteria
- **Goal History**: Persistent storage using localStorage with chronological display
- **Edit & Update**: Seamlessly edit existing goals with real-time form updates
- **Delete Goals**: Remove goals with confirmation

### User Experience
- **Responsive Sidebar**: Collapsible sidebar with smooth animations
- **Notification System**: Visual indicators for unviewed goals with pulsing badges
- **Auto-Save**: Goals are automatically saved to browser storage
- **Form Validation**: Prevents saving empty goals with user feedback

### Export & Sharing
- **Download as Text**: Export individual goals as `.txt` files
- **Native Share API**: Share goals using device's native sharing functionality
- **Copy to Clipboard**: Easy sharing via system clipboard

### Interface & Design
- **Modern UI**: Clean design with Tailwind CSS styling
- **Interactive Tooltips**: Helpful tooltips with multiple positioning options
- **Dropdown Menus**: Context menus for goal actions (edit, share, download, delete)
- **Visual Feedback**: Hover states, animations, and loading indicators
- **Mobile Responsive**: Optimized for all screen sizes

### Technical Features
- **React 19**: Latest React with hooks and modern patterns
- **Local Storage**: Persistent goal storage without server dependency
- **Docker Support**: Containerized deployment with nginx
- **Cloud Deployment**: Google Cloud Run integration for staging/production

## 🚀 Upcoming Features

### File Upload & AI Integration
- **📚 Book Upload**: Upload PDF books, eBooks, and documents
- **📄 Document Processing**: Support for various file formats (PDF, DOCX, TXT, EPUB)
- **🤖 AI Goal Generation**: Create SMART goals based on uploaded content
- **📖 Content Analysis**: Extract key themes and actionable insights from books
- **🎯 Goal Suggestions**: AI-powered suggestions for relevant, achievable goals

### Enhanced Goal Management
- **📅 Goal Categories**: Organize goals by themes (career, health, learning, etc.)
- **📊 Progress Tracking**: Visual progress indicators and milestone tracking
- **🔔 Reminders**: Smart notifications for goal deadlines and check-ins
- **📈 Analytics**: Goal completion rates and personal insights

### User Accounts & Sync
- **👤 User Authentication**: Secure login and registration system
- **☁️ Cloud Storage**: Sync goals across devices
- **🔒 Data Privacy**: Encrypted storage and GDPR compliance
- **📱 Mobile App**: Native mobile application

### Advanced Features
- **🏷️ Smart Tagging**: Auto-tag goals based on content and context
- **🔗 Goal Dependencies**: Link related goals and track interconnections
- **📚 Reading Lists**: Create reading goals from uploaded books
- **🎨 Customization**: Themes, layouts, and personalization options

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (JSX)
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Heroicons, React Icons, Lucide React
- **UI Components**: Custom components with Radix UI primitives
- **Storage**: localStorage (browser), planned cloud storage
- **Deployment**: Docker, Google Cloud Run, nginx
- **Development**: Create React App, npm

## 📋 Development Roadmap

### Phase 1: AI Integration
- [ ] AI service integration for content analysis
- [ ] Goal generation algorithms
- [ ] Content summarization features
- [ ] Smart goal suggestions engine


### Phase 2: Enhanced UX
- [ ] User accounts and authentication
- [ ] Goal categorization and filtering
- [ ] Progress tracking and analytics
- [ ] Mobile app development
- [ ] Create reminders or notifications on device when saving goal

### Phase 3: Advanced Features
- [ ] Goal dependencies and relationships
- [ ] Team goals and collaboration
- [ ] Advanced AI insights and coaching
- [ ] Integration with external apps

### Phase 4: File Upload Foundation
- [ ] File upload component with drag-and-drop
- [ ] File type validation and size limits
- [ ] Basic file storage and management
- [ ] PDF text extraction functionality

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Deploy locally with Docker
npm run deploy:local
```

## 🤝 Contributing

This is a personal project currently in active development. Future plans include open-sourcing and community contributions.

---

**Built with ❤️ to help people achieve their goals through structured planning and AI-powered insights.**
