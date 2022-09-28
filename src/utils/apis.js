/**@type {string} VCR URL */
export const R2C_HOME_URL = 'http://10.5.0.96:5000';

/**@type {string} Show ask attend and answer URL*/
export const SAAA_HOME_URL = "http://10.5.0.96:5002";

/**@type {string} MCAN URL*/
export const MCAN_HOME_URL = "http://10.5.0.96:5556";

/**@type {string} MockAPI URL*/
export const MOCK_API = "http://localhost:4000";

/**@type {string} Mockapi Url else SAAA Url*/
export const VQA = (process.env.REACT_APP_DEMO) ? MOCK_API :SAAA_HOME_URL