# Testing Hot Reload Functionality

This file is used to test the Docker hot reload functionality.

## How to Test

1. **Start the development environment:**
   ```bash
   docker-compose up -d app-dev nginx-dev
   ```

2. **Access the application:**
   - Direct React App: http://localhost:3000
   - Nginx Proxy: http://localhost:8080

3. **Test Code Changes:**
   - Modify any `.js`, `.jsx`, or `.css` file in the `src/` directory
   - The browser should automatically reload with the changes

4. **Test Excel File Changes:**
   - Replace or modify `public/technology_radar_data.xlsx`
   - Refresh the browser to see the new data

5. **Test Public Directory Changes:**
   - Add new files to the `public/` directory
   - They should be immediately accessible

## Expected Behavior

- **Source Code Changes**: Automatic browser reload
- **Excel File Changes**: Data updates on browser refresh
- **Public Files**: Immediate availability
- **Dependencies**: Automatic reinstallation if package.json changes

## Troubleshooting

If hot reload is not working:

1. Check container logs:
   ```bash
   docker-compose logs -f app-dev
   ```

2. Verify volume mappings:
   ```bash
   docker-compose exec app-dev ls -la /app
   ```

3. Restart the development environment:
   ```bash
   docker-compose restart app-dev
   ```

## Container Status

Check if containers are running:
```bash
docker-compose ps
```

## Logs

View real-time logs:
```bash
docker-compose logs -f app-dev nginx-dev
```
