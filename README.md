# NeighborFit: Smart PG Matching Platform

## Project Report

**Live Demo:** [https://neighborfit.duckdns.org/](https://neighborfit.duckdns.org/)  

---

## Executive Summary

NeighborFit is a full-stack web application developed as a solution to the neighborhood-lifestyle matching problem for young professionals seeking PG accommodations in Bangalore. This project was completed as part of a 2-week technical assignment, demonstrating systematic problem-solving, algorithmic thinking, and full-stack development capabilities.

The application leverages real-world data from over 500 PG listings across Bangalore's prime areas, implementing an intelligent matching algorithm that considers budget constraints, room preferences, gender requirements, and lifestyle factors to provide personalized recommendations with quantified match scores.

## Problem Statement and Research

### Core Problem Identification
The traditional PG hunting process suffers from information asymmetry and decision fatigue. Young professionals moving to Bangalore face challenges in finding accommodations that match not just their budget, but their lifestyle preferences, commute requirements, and social environment needs.

### Research Methodology
Through analysis of existing platforms and user behavior patterns, I identified key gaps in current solutions:
- Lack of intelligent matching algorithms
- No consideration of lifestyle compatibility
- Poor user experience in filtering and comparison
- Limited data on amenities and verification status

### Hypothesis Formation
The core hypothesis was that a weighted scoring algorithm considering multiple factors beyond price would significantly improve PG selection outcomes compared to basic filtering approaches.

## Technical Architecture

### System Design
The application follows a modern MERN stack architecture:

**Frontend Layer:**
- React.js with functional components and hooks
- Responsive design with mobile-first approach
- Real-time search interface with advanced filtering

**Backend Layer:**
- Node.js with Express.js framework
- RESTful API design with proper error handling
- MongoDB for data persistence with optimized indexing

**Algorithm Layer:**
- Server-side scoring system for performance optimization
- Weighted matching algorithm with configurable parameters
- Real-time score calculation and ranking

### Database Schema
The MongoDB schema includes:
- PG listings with normalized amenity data
- User preferences with flexible parameter support
- Indexing on location, price, and frequently queried fields

## Algorithm Implementation

### Matching Score Calculation
The core algorithm implements a weighted scoring system:

```
Total Score = (Budget Score × 0.25) + 
              (Room Type Score × 0.15) + 
              (Gender Preference Score × 0.10) + 
              (Lifestyle Score × 0.15) + 
              (Amenity Priorities Score × 0.25) + 
              (Food & Social Score × 0.10)
```

### Component Breakdown

**Budget Scoring (25% weight):**
- Perfect match for prices within budget
- Gradual penalty for prices up to 20% over budget
- Harsh penalty for prices exceeding tolerance

**Room Type Matching (15% weight):**
- Intelligent mapping of room types (Single, Double, Triple, etc.)
- Keyword-based matching with partial score fallback

**Gender Preference (10% weight):**
- Exact matching for gender-specific preferences
- Co-ed compatibility scoring

**Lifestyle Scoring (15% weight):**
- Budget-conscious, comfort-focused, location-priority, or verification-priority
- Weighted amenity scoring based on lifestyle choice

**Amenity Priorities (25% weight):**
- User-configurable priority levels (low, medium, high)
- Weighted scoring based on amenity availability

**Food & Social Environment (10% weight):**
- Food preference matching (vegetarian, non-vegetarian, both)
- Social environment compatibility scoring

## Data Processing Pipeline

### Data Collection and Normalization
The application processes real-world data from 500+ PG listings, handling:
- Price normalization and validation
- Amenity standardization
- Location mapping and area classification
- Contact information verification

### Data Seeding Process
A comprehensive seeding utility handles:
- JSON data parsing and validation
- Database schema compliance
- Error handling and logging
- Performance statistics generation

## Performance Optimizations

### Server-Side Processing
- Algorithm execution on server reduces client computational load
- Database indexing for location and preference queries
- Result caching for frequently accessed data

### Frontend Optimizations
- Component-based architecture with reusable hooks
- Lazy loading for improved initial load times
- Responsive design with optimized mobile experience

## API Design

### Core Endpoints
- `GET /api/health` - Application health monitoring
- `GET /api/search/stats` - Market statistics and analytics
- `POST /api/search` - Smart PG search with scoring
- `GET /api/pgs` - Paginated PG listings
- `GET /api/pgs/:id` - Individual PG details
- `GET /api/pgs/areas` - Available area listings

### Error Handling
Comprehensive error handling includes:
- Input validation with express-validator
- Database connection error management
- Graceful degradation for algorithm failures
- User-friendly error messages

## Testing and Validation

### Algorithm Validation
The matching algorithm was tested against various user scenarios:
- Budget-conscious students
- Working professionals prioritizing comfort
- Location-focused users with commute constraints
- Security-conscious users requiring verification

### Performance Testing
- Server response times under load
- Database query optimization
- Frontend rendering performance
- Mobile device compatibility

## Deployment and Infrastructure

### Environment Configuration
The application supports multiple deployment environments:
- Development environment with hot reloading
- Production environment with optimized builds
- Environment-specific database configurations
- Secure credential management

### Deployment Options
- **Heroku:** Ready for cloud deployment with Procfile
- **Docker:** Containerized deployment with Docker Compose
- **Local Development:** Complete local setup instructions

## Scalability Considerations

### Database Scalability
- MongoDB indexing strategy for large datasets
- Aggregation pipelines for complex queries
- Potential for horizontal scaling with sharding

### Application Scalability
- Stateless server design for horizontal scaling
- Component-based frontend architecture
- API versioning for backward compatibility

### Future Scaling Opportunities
- Microservices architecture for specialized features
- Caching layer implementation (Redis)
- Content delivery network integration

## Critical Analysis and Limitations

### Solution Effectiveness
The implemented solution successfully addresses the core problem through:
- Quantified matching scores improving decision-making
- Comprehensive preference consideration
- Performance optimization for user experience

### Identified Limitations
1. **Data Freshness:** Static dataset requires periodic updates
2. **Geographic Scope:** Limited to Bangalore areas
3. **User Feedback Loop:** No mechanism for preference learning
4. **External Integration:** No real-time data from external APIs

### Root Cause Analysis
- Limited development timeframe restricted external API integration
- Budget constraints prevented real-time data acquisition
- Scope management focused on core algorithm over advanced features

## Future Enhancement Roadmap

### Short-term Improvements
- User authentication and preference persistence
- Advanced filtering options (commute time, nearby amenities)
- Mobile application development
- Integration with mapping services

### Medium-term Developments
- Machine learning for personalized recommendations
- Real-time pricing updates
- User review and rating system
- Multi-city expansion

### Long-term Vision
- Predictive analytics for market trends
- AI-powered chat support
- Integration with payment gateways
- Partnership with PG operators

## Development Setup

### Prerequisites
- Node.js 16+ and npm
- MongoDB 5.0+
- Git version control

### Installation Steps
1. Clone the repository
2. Install backend dependencies: `cd server && npm install`
3. Install frontend dependencies: `cd client && npm install`
4. Configure environment variables
5. Seed database: `npm run seed`
6. Start development servers

### Environment Variables
```
MONGODB_URI=mongodb://localhost:27017/neighborfit
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

## Conclusion

NeighborFit represents a comprehensive solution to the neighborhood-lifestyle matching problem, demonstrating strong technical implementation skills, algorithmic thinking, and user-centered design principles. The project successfully meets all assignment requirements while providing a scalable foundation for future development.

The systematic approach to problem decomposition, combined with real-world data processing and intelligent algorithm design, showcases the ability to tackle complex software engineering challenges within resource and time constraints.

**Key Achievements:**
- Functional full-stack application with real-world data
- Intelligent matching algorithm with weighted scoring
- Comprehensive documentation and testing approach
- Scalable architecture ready for production deployment
- Clear demonstration of problem-solving methodology

---

