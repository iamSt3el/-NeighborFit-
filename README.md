# NeighborFit: Smart PG Matching Platform

## Project Report

**Live Demo:** [https://neighborfit.duckdns.org/](https://neighborfit.duckdns.org/)  

---

## Executive Summary

NeighborFit is a full-stack web application developed as a solution to the neighborhood-lifestyle matching problem for young professionals seeking PG accommodations in Bangalore. This project was completed as part of a 2-week technical assignment, demonstrating systematic problem-solving, algorithmic thinking, and full-stack development capabilities.

The application leverages real-world data from over 100 PG listings across Bangalore's prime areas, implementing an intelligent matching algorithm that considers budget constraints, room preferences, gender requirements, and lifestyle factors to provide personalized recommendations with quantified match scores. The application is deployed on AWS EC2 using Docker containerization with SSL encryption and custom domain configuration.

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
The application processes real-world data from 100+ PG listings, handling:
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

### Production Deployment Architecture
The application is deployed on AWS EC2 with a containerized architecture:

**Container Setup:**
- **Frontend Container:** React.js application served via Nginx
- **Backend Container:** Node.js Express server
- **Database Container:** MongoDB instance with persistent volumes
- **Reverse Proxy:** Nginx for load balancing and SSL termination

**Infrastructure Components:**
- **AWS EC2 Instance:** Ubuntu server hosting the application
- **Docker Compose:** Multi-container orchestration
- **DuckDNS:** Free dynamic DNS service for custom domain
- **Nginx:** Reverse proxy and SSL termination
- **Let's Encrypt/Certbot:** SSL certificate management

### SSL and Security Configuration
- **HTTPS Encryption:** SSL certificates from Let's Encrypt
- **Automatic Certificate Renewal:** Certbot for certificate management
- **Security Headers:** Implemented via Nginx configuration
- **Container Isolation:** Docker networking for service isolation

### Domain and DNS Setup
- **Custom Domain:** neighborfit.duckdns.org
- **DNS Provider:** DuckDNS for free subdomain hosting
- **SSL Certificate:** Let's Encrypt wildcard certificate
- **Reverse Proxy:** Nginx routing to appropriate containers

### Environment Configuration
The application supports multiple deployment environments:
- **Development:** Local development with hot reloading
- **Production:** Optimized builds with container orchestration
- **Environment Variables:** Secure credential management via Docker secrets
- **Database:** Persistent MongoDB storage with Docker volumes

### Docker Compose Configuration
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    container_name: neighborfit-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: neighborfit
    volumes:
      - mongodb_data:/data/db
    networks:
      - neighborfit-network
      
  server:
    image: st3el/neighborfit-server:latest
    container_name: neighborfit-server
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://admin:password123@mongodb:27017/neighborfit?authSource=admin
      - NODE_ENV=production
    networks:
      - neighborfit-network
      
  client:
    image: st3el/neighborfit-client:latest
    container_name: neighborfit-client
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=https://neighborfit.duckdns.org/api  # Updated to use your domain
      - HOST=0.0.0.0  # Add this
      - DANGEROUSLY_DISABLE_HOST_CHECK=true  # Add this
      - WATCHPACK_POLLING=true  # Add this for better file watching
    networks:
      - neighborfit-network

volumes:
  mongodb_data:
  
networks:
  neighborfit-network:
    driver: bridge
```

### Deployment Process
1. **EC2 Instance Setup:** Ubuntu server with Docker and Docker Compose
2. **Domain Configuration:** DuckDNS setup for custom domain
3. **SSL Certificate:** Let's Encrypt certificate generation
4. **Container Deployment:** Docker Compose multi-container setup
5. **Nginx Configuration:** Reverse proxy and SSL termination
6. **Database Initialization:** MongoDB container with data seeding
7. **Health Monitoring:** Container health checks and logging

## Scalability Considerations

### Database Scalability
- MongoDB containerization with persistent volumes
- Indexing strategy optimized for query performance
- Docker volume management for data persistence
- Potential for horizontal scaling with container orchestration

### Application Scalability
- Containerized architecture enables easy horizontal scaling
- Load balancing capabilities through Nginx reverse proxy
- Stateless server design compatible with container orchestration
- Component-based frontend architecture with production builds

### Infrastructure Scalability
- **Container Orchestration:** Ready for Kubernetes deployment
- **Load Balancing:** Nginx reverse proxy for traffic distribution
- **SSL Termination:** Centralized certificate management
- **Auto-scaling:** EC2 auto-scaling groups for high availability
- **CDN Integration:** CloudFront or similar for global content delivery
- **Database Clustering:** MongoDB replica sets for high availability

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
- Docker and Docker Compose
- Git version control
- MongoDB 5.0+ (for local development)

### Local Development Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/username/neighborfit-placement-project
   cd neighborfit-placement-project
   ```

2. **Install dependencies**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. **Configure environment variables**
   ```bash
   cd server
   cp .env.example .env
   # Update environment variables as needed
   ```

4. **Database setup and seeding**
   ```bash
   cd server
   npm run seed
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm start
   ```

### Docker Development Setup
1. **Build and run containers**
   ```bash
   docker-compose up --build
   ```

2. **Access application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:1000
   - MongoDB: localhost:27017

### Production Deployment on AWS EC2

1. **EC2 Instance Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker $USER
   ```

2. **Domain and SSL Configuration**
   ```bash
   # Install Nginx and Certbot
   sudo apt install nginx certbot python3-certbot-nginx -y
   
   # Configure DuckDNS (update your token)
   echo "yourtoken" | sudo tee /etc/duckdns/token
   
   # Generate SSL certificate
   sudo certbot --nginx -d neighborfit.duckdns.org
   ```

3. **Deploy application**
   ```bash
   # Clone repository
   git clone https://github.com/username/neighborfit-placement-project
   cd neighborfit-placement-project
   
   # Deploy with Docker Compose
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment Variables
```bash
# Development
MONGODB_URI=mongodb://localhost:27017/neighborfit
JWT_SECRET=your_jwt_secret_here
PORT=1000
NODE_ENV=development

# Production
MONGODB_URI=mongodb://mongo:27017/neighborfit
JWT_SECRET=your_production_jwt_secret
PORT=1000
NODE_ENV=production
```

## Conclusion

NeighborFit represents a comprehensive solution to the neighborhood-lifestyle matching problem, demonstrating strong technical implementation skills, algorithmic thinking, and user-centered design principles. The project successfully meets all assignment requirements while providing a scalable foundation for future development.

The systematic approach to problem decomposition, combined with real-world data processing and intelligent algorithm design, showcases the ability to tackle complex software engineering challenges within resource and time constraints.

**Key Achievements:**
- Functional full-stack application with real-world data
- Intelligent matching algorithm with weighted scoring
- Production deployment on AWS EC2 with Docker containerization
- SSL encryption and custom domain configuration
- Comprehensive documentation and testing approach
- Scalable containerized architecture
- Clear demonstration of problem-solving and DevOps methodology

**Technical Highlights:**
- **Containerization:** Multi-container Docker setup with orchestration
- **Cloud Deployment:** AWS EC2 production environment
- **SSL Security:** Let's Encrypt certificate with auto-renewal
- **Domain Management:** Custom domain via DuckDNS
- **Reverse Proxy:** Nginx for load balancing and SSL termination
- **Database Persistence:** MongoDB with Docker volumes
- **Development Workflow:** Local development with production deployment pipeline

---

**Author:** Himanshu  
**Development Period:** 2 weeks  
**Technologies:** MERN Stack, MongoDB, Node.js, Express.js, React.js, Docker, AWS EC2, Nginx, Let's Encrypt  
**Dataset:** 100+ PG listings from Bangalore  
**Deployment:** AWS EC2 with Docker Compose, SSL encryption, custom domain
