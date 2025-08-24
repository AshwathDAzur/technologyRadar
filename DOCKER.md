# Docker Setup for Technology Radar

This document explains how to use Docker to run the Technology Radar application with hot reload functionality.

## 🐳 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Make (optional, for using Makefile commands)

### Development Environment (Recommended for Development)
```bash
# Start development environment with hot reload
make dev

# Or manually:
docker-compose up -d app-dev nginx-dev
```

**Access Points:**
- React App (Direct): http://localhost:3000
- Nginx Proxy: http://localhost:8080

### Production Environment
```bash
# Start production environment
make prod

# Or manually:
docker-compose -f docker-compose.prod.yml up -d
```

**Access Point:**
- Production App: http://localhost:80

## 🚀 Available Commands

### Using Makefile (Recommended)
```bash
# Show all available commands
make help

# Development
make build-dev      # Build development image
make up-dev         # Start development environment
make down-dev       # Stop development environment
make restart-dev    # Restart development environment
make logs-dev       # View development logs

# Production
make build-prod     # Build production image
make up-prod        # Start production environment
make down-prod      # Stop production environment
make restart-prod   # Restart production environment
make logs-prod      # View production logs

# Utility
make clean          # Remove all containers, images, and volumes
```

### Using Docker Compose Directly
```bash
# Development
docker-compose up -d app-dev nginx-dev
docker-compose down app-dev nginx-dev
docker-compose logs -f app-dev nginx-dev

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml logs -f
```

## 🔥 Hot Reload Features

### Code Changes
- **Source Code**: Automatically reloads when you modify any `.js`, `.jsx`, `.css` files
- **Public Directory**: Excel files in `./public` are mapped to the container and accessible immediately
- **Package Changes**: `package.json` changes trigger automatic dependency updates

### Volume Mappings
```yaml
volumes:
  # Source code for hot reload
  - .:/app
  
  # Node modules (excluded to avoid conflicts)
  - /app/node_modules
  
  # Public directory for Excel files
  - ./public:/app/public
  
  # Package files for dependency changes
  - ./package*.json:/app/package*.json
```

### Environment Variables for Hot Reload
```bash
CHOKIDAR_USEPOLLING=true    # File watching in Docker
WATCHPACK_POLLING=true      # Webpack file watching
FAST_REFRESH=true           # React Fast Refresh
```

## 🏗️ Architecture

### Development Environment
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Your Browser  │───▶│  Nginx Proxy    │───▶│  React Dev      │
│                 │    │  (Port 8080)    │    │  Server         │
│                 │    │                 │    │  (Port 3000)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Production Environment
```
┌─────────────────┐    ┌─────────────────┐
│   Your Browser  │───▶│  Nginx Server   │
│                 │    │  (Port 80)      │
│                 │    │  (Static Files) │
└─────────────────┘    └─────────────────┘
```

## 📁 File Structure
```
.
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml           # Development environment
├── docker-compose.prod.yml      # Production environment
├── nginx.conf                   # Production nginx config
├── nginx-dev.conf               # Development nginx config
├── .dockerignore                # Docker build exclusions
├── Makefile                     # Docker command shortcuts
├── env.development              # Development environment vars
├── public/                      # Static files (Excel, logo)
│   ├── technology_radar_data.xlsx
│   └── logo.svg
└── src/                         # React source code
```

## 🔧 Customization

### Port Configuration
To change ports, modify the `docker-compose.yml`:
```yaml
ports:
  - "YOUR_PORT:3000"  # For React dev server
  - "YOUR_PORT:80"    # For nginx proxy
```

### Environment Variables
Create a `.env` file or modify `env.development`:
```bash
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3000
```

### Volume Mappings
Add additional volume mappings for your needs:
```yaml
volumes:
  - ./your-folder:/app/your-folder
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
netstat -tulpn | grep :3000

# Kill the process or change ports in docker-compose.yml
```

#### 2. Hot Reload Not Working
```bash
# Check if volumes are properly mounted
docker-compose exec app-dev ls -la /app

# Restart the development environment
make restart-dev
```

#### 3. Excel File Not Loading
```bash
# Verify the file exists in public directory
ls -la public/

# Check container logs
make logs-dev
```

#### 4. Build Failures
```bash
# Clean everything and rebuild
make clean
make build-dev
```

### Debug Commands
```bash
# Check container status
docker-compose ps

# Check container logs
docker-compose logs app-dev

# Access container shell
docker-compose exec app-dev sh

# Check volume mounts
docker-compose exec app-dev mount
```

## 📊 Performance Tips

### Development
- Use `make dev` for quick development setup
- Excel files in `public/` are served directly by nginx
- Source code changes trigger automatic reloads

### Production
- Production build uses nginx for optimal performance
- Static assets are cached with appropriate headers
- Gzip compression is enabled for all text-based files

## 🔒 Security Features

### Development
- Hot reload enabled for rapid development
- Source code accessible for debugging

### Production
- Security headers enabled
- Rate limiting configured
- Health check endpoints
- Proper file permissions

## 📝 Logs and Monitoring

### View Logs
```bash
# Development logs
make logs-dev

# Production logs
make logs-prod

# Specific service logs
docker-compose logs -f app-dev
```

### Health Checks
- Development: http://localhost:8080/health
- Production: http://localhost/health

## 🚀 Deployment

### Local Production Testing
```bash
make prod
```

### Production Deployment
1. Build the production image:
   ```bash
   make build-prod
   ```

2. Deploy to your production environment:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. Monitor the deployment:
   ```bash
   make logs-prod
   ```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [React Development Server](https://create-react-app.dev/docs/advanced-configuration/)
