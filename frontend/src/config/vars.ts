export const NODE_ENV = process.env.NODE_ENV;
export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;
export const IS_LIVE = ENVIRONMENT === 'production';
export const IS_STAGING = ENVIRONMENT === 'staging';

export const APP_THEME = process.env.REACT_APP_THEME;
export const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:8000/';
