# React + TypeScript + Vite

************************************

To get started run following commands 

open terminal/bash

cd Desktop

git clone https://github.com/arevadzeg/crypto-dashboard.git

cd crypto-dashboard

npm i

npm run dev

************************************

SMALL DEMO OF THE APP
https://www.loom.com/share/b0d2a75536a842adbaffe1ec11b03829?sid=1660ad2e-843f-4617-9c81-5dc79af3114f


************************************************************************

For styling, I use SCSS modules and have taken color variables from Binance to maintain a cohesive design. SCSS modules help prevent class name conflicts and keep class names simple and manageable.

For state management and data fetching, I chose:

State Management & Data Fetching:
React Query (@tanstack/react-query) – Efficient caching, automatic updates, and reduces the need for a global state manager.
Zustand – Connected to a service worker to always fetch the latest prices.

For UI and data visualization:
Recharts for its simplicity in handling charts and data visualization.
Ant Design (Antd) for pre-styled, ready-to-use UI components.

HTTP Requests
Axios

************************************************************************
Folder Structure
components/ – Contains five subfolders:

  svg/ – Components that return SVG elements.
  
  layout/ – Includes header, footer, sidebar, and other structural components.
  
  ui/ – Reusable UI components like buttons, inputs, and modals.
  
  features/ – Contains components that are reused across the application.
  
  pages/ – Includes subfolders for each route (e.g., convertPage/, pricePage/), containing components specific to those pages.

************************************

api/ – Manages API interactions:

  apiClient/ – Handles API requests.
  
  endpoints/ – Stores endpoint definitions.
  
  services/ – Groups hooks by functionality, e.g., a coin/ folder containing useGetCoin, useGetCoins, and coinType.

************************************

pages/ – Stores route-specific components, where each folder represents a page (e.g., convertPage/, pricePage/).

store/ – Stores Zustand state management logic.

assets/ – Contains images and other static files.

styles/ – Includes global styles and SCSS variables.

utils/ – Stores reusable utility functions (currently focused on formatting tools).


