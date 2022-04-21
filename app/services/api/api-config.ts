// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
// const API_URL = "http://example.com"
import { CONFIG } from "@utils/config"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string,
  token: string,

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number,
  app_version: string
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: CONFIG.API_URL,
  token: "",
  timeout: 10000,
  app_version: "1.0"
}
