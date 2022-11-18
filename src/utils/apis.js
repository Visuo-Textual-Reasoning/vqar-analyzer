/**@type {string} MockAPI URL*/
export const MOCK_API = "http://localhost:4000";

/**@type {string} VCR URL */
export const R2C_HOME_URL = (process.env.REACT_APP_DEMO) ? MOCK_API : 'http://10.5.0.96:5000';


/**@type {string} Show ask attend and answer URL*/
export const SAAA_HOME_URL = (process.env.REACT_APP_DEMO) ? MOCK_API : "http://10.5.0.96:4444/vqa";

/**@type {string} MCAN URL*/
export const MCAN_HOME_URL = (process.env.REACT_APP_DEMO) ? MOCK_API : "http://10.5.0.96:4444/vqa";

/**@type {string} Mockapi Url else SAAA Url*/
export const VQA = (process.env.REACT_APP_DEMO) ? MOCK_API :SAAA_HOME_URL;
