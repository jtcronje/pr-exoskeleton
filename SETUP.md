# Local Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Expo CLI** (optional but recommended) - Install with: `npm install -g expo-cli`

For mobile development:
- **iOS**: macOS with Xcode installed
- **Android**: Android Studio with Android SDK
- **Mobile Testing**: Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pr-exoskeleton
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages including:
- React Native and Expo
- React Navigation
- Zustand (state management)
- Cube.js client libraries
- Victory Native (charting library)

### 3. Start the Development Server

```bash
npm start
# or
expo start
```

This will start the Metro bundler and show you a QR code.

### 4. Run on Your Preferred Platform

**Option A: Using Expo Go (Easiest)**
1. Install Expo Go on your phone
2. Scan the QR code shown in terminal
3. The app will load on your device

**Option B: iOS Simulator (macOS only)**
```bash
npm run ios
# or press 'i' in the terminal after npm start
```

**Option C: Android Emulator**
```bash
npm run android
# or press 'a' in the terminal after npm start
```

**Option D: Web Browser**
```bash
npm run web
# or press 'w' in the terminal after npm start
```

## Project Structure Overview

Once running, you'll see:
- **Left Sidebar**: Navigation with 6 pages (Overview, Analytics, Reports, Metrics, Insights, Settings)
- **Main Content**: Dashboard pages with placeholder graphs
- **Right Sidebar**: Filter pane (toggleable)

## Configuration

### Configure Cube.js API (Optional)

1. Navigate to the **Settings** page in the app
2. Click **Edit**
3. Enter your Cube.js API URL and token
4. Click **Save**
5. Click **Test Connection** to verify

Alternatively, edit `src/config/api.config.json` directly:

```json
{
  "cubeJs": {
    "enabled": true,
    "apiUrl": "https://your-cube-api.com/cubejs-api/v1",
    "apiToken": "your-api-token-here"
  }
}
```

### Customize Pages

Edit `src/config/pages.config.json` to:
- Add/remove pages
- Rename pages
- Modify graphs on each page

### Customize Filters

Edit `src/config/filters.config.json` to:
- Add/remove filters
- Change filter types
- Modify filter options

### Customize Theme

Edit `src/config/theme.config.json` to:
- Change colors
- Adjust spacing
- Modify typography

## Troubleshooting

### Issue: Dependencies fail to install

**Solution**: Clear npm cache and try again
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Metro bundler errors

**Solution**: Reset the cache
```bash
npm start -- --reset-cache
```

### Issue: iOS build fails

**Solution**: Install iOS dependencies
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: Android build fails

**Solution**:
1. Ensure Android SDK is installed
2. Set ANDROID_HOME environment variable
3. Accept all SDK licenses:
```bash
cd $ANDROID_HOME/tools/bin
./sdkmanager --licenses
```

### Issue: TypeScript errors

**Solution**: The project uses TypeScript. If you see type errors:
```bash
npm run lint
```

### Issue: Module resolution errors

**Solution**: The project uses babel-plugin-module-resolver. If you see import errors, restart the bundler:
```bash
npm start -- --reset-cache
```

## Development Workflow

### Making Changes

1. **Modify configuration files** in `src/config/` - Changes reflect immediately
2. **Edit components** in `src/components/` - Hot reload applies automatically
3. **Update types** in `src/types/` if adding new features
4. **Test changes** on your device/simulator

### Adding Real Charts

The project includes placeholder graphs. To add real charts:

1. The charting libraries are already installed:
   - Victory Native
   - React Native Chart Kit

2. Example: Replace placeholder LineChart with Victory:

```typescript
// In src/components/graphs/LineChartGraph.tsx
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

// Replace the placeholder with:
<VictoryChart>
  <VictoryAxis />
  <VictoryLine
    data={data}
    x="date"
    y="value"
  />
</VictoryChart>
```

### Testing with Mock Data

The app works without Cube.js configured:
- All graphs show placeholder data
- Filters still work
- You can test the entire UI flow

### Connecting to Real Data

1. Configure Cube.js in Settings
2. Add queries to graphs in `pages.config.json`:

```json
{
  "id": "my-graph",
  "type": "LineChart",
  "title": "Sales Trend",
  "cubeJsQuery": {
    "measures": ["Orders.count"],
    "timeDimensions": [{
      "dimension": "Orders.createdAt",
      "granularity": "day",
      "dateRange": "last 30 days"
    }]
  }
}
```

## Building for Production

### Web Build
```bash
expo build:web
```

### iOS Build
```bash
eas build --platform ios
```

### Android Build
```bash
eas build --platform android
```

Note: You'll need an Expo account for cloud builds. Alternatively, use:
```bash
expo eject
```
Then build using standard React Native build process.

## Environment Variables

For production deployments, use environment variables for sensitive data:

Create `.env` file:
```env
CUBE_API_URL=https://your-cube-api.com/cubejs-api/v1
CUBE_API_TOKEN=your-secret-token
```

Update `src/config/api.config.json` to reference env variables.

## Resources

- **Documentation**: See `README.md` for full documentation
- **AI Agent Guide**: See `docs/AI_AGENT_GUIDE.md` for customization tasks
- **Architecture**: See `docs/ARCHITECTURE.md` for system design
- **Expo Docs**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **Cube.js**: https://cube.dev/docs
- **Victory Charts**: https://formidable.com/open-source/victory/docs/native/

## Next Steps

1. ✅ Get the app running locally
2. ✅ Explore the 6 pre-configured pages
3. ✅ Test the filter system
4. 🔄 Configure your Cube.js API
5. 🔄 Add real queries to graphs
6. 🔄 Customize the theme
7. 🔄 Deploy to your environment

## Support

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Review the logs in the terminal
3. Check Expo's documentation
4. Open an issue on GitHub

---

**Happy coding! 🚀**
